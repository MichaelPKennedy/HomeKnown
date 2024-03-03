import React from "react";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import ReusableChart from "../components/ReusableChart";

const Weather = () => {
  const location = useLocation();
  const { cityData, isLoading, error } = useCityData();
  const startYear = 2020;
  const endYear = 2023;

  const { city } = location?.state || {};
  const currentCity = city ? city : cityData;
  const weatherData = currentCity.Weather;

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;
  return (
    <ReusableChart
      data={weatherData}
      label="Average Temperature"
      startYear={startYear}
      endYear={endYear}
      dataType="weather"
    />
  );
};

export default Weather;
