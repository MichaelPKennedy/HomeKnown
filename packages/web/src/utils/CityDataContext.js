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

export const CityDataProvider = ({ children }) => {
  const [userCityData, setUserCityData] = useState([]);
  const [userCityIds, setUserCityIds] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [cityId, setCityId] = useState(null);

  const {
    data: cityData,
    isLoading,
    error,
  } = useQuery(["cityData", cityId], () => fetchCityData(cityId), {
    enabled: !!cityId,
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
        setUserCityData,
        addCity,
        removeCity,
        setCityId,
        isLoading,
        error,
      }}
    >
      {children}
    </CityDataContext.Provider>
  );
};
