import React from "react";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import AirQualityChart from "./AirQualityChart";

const AirQuality = () => {
  const location = useLocation();
  const { cityData, isLoading, error } = useCityData();

  const { city } = location?.state || {};
  const currentCity = city ? city : cityData;
  const { AirQuality: airQuality } = currentCity || {};

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;
  return <>{airQuality && <AirQualityChart airQualityData={airQuality} />}</>;
};

export default AirQuality;
