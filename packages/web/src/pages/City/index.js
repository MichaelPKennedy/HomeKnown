import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./City.module.css";
import RecreationMap from "../ResultsPage/components/RecreationMap";
import RadarChart from "./components/RadarChart";
import ReusableChart from "./components/ReusableChart";
import JobData from "./components/JobData";
import AirQualityChart from "./components/AirQualityChart";
import DemographicsTable from "./components/DemographicsTable";
import HousingChart from "./components/HousingChart";

function City() {
  const { cityId } = useParams();
  const location = useLocation();
  const { city } = location.state;
  const {
    Jobs: jobs,
    AirQuality: airQuality,
    CityDemographics: demographics,
    HomePrice: homePriceData,
    MonthlyRent: rentPriceData,
  } = city;

  const homePrice = homePriceData.map(
    ({
      city_id,
      city_name,
      county,
      id,
      abbrev,
      state_abbrev,
      metro,
      ...rest
    }) => rest
  );
  const rentPrice = rentPriceData.map(
    ({
      city_id,
      city_name,
      county,
      id,
      abbrev,
      state_abbrev,
      metro,
      ...rest
    }) => rest
  );
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
      {jobs && <JobData jobs={jobs} />}
      {airQuality && <AirQualityChart airQualityData={airQuality} />}
      {demographics && <DemographicsTable data={demographics} />}
      {homePrice && (
        <HousingChart housingData={homePrice} rentData={rentPrice} />
      )}
    </div>
  );
}

export default City;
