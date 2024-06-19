import React, { useContext, useState, useEfffect, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../../../components/LoginModal";
import Photos from "./Photos";
import styles from "./CityCard.module.css";

const CityCard = ({ city, index }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toUrlFriendly = (str) => str?.toLowerCase()?.replace(/\s+/g, "_");

  return (
    <div className={styles.cityContainer} key={`results-${city.cityId}`}>
      <Link
        to={`/results/${toUrlFriendly(city.state)}/${toUrlFriendly(
          city.cityName
        )}`}
        key={city.cityId}
        state={{ fromPage: "home", city, fromSurvey: false }}
      >
        <div className={styles.cityDetails}>
          <div className={styles.ranking}>{index + 1}</div>
          <p className={styles.header}>
            {city.cityName}, {city.state}
          </p>
        </div>
      </Link>
      <Photos city={city} />
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default CityCard;
