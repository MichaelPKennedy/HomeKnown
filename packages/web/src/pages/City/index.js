import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams, Outlet, useNavigate } from "react-router-dom";
import styles from "./City.module.css";
import HeartIcon from "../../components/HeartIcon";
import { AuthContext } from "../../AuthContext";
import { useCityData } from "../../utils/CityDataContext";
import LoginModal from "../../components/LoginModal";
import SideBar from "./components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function City() {
  const location = useLocation();
  const navigate = useNavigate();

  const { city } = location?.state || {};
  const {
    setCityId,
    userCityData,
    addCity,
    removeCity,
    cityData,
    isLoading,
    error,
  } = useCityData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { cityId } = useParams();

  const currentCity = city ? city : cityData;

  useEffect(() => {
    if (cityId) {
      setCityId(cityId);
    }
  }, [cityId]);

  const isCitySaved = userCityData.some(
    (savedCity) => savedCity.city_id === Number(cityId)
  );
  const { isLoggedIn } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;

  let state = currentCity.state_name;
  if (state === "District of Columbia") {
    state = "DC";
  }

  const handleHeartClick = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (isCitySaved) {
      await removeCity(Number(cityId));
    } else {
      await addCity(Number(cityId));
    }
  };

  const handleBackToResults = () => {
    navigate("/explore");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`${styles.navContainer} col-md-3 col-12 bg-light`}>
          <SideBar cityId={cityId} />
        </div>
        <main className={`col-md-9 col-12 ms-sm-auto px-md-4`}>
          <div className={styles.headerContainer}>
            <button
              onClick={handleBackToResults}
              className={`btn btn-secondary ${styles.backButton}`}
            >
              <FontAwesomeIcon icon={faAngleLeft} /> Back to Results
            </button>
            <div className={styles.cityName}>
              <p className={styles.header}>
                {currentCity?.city_name}, {state}
              </p>
              <HeartIcon
                onClick={() => handleHeartClick(cityId)}
                className={styles.heartButton}
                isSaved={isCitySaved}
              />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

export default City;
