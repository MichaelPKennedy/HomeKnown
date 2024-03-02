import React, { useEffect, useState, useContext } from "react";
import styles from "./ResultsPage.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import HeartIcon from "../../components/HeartIcon";
import LoginModal from "../../components/LoginModal";
import { useCityData } from "../../utils/CityDataContext";
import ResultsMap from "./components/ResultsMap";
import LargeResultsMap from "./components/LargeResultsMap";
import goldMedal from "../../assets/gold-medal.png";
import silverMedal from "../../assets/silver-medal.png";
import bronzeMedal from "../../assets/bronze-medal.png";

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
    let rankingElement;

    if (index === 0) {
      rankingElement = (
        <img
          src={goldMedal}
          alt="First Place"
          className={styles.rankingImage}
        />
      );
    } else if (index === 1) {
      rankingElement = (
        <img
          src={silverMedal}
          alt="Second Place"
          className={styles.rankingImage}
        />
      );
    } else if (index === 2) {
      rankingElement = (
        <img
          src={bronzeMedal}
          alt="Third Place"
          className={styles.rankingImage}
        />
      );
    } else {
      rankingElement = <div className={styles.ranking}>{index + 1}</div>;
    }

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
            {rankingElement}
            <p className={styles.header}>
              {city.city_name}, {city.state_name}
            </p>
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
      <div className="mb-4 mt-4 text-center"></div>
      <div className={styles.resultsPage}>
        {topTen.length > 0 ? (
          topTen.map((city, index) => renderCityData(city, index))
        ) : (
          <p>No cities to display</p>
        )}
      </div>
      <div className={styles.largeMapContainer}>
        <LargeResultsMap cities={topTen}></LargeResultsMap>
      </div>
    </div>
  );
}

export default ResultsPage;
