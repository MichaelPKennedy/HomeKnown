import React, { createContext, useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../AuthContext";
import client from "../feathersClient";
const CityDataContext = createContext();

export const useCityData = () => useContext(CityDataContext);

const fetchCityData = async (cityId) => {
  const response = await client.service("survey").get(cityId);
  console.log("response from context", response);
  return response[0];
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
  const [userCityIds, setUserCityIds] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [cityId, setCityId] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const {
    data: cityData,
    isLoading,
    error,
  } = useQuery(["cityData", cityId], () => fetchCityData(cityId), {
    enabled: !!cityId,
  });

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

  useEffect(() => {
    const fetchUserCityData = async () => {
      if (isLoggedIn && user) {
        try {
          const [cityIdsResponse, surveyResponse] = await Promise.all([
            client
              .service("user-cities")
              .find({ query: { user_id: user.user_id } }),
            client.service("survey").find({ query: { user_id: user.user_id } }),
          ]);
          setUserCityIds(cityIdsResponse.data);
          setUserCityData(surveyResponse);
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
      }}
    >
      {children}
    </CityDataContext.Provider>
  );
};
