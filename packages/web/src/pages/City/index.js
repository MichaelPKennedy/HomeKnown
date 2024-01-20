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
import client from "../../feathersClient";
import LoginModal from "../../components/LoginModal";

function City() {
  const location = useLocation();
  const { city } = location.state;
  const [savedCities, setSavedCities] = useState([]);
  const cityId = city.city_id;
  const isCitySaved = savedCities?.includes(cityId);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
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

  const weatherData = city.Weather;
  const startYear = 2010;
  const endYear = 2023;

  const fetchSavedCities = async () => {
    try {
      const response = await client
        .service("user-cities")
        .find({ query: { user_id: user?.user_id } });
      const cityIds = response.data;
      setSavedCities(cityIds);
    } catch (error) {
      console.error("Error fetching saved cities:", error);
    }
  };

  const handleHeartClick = async (cityId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    try {
      if (savedCities.includes(cityId)) {
        await client
          .service("user-cities")
          .remove(cityId, { query: { user_id: user?.user_id } });
        setSavedCities((prev) => prev.filter((id) => id !== cityId));
      } else {
        await client
          .service("user-cities")
          .create({ user_id: user?.user_id, city_id: cityId });
        setSavedCities((prev) => [...prev, cityId]);
      }
    } catch (error) {
      console.error("Error updating saved city:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchSavedCities();
  }, [user, isLoggedIn]);

  return (
    <div className={styles.cityPage}>
      <div className={styles.headerContainer}>
        <h1 className="mb-0">
          {city.city_name}, {city.state_name}
        </h1>
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
