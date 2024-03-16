import React, { createContext, useState, useEffect, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { AuthContext } from "../AuthContext";
import { fetchDataForPreference } from "../pages/ResultsPage/constants";
import client from "../feathersClient";
const CityDataContext = createContext();

export const useCityData = () => useContext(CityDataContext);

const fetchCityData = async (cityId) => {
  const authToken = localStorage.getItem("authToken");
  const response = await client.service("survey").get(cityId, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response[0];
};

const fetchPhotos = async (city) => {
  try {
    const photos = await client.service("photos").find({
      query: {
        city_id: city.city_id,
        cityName: city.city_name,
        stateName: city.state_name,
      },
    });
    return photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

const fetchWeatherForecast = async ({ queryKey }) => {
  const [_key, { latitude, longitude }] = queryKey;
  const data = await client
    .service("forecast")
    .find({ query: { latitude, longitude } });
  return data;
};

export const CityDataProvider = ({ children }) => {
  const [userCityData, setUserCityData] = useState([]);
  const [userPreferences, setUserPreferences] = useState({});
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [stats, setStats] = useState({});
  const [userCityIds, setUserCityIds] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [cityId, setCityId] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const fetchRecInterestsForCity = async ({ queryKey }) => {
    const [_key, city] = queryKey;
    const savedFormData = JSON.parse(sessionStorage.getItem("formData"));
    const interests =
      userPreferences?.recreationalInterests ||
      savedFormData?.recreationalInterests ||
      [];
    let results = {};
    for (let interest of interests) {
      try {
        const elements = await fetchDataForPreference(interest, city);
        let namedElements;
        if (elements.length > 500) {
          namedElements = elements
            .filter((el) => el.tags && el.tags.name)
            .slice(0, 500);
        } else {
          namedElements = elements;
        }
        results[interest] = namedElements;
      } catch (error) {
        console.error(
          `Error fetching ${interest} for city ${city.name}:`,
          error
        );
        results[interest] = [];
      }
    }

    return results;
  };

  const {
    data: cityData,
    isLoading,
    error,
  } = useQuery(
    ["cityData", cityId],
    async () => {
      const cityInfo = await fetchCityData(cityId);
      if (!cityInfo.photos) {
        const photos = await fetchPhotos(cityInfo);
        return { ...cityInfo, photos };
      }
      return cityInfo;
    },
    {
      enabled: !!cityId,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const statsResponse = await client.service("stats").find({
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setStats(statsResponse);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cityData) {
      setLatitude(cityData.latitude);
      setLongitude(cityData.longitude);
    }
  }, [cityData]);

  const {
    data: weatherForecast,
    isLoading: isForecastLoading,
    error: forecastError,
  } = useQuery(["weatherData", { latitude, longitude }], fetchWeatherForecast, {
    enabled: !!latitude && !!longitude,
  });

  const {
    data: userRecInterests,
    isLoading: userRecInterestsLoading,
    error: userRecInterestsError,
  } = useQuery(["recreation", cityData], fetchRecInterestsForCity, {
    enabled: !!cityId && !!cityData,
  });

  useEffect(() => {
    const fetchUserCityData = async () => {
      if (isLoggedIn && user) {
        try {
          const [cityIdsResponse, surveyResponse, recommendations] =
            await Promise.all([
              client
                .service("user-cities")
                .find({ query: { user_id: user.user_id } }),
              client
                .service("survey")
                .find({ query: { user_id: user.user_id } }),
              client
                .service("recommendations")
                .find({ query: { user_id: user.user_id } }),
            ]);
          setUserCityIds(cityIdsResponse.data);
          setUserCityData(surveyResponse);
          setUserRecommendations(recommendations);
        } catch (error) {
          console.error("Error fetching saved cities:", error);
        }
      }
    };

    fetchUserCityData();
  }, [user, isLoggedIn]);

  const addCity = async (cityId) => {
    try {
      await client
        .service("user-cities")
        .create({ user_id: user?.user_id, city_id: cityId });
      setUserCityIds((prev) => [...prev, cityId]);
      const response = await client.service("survey").get(cityId);
      setUserCityData((prev) => [...prev, response[0]]);
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  const removeCity = async (cityId) => {
    try {
      await client
        .service("user-cities")
        .remove(cityId, { query: { user_id: user?.user_id } });
      const updatedCities = userCityData.filter(
        (city) => city.city_id !== cityId
      );
      setUserCityIds((prev) => prev.filter((id) => id !== cityId));
      setUserCityData(updatedCities);
    } catch (error) {
      console.error("Error removing city:", error);
    }
  };

  return (
    <CityDataContext.Provider
      value={{
        cityData,
        userCityData,
        userCityIds,
        weatherForecast,
        setUserCityData,
        addCity,
        removeCity,
        setCityId,
        isLoading,
        error,
        isForecastLoading,
        forecastError,
        userPreferences,
        userRecommendations,
        setUserPreferences,
        userRecInterests,
        userRecInterestsLoading,
        userRecInterestsError,
        stats,
      }}
    >
      {children}
    </CityDataContext.Provider>
  );
};
