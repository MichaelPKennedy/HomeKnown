import React from "react";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import JobData from "../components/JobData";

const Industry = () => {
  const location = useLocation();
  const { cityData, isLoading, error } = useCityData();

  const { city } = location?.state || {};
  console.log("city in jobs", city);
  const currentCity = city ? city : cityData;
  const { Jobs: jobs } = currentCity || {};
  console.log(jobs);
  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;
  return <>{jobs && <JobData jobs={jobs} />}</>;
};

export default Industry;
