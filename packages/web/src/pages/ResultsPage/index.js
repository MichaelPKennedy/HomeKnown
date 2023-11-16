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

function ResultsPage({ data, toggleFormVisibility, showEditButton }) {
  const topTen = data?.topTen || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderCityData = (city, index) => {
    console.log("city2", city);
    return (
      <div className={styles.cityContainer}>
        <Link
          to={`/results/${city.city_id}`}
          key={city.city_id}
          state={{ city }}
        >
          <div className={styles.ranking}>#{index + 1}</div>
          <h4 className={styles.header}>
            {city.city_name}, {city.state_name}
          </h4>
        </Link>
        <h6>County: {city.county_name}</h6>
        <h6>Population: {city?.Population?.pop_2022 || "N/A"}</h6>
      </div>
    );
  };

  return (
    <div className={styles.resultsPage}>
      <div className="align-self-start">
        {showEditButton && (
          <button
            onClick={toggleFormVisibility}
            className={`btn mt-4  ${styles.btnDropdown}`}
          >
            Edit Preferences
          </button>
        )}
      </div>
      <div className="mb-4">
        <h4>Top Results</h4>
      </div>
      {topTen.length > 0 ? (
        topTen.map((city, index) => renderCityData(city, index))
      ) : (
        <p>No cities to display</p>
      )}
    </div>
  );
}

export default ResultsPage;
