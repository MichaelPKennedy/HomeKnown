import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams, Outlet, useNavigate } from "react-router-dom";
import styles from "./City.module.css";
import JobData from "./components/JobData";
import AirQualityChart from "./components/AirQualityChart";
import DemographicsTable from "./components/DemographicsTable";
import HousingChart from "./components/HousingChart";
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
  const isMainRoute = location.pathname === `/results/${cityId}`;

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;

  const {
    Jobs: jobs,
    AirQuality: airQuality,
    CityDemographics: demographics,
    HomePrice: homePriceData,
    MonthlyRent: rentPriceData,
  } = currentCity;
  let state = currentCity.state_name;
  if (state === "District of Columbia") {
    state = "DC";
  }

  console.log("city", currentCity);

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
    navigate("/");
  };

  return (
    //     {airQuality && <AirQualityChart airQualityData={airQuality} />}
    //     {demographics && <DemographicsTable data={demographics} />}
    //     {showLoginModal && (
    //       <LoginModal onClose={() => setShowLoginModal(false)} />
    //     )}
    //   </div>
    //   <Outlet />
    // </CityDataProvider>

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
              <FontAwesomeIcon icon={faAngleLeft} /> Results
            </button>
            <p className={styles.header}>
              {currentCity?.city_name}, {state}
            </p>
            <HeartIcon
              onClick={() => handleHeartClick(cityId)}
              className={styles.heartButton}
              isSaved={isCitySaved}
            />
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
