import React from "react";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import RecreationMap from "../../ResultsPage/components/RecreationMap";

const Recreation = () => {
  const location = useLocation();
  const { city } = location?.state || {};
  const { cityData, isLoading, error } = useCityData();

  const currentCity = city ? city : cityData;

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;
  return <>{currentCity.Recreation && <RecreationMap data={currentCity} />}</>;
};

export default Recreation;
