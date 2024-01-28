import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams, Outlet, useNavigate } from "react-router-dom";
import styles from "./City.module.css";
import ReusableChart from "./components/ReusableChart";
import JobData from "./components/JobData";
import AirQualityChart from "./components/AirQualityChart";
import DemographicsTable from "./components/DemographicsTable";
import HousingChart from "./components/HousingChart";
import WeatherForecast from "./components/WeatherForecast";
import HeartIcon from "../../components/HeartIcon";
import { AuthContext } from "../../AuthContext";
import { useCityData, CityDataProvider } from "../../utils/CityDataContext";
import LoginModal from "../../components/LoginModal";
import SideBar from "./components/SideBar";
import Overview from "./components/Overview";

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
    (savedCity) => savedCity.city_id === cityId
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

  const homePrice = homePriceData.map(
    ({
      city_id,
      city_name,
      county,
      id,
      abbrev,
      state_abbrev,
      metro,
      ...rest
    }) => rest
  );
  const rentPrice = rentPriceData.map(
    ({
      city_id,
      city_name,
      county,
      id,
      abbrev,
      state_abbrev,
      metro,
      ...rest
    }) => rest
  );

  console.log("city", currentCity);

  const weatherData = currentCity.Weather;
  const startYear = 2010;
  const endYear = 2023;

  const handleHeartClick = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (isCitySaved) {
      await removeCity(cityId);
    } else {
      await addCity(cityId);
    }
  };

  const handleBackToResults = () => {
    navigate("/");
  };

  return (
    //     <ReusableChart
    //       data={weatherData}
    //       label="Average Temperature"
    //       startYear={startYear}
    //       endYear={endYear}
    //       dataType="weather"
    //     />
    //     <WeatherForecast {...currentCity} />
    //     {jobs && <JobData jobs={jobs} />}
    //     {airQuality && <AirQualityChart airQualityData={airQuality} />}
    //     {demographics && <DemographicsTable data={demographics} />}
    //     {homePrice.length > 0 && rentPrice.length > 0 && (
    //       <HousingChart housingData={homePrice} rentData={rentPrice} />
    //     )}
    //     {showLoginModal && (
    //       <LoginModal onClose={() => setShowLoginModal(false)} />
    //     )}
    //   </div>
    //   <Outlet />
    // </CityDataProvider>
    <CityDataProvider>
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
                Back to Results
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
      </div>
    </CityDataProvider>
  );
}

export default City;
