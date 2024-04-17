import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../../../components/LoginModal";
import Photos from "./Photos";
import HomeMap from "./HomeMap";
import styles from "./CityCard.module.css";

const CityCard = ({ city, index }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className={styles.cityContainer} key={`results-${city.city_id}`}>
      <Link
        to={`/results/${city.city_id}`}
        key={city.city_id}
        state={{ fromPage: "home" }}
      >
        <div className={styles.cityDetails}>
          <div className={styles.ranking}>{index + 1}</div>
          <p className={styles.header}>
            {city.city_name}, {city.state_name}
          </p>
        </div>
      </Link>
      {city.photos && city.photos.length > 0 ? (
        <Photos city={city} />
      ) : (
        <HomeMap {...city} />
      )}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default CityCard;
