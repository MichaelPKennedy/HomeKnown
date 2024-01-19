import React, { useEffect } from "react";
import styles from "./ResultsPage.module.css";
import { Button } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { useCityData } from "../../utils/CityDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

function ResultsPage({ data, toggleFormVisibility, showEditButton }) {
  const topTen = data?.topTen || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleHeartClick = (cityId) => {
    // Function to handle the logic when the heart is clicked
    console.log(`Heart clicked for city id: ${cityId}`);
    // Add your logic to handle the favorite action here
  };

  function HeartIcon({ onClick, className }) {
    return (
      <button
        onClick={onClick}
        className={className}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 258.06 245.35"
          className={styles.heartIcon}
        >
          <path d="M128.63,224.63h0C31.13,160.97-24.54,73.83,16.81,24.63,29.25,9.83,49.84,4.73,68.57,4.73s37.46,6.63,51.76,19.9l8.3,7.72,8.31-7.72c28.58-26.54,80.79-31.05,103.51,0,38.1,52.08,2.02,119.1-111.82,200Z" />
        </svg>
      </button>
    );
  }

  const renderCityData = (city, index) => {
    return (
      <div className={styles.cityContainer}>
        <Link
          to={`/results/${city.city_id}`}
          key={city.city_id}
          state={{ city }}
        >
          <HeartIcon
            onClick={() => handleHeartClick(city.city_id)}
            className={styles.heartButton}
          />
          <div className={styles.cityDetails}>
            {" "}
            {/* New wrapper for text */}
            <div className={styles.ranking}>#{index + 1}</div>
            <h4 className={styles.header}>
              {city.city_name}, {city.state_name}
            </h4>
            <h6 className={styles.text}>County: {city.county_name}</h6>
            <h6 className={styles.text}>
              Population: {city?.Population?.pop_2022 || "N/A"}
            </h6>
          </div>
        </Link>
        {city.photoUrl && (
          <Link
            to={`/results/${city.city_id}`}
            key={city.city_id}
            state={{ city }}
          >
            <img
              src={city.photoUrl}
              alt={`View of ${city.city_name}`}
              className={styles.cityImage}
            />
          </Link>
        )}
      </div>
    );
  };

  return (
    <div>
      {showEditButton && (
        <div className={styles.btnContainer}>
          <button
            onClick={toggleFormVisibility}
            className={`${styles.btnPreferences}`}
          >
            Edit Preferences
          </button>
        </div>
      )}
      <div className="mb-4 mt-4 text-center">
        <h4>Top Results</h4>
      </div>
      <div className={styles.resultsPage}>
        {topTen.length > 0 ? (
          topTen.map((city, index) => renderCityData(city, index))
        ) : (
          <p>No cities to display</p>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
