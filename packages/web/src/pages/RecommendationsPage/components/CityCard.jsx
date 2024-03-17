import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../../../components/LoginModal";
import Photos from "./Photos";
import styles from "./CityCard.module.css";

const CityCard = ({ city, index }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className={styles.cityContainer} key={`results-${city.cityId}`}>
      <Link
        to={`/results/${city.cityId}`}
        key={city.cityId}
        state={{ fromPage: "home" }}
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
