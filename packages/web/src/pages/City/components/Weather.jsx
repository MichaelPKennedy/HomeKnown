import React, { useEffect } from "react";
import { CityDataProvider, useCityData } from "../../../utils/CityDataContext";
import { useParams, useLocation } from "react-router-dom";
import ReusableChart from "./ReusableChart";

const Weather = () => {
  const location = useLocation();
  const { cityData, isLoading, error, setCityId } = useCityData();
  const startYear = 2010;
  const endYear = 2023;

  const { city } = location?.state || {};
  const { cityId } = useParams();
  const currentCity = city ? city : cityData;

  const weatherData = currentCity.Weather;

  useEffect(() => {
    if (cityId) {
      setCityId(cityId);
    }
  }, [cityId]);

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;
  return (
    <CityDataProvider>
      <ReusableChart
        data={weatherData}
        label="Average Temperature"
        startYear={startYear}
        endYear={endYear}
        dataType="weather"
      />
    </CityDataProvider>
  );
};

export default Weather;
