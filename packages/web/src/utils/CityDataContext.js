import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import client from "../feathersClient";
const CityDataContext = createContext();

export const useCityData = () => useContext(CityDataContext);

export const CityDataProvider = ({ children }) => {
  const [cityData, setCityData] = useState([]);
  const [userCityData, setUserCityData] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchCityData = async () => {
      if (isLoggedIn && user) {
        try {
          const response = await client
            .service("survey")
            .find({ query: { user_id: user.user_id } });
          setUserCityData(response);
        } catch (error) {
          console.error("Error fetching saved cities:", error);
        }
      }
    };

    fetchCityData();
  }, [user, isLoggedIn]);

  const addCity = async (cityId) => {
    try {
      await client
        .service("user-cities")
        .create({ user_id: user?.user_id, city_id: cityId });
      const response = await client.service("survey").get(cityId);
      console.log("response from addCity", response);
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
      setUserCityData(updatedCities);
    } catch (error) {
      console.error("Error removing city:", error);
    }
  };

  return (
    <CityDataContext.Provider
      value={{
        cityData,
        setCityData,
        userCityData,
        setUserCityData,
        addCity,
        removeCity,
      }}
    >
      {children}
    </CityDataContext.Provider>
  );
};
