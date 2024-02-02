import React, { useEffect, useState } from "react";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import JobData from "../components/JobData";
import client from "../../../feathersClient";

const Industry = () => {
  const location = useLocation();
  const { cityData, isLoading, error } = useCityData();
  const [industryData, setIndustryData] = useState(null);
  const [loadingIndustry, setLoadingIndustry] = useState(false);
  const [industryError, setIndustryError] = useState(null);

  const { city } = location?.state || {};
  console.log("city in jobs", city);
  const currentCity = city ? city : cityData;
  const { Jobs: jobs } = currentCity || {};
  const {
    city_id,
    chosenJob1,
    chosenJob2,
    Latitude: latitude,
    Longitude: longitude,
    area_code,
  } = cityData;

  useEffect(() => {
    const fetchIndustryData = async () => {
      if (!cityData && !currentCity && !jobs) {
        setLoadingIndustry(true);
        try {
          const query = {
            nearby: true,
            area_code,
            latitude,
            longitude,
            selectedJobs: [chosenJob1, chosenJob2].filter(Boolean),
          };
          const response = await client
            .service("industry")
            .get(city_id, { query });
          setIndustryData(response);
        } catch (err) {
          setIndustryError(err);
        } finally {
          setLoadingIndustry(false);
        }
      }
    };

    fetchIndustryData();
  }, [cityData, currentCity, jobs]);

  if (isLoading || loadingIndustry) return <div>Loading data...</div>;
  if (error || industryError) {
    const errorMessage = error?.message || industryError?.message;
    return <div>Error loading data: {errorMessage}</div>;
  }
  if (!cityData && !currentCity && !industryData)
    return <div>No data available.</div>;

  return (
    <>
      {jobs ? (
        <JobData jobs={jobs} />
      ) : (
        industryData && <div>Industry data: {JSON.stringify(industryData)}</div>
      )}
    </>
  );
};

export default Industry;
