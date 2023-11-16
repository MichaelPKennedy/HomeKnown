import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./City.module.css";
import RecreationMap from "../ResultsPage/components/RecreationMap";
import RadarChart from "./components/RadarChart";
import ReusableChart from "./components/ReusableChart";
import JobData from "./components/JobData";
import AirQualityChart from "./components/AirQualityChart";
import DemographicsTable from "./components/DemographicsTable";

function City() {
  const { cityId } = useParams();
  const location = useLocation();
  const { city } = location.state;
  const {
    Jobs: jobs,
    AirQuality: airQuality,
    CityDemographics: demographics,
  } = city;
  console.log("city", city);
  console.log("demo", demographics);

  const weatherData = city.Weather;
  const startYear = 2010;
  const endYear = 2023;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.cityPage}>
      <h1>
        {city.city_name}, {city.state_name}
      </h1>
      <RecreationMap {...city} />
      <ReusableChart
        data={weatherData}
        label="Average Temperature"
        startYear={startYear}
        endYear={endYear}
        dataType="weather"
      />
      {/* <RadarChart
        data={weatherData}
        label="Average Temperature"
        startYear={startYear}
        endYear={endYear}
        dataType="weather"
      /> */}
      <JobData jobs={jobs} />
      <AirQualityChart airQualityData={airQuality} />
      <DemographicsTable data={demographics} />
    </div>
  );
}

export default City;
