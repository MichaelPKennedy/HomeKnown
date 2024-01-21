import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import styles from "./City.module.css";
import RecreationMap from "../ResultsPage/components/RecreationMap";
import ReusableChart from "./components/ReusableChart";
import JobData from "./components/JobData";
import AirQualityChart from "./components/AirQualityChart";
import DemographicsTable from "./components/DemographicsTable";
import HousingChart from "./components/HousingChart";
import WeatherForecast from "./components/WeatherForecast";
import HeartIcon from "../../components/HeartIcon";
import { AuthContext } from "../../AuthContext";
import { useCityData } from "../../utils/CityDataContext";
import client from "../../feathersClient";
import LoginModal from "../../components/LoginModal";

function City() {
  const location = useLocation();
  const { city } = location.state;
  const { userCityData, addCity, removeCity } = useCityData();
  const cityId = city.city_id;
  const isCitySaved = userCityData.some(
    (savedCity) => savedCity.city_id === cityId
  );
  const { isLoggedIn, user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {
    Jobs: jobs,
    AirQuality: airQuality,
    CityDemographics: demographics,
    HomePrice: homePriceData,
    MonthlyRent: rentPriceData,
  } = city;
  let state = city.state_name;
  if (state === "District of Columbia") {
    state = "DC";
  }

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

  const weatherData = city.Weather;
  const startYear = 2010;
  const endYear = 2023;

  const handleHeartClick = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (isCitySaved) {
      await removeCity(cityId);
    } else {
      await addCity(cityId);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.cityPage}>
      <div className={styles.headerContainer}>
        <p className={styles.header}>
          {city.city_name}, {state}
        </p>
        <HeartIcon
          onClick={() => handleHeartClick(cityId)}
          className={styles.heartButton}
          isSaved={isCitySaved}
        />
      </div>
      <RecreationMap {...city} />
      <ReusableChart
        data={weatherData}
        label="Average Temperature"
        startYear={startYear}
        endYear={endYear}
        dataType="weather"
      />
      <WeatherForecast {...city} />
      {jobs && <JobData jobs={jobs} />}
      {airQuality && <AirQualityChart airQualityData={airQuality} />}
      {demographics && <DemographicsTable data={demographics} />}
      {homePrice.length > 0 && rentPrice.length > 0 && (
        <HousingChart housingData={homePrice} rentData={rentPrice} />
      )}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

export default City;
