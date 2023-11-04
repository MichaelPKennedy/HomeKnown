import React, { useEffect } from "react";
import styles from "./ResultsPage.module.css";
import StateSalaryChart from "./components/StateSalaryChart";
import StateSalaryTable from "./components/StateSalaryTable";
import CitySalaryChart from "./components/CitySalaryChart";
import CitySalaryTable from "./components/CitySalaryTable";
import RecreationMap from "./components/RecreationMap";
import TemperatureGraph from "./components/TemperatureGraph";
import CityWeatherGraph from "./components/CityWeatherGraph";
import { useLocation, Link } from "react-router-dom";
import { useCityData } from "../../utils/CityDataContext";

function ResultsPage() {
  const location = useLocation();
  const { cityData, setCityData } = useCityData();
  const topTen = location.state?.data?.topTen || cityData;

  useEffect(() => {
    if (location.state?.data?.topTen && !cityData) {
      setCityData(location.state.data.topTen);
    }
  }, [location.state, cityData, setCityData]);
  const renderCityData = (city, index) => {
    return (
      <Link
        to={`/results/${city.city_id}`}
        key={city.city_id}
        state={{ city }}
        className={styles.cityContainer}
      >
        <div className={styles.ranking}>#{index + 1}</div>
        <h2>
          {city.city_name}, {city.state_name}
        </h2>
      </Link>
    );
  };

  return (
    <div className={styles.resultsPage}>
      <h1>Top 10</h1>
      {topTen && topTen.length > 0 ? (
        topTen.map((city, index) => renderCityData(city, index))
      ) : (
        <p>No cities to display</p>
      )}
    </div>
  );
}

export default ResultsPage;
