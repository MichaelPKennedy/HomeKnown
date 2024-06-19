import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import styles from "./ResultsPage.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import HeartIcon from "../../components/HeartIcon";
import LoginModal from "../../components/LoginModal";
import { useCityData } from "../../utils/CityDataContext";
import ResultsMap from "./components/ResultsMap";
import LargeResultsMap from "./components/LargeResultsMap";
import Photos from "./components/Photos";

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

    const toUrlFriendly = (str) => str?.toLowerCase()?.replace(/\s+/g, "_");

    return (
      <div className={styles.cityContainer} key={`results-${city.city_id}`}>
        <HeartIcon
          onClick={() => handleHeartClick(city.city_id)}
          className={styles.heartButton}
          isSaved={isCitySaved}
        />
        <Link
          to={`/results/${toUrlFriendly(city.state_name)}/${toUrlFriendly(
            city.city_name
          )}`}
          key={city.city_id}
          state={{ city, fromPage: "results", fromSurvey: true }}
        >
          <div className={styles.cityDetails}>
            <div className={styles.ranking}>{index + 1}</div>
            <p className={styles.header}>
              {city.city_name}, {city.state_name}
            </p>
          </div>
        </Link>
        {city.photos && city.photos.length > 0 ? (
          <Photos city={city}></Photos>
        ) : (
          <ResultsMap {...city}></ResultsMap>
        )}
        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    );
  };

  const getCanonicalUrl = () => {
    return window.location.href;
  };

  return (
    <div>
      <Helmet>
        <title>HomeKnown | Results</title>
        <meta
          name="description"
          content="Welcome to HomeKnown, your go-to platform for discovering amazing cities."
        />
        <link rel="canonical" href={getCanonicalUrl()} />
      </Helmet>
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
      <div className={styles.mapContainer}>
        <LargeResultsMap cities={topTen}></LargeResultsMap>
      </div>
    </div>
  );
}

export default ResultsPage;
