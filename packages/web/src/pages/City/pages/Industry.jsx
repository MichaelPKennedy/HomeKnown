import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import JobData from "../components/JobData";
import client from "../../../feathersClient";
import styles from "./Industry.module.css";

const Industry = () => {
  const location = useLocation();
  const { cityData, isLoading, error } = useCityData();
  const [industryData, setIndustryData] = useState(null);
  const [loadingIndustry, setLoadingIndustry] = useState(false);
  const [industryError, setIndustryError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobOptions, setJobOptions] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const { city, fromSurvey } = location?.state || {};
  const currentCity = fromSurvey ? city : cityData;
  const { Jobs: jobs } = currentCity || {};
  const {
    city_id,
    chosenJob1,
    chosenJob2,
    Latitude: latitude,
    Longitude: longitude,
    area_code,
  } = cityData || currentCity || {};

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setSearchTerm(job.label);
  };

  const fetchJobOptions = async (input) => {
    if (!input) return;
    try {
      const response = await client.service("occupation").find({
        query: { query: input },
      });
      setJobOptions(
        response.map((job) => ({
          value: job.occ_code,
          label: job.occ_title,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch job options:", err);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchJobOptions(searchTerm);
    }, 500); // Delay fetch to avoid too many requests
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchIndustryData = async () => {
      if (!cityData && !currentCity && !jobs && fromSurvey) {
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
      } else if (currentCity && selectedJob) {
        setLoadingIndustry(true);
        try {
          const query = {
            area_code,
            latitude,
            longitude,
            selectedJobs: [{ occ_code: selectedJob.value }],
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
  }, [cityData, currentCity, jobs, selectedJob, fromSurvey]);

  if (isLoading || loadingIndustry) return <div>Loading data...</div>;
  if (error || industryError) {
    const errorMessage = error?.message || industryError?.message;
    return <div>Error loading data: {errorMessage}</div>;
  }
  if (!cityData && !currentCity && !industryData)
    return <div>No data available.</div>;

  return (
    <>
      {!fromSurvey ? (
        <>
          <Select
            value={selectedJob}
            onChange={handleJobSelect}
            onInputChange={setSearchTerm}
            options={jobOptions}
            placeholder="Select a job"
            isLoading={loadingIndustry}
            onMenuOpen={() => fetchJobOptions(searchTerm)}
            className={styles.select}
          />
          {industryData && <JobData jobs={industryData} />}
        </>
      ) : jobs.length ? (
        <JobData jobs={jobs} />
      ) : (
        <div>
          No job data currently available within 50 miles of this location
        </div>
      )}
    </>
  );
};

export default Industry;
