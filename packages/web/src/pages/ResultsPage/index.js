import React, { useEffect, useState, useContext } from "react";
import client from "../../feathersClient";
import styles from "./ResultsPage.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import HeartIcon from "../../components/HeartIcon";
import LoginModal from "../../components/LoginModal";

function ResultsPage({ data, toggleFormVisibility, showEditButton }) {
  const topTen = data?.topTen || [];
  const { isLoggedIn, user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchSavedCities();
  }, [user, isLoggedIn]);

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

  const renderCityData = (city, index) => {
    const isCitySaved = savedCities?.includes(city.city_id);
    return (
      <div className={styles.cityContainer} key={city.city_id}>
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
