import React, { useEffect, useState, useContext } from "react";
import styles from "./ResultsPage.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import HeartIcon from "../../components/HeartIcon";
import LoginModal from "../../components/LoginModal";
import { useCityData } from "../../utils/CityDataContext";
import ResultsMap from "./components/ResultsMap";

function ResultsPage({ data, toggleFormVisibility, showEditButton }) {
  const topTen = data?.topTen || [];
  const { isLoggedIn } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { userCityIds, addCity, removeCity } = useCityData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleHeartClick = async (cityId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    const isCitySaved = userCityIds.some((id) => id === cityId);
    if (isCitySaved) {
      await removeCity(cityId);
    } else {
      await addCity(cityId);
    }
  };

  const renderCityData = (city, index) => {
    const isCitySaved = userCityIds.some((id) => id === city.city_id);
    return (
      <div className={styles.cityContainer} key={`results-${city.city_id}`}>
        <HeartIcon
          onClick={() => handleHeartClick(city.city_id)}
          className={styles.heartButton}
          isSaved={isCitySaved}
        />
        <Link
          to={`/results/${city.city_id}`}
          key={city.city_id}
          state={{ city }}
        >
          <div className={styles.cityDetails}>
            {" "}
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
        <ResultsMap {...city}></ResultsMap>
        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
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
