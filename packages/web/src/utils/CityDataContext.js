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

  return (
    <CityDataContext.Provider
      value={{ cityData, setCityData, userCityData, setUserCityData }}
    >
      {children}
    </CityDataContext.Provider>
  );
};
