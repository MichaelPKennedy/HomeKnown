import React from "react";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import DemographicsTable from "./DemographicsTable";

const Demographics = () => {
  const location = useLocation();
  const { cityData, isLoading, error } = useCityData();

  const { city } = location?.state || {};
  const currentCity = city ? city : cityData;
  const { CityDemographics: demographics } = currentCity || {};

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;
  return <>{demographics && <DemographicsTable data={demographics} />}</>;
};

export default Demographics;
