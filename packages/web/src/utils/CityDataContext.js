// Create a new context called CityDataContext.js
import React, { createContext, useState, useContext } from "react";

const CityDataContext = createContext();

export const useCityData = () => useContext(CityDataContext);

export const CityDataProvider = ({ children }) => {
  const [cityData, setCityData] = useState([]);
  const [userCityData, setUserCityData] = useState([]);

  return (
    <CityDataContext.Provider
      value={{ cityData, setCityData, userCityData, setUserCityData }}
    >
      {children}
    </CityDataContext.Provider>
  );
};
