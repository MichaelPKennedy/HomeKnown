import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./City.module.css";
import RecreationMap from "../ResultsPage/components/RecreationMap";
import ReusableChart from "./components/ReusableChart";

function City() {
  const { cityId } = useParams();
  const location = useLocation();
  const { city } = location.state;
  console.log("city", city);

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
    </div>
  );
}

export default City;
