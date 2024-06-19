import React from "react";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import AirQualityChart from "../components/AirQualityChart";

const AirQuality = () => {
  const location = useLocation();
  const { cityData, isLoading, error } = useCityData();

  const { city, fromSurvey } = location?.state || {};
  const currentCity = fromSurvey ? city : cityData;
  const { AirQuality: airQuality } = currentCity || {};

  if (!airQuality || airQuality?.length === 0) {
    return <div>No air quality data available for this location</div>;
  }

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;
  return <>{airQuality && <AirQualityChart airQualityData={airQuality} />}</>;
};

export default AirQuality;
