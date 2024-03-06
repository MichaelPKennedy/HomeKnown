import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../HomePage.module.css";

import { AuthContext } from "../../../AuthContext";
import HeartIcon from "../../../components/HeartIcon";
import LoginModal from "../../../components/LoginModal";
import { useCityData } from "../../../utils/CityDataContext";
import goldMedal from "../../../assets/gold-medal.png";
import silverMedal from "../../../assets/silver-medal.png";
import bronzeMedal from "../../../assets/bronze-medal.png";

const CityCard = ({ city }, index) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { userCityIds, addCity, removeCity } = useCityData();
  const isCitySaved = userCityIds.some((id) => id === city.city_id);
  let rankingElement;

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

  if (index === 0) {
    rankingElement = (
      <img src={goldMedal} alt="First Place" className={styles.rankingImage} />
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
        state={{ city, fromPage: "home" }}
      >
        <div className={styles.cityDetails}>
          {rankingElement}
          <p className={styles.header}>
            {city.city_name}, {city.state_name}
          </p>
        </div>
      </Link>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default CityCard;
