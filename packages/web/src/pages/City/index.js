import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { useLocation, Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import HeartIcon from "./components/HeartIcon";
import { AuthContext } from "../../AuthContext";
import { useCityData } from "../../utils/CityDataContext";
import LoginModal from "../../components/LoginModal";
import SideBar from "./components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import LoadingScreen from "./components/LoadingScreen";
import client from "../../feathersClient.js";

function City() {
  const location = useLocation();
  const navigate = useNavigate();
  const [backPage, setBackPage] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const { city, fromSurvey } = location?.state || {};
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

  const currentCity = fromSurvey ? city : cityData;
  const { city_id } = city || {};
  const { state, cityName } = useParams();

  useEffect(() => {
    if (city_id) {
      setCityId(city_id);
    }
  }, [city_id]);

  useEffect(() => {
    const fetchCityId = async () => {
      if (!city_id) {
        setSearchLoading(true);
        const searchTerm = `${cityName} ${state}`.replace(/_/g, " ");

        const authToken = localStorage.getItem("authToken");
        let headers;
        if (authToken) {
          headers = {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
        }
        try {
          const response = await client.service("/search").find({
            query: {
              search: searchTerm,
            },
            headers,
          });
          console.log("response", response);
          const { city_id: fetchedCityId } = response[0];
          if (fetchedCityId) {
            setCityId(fetchedCityId);
            setSearchLoading(false);
          }
        } catch (error) {
          console.error("Error fetching city ID:", error);
        }
      }
    };
    fetchCityId();
  }, [city_id, setCityId, useParams]);

  useEffect(() => {
    if (location.state?.fromPage && location.state.fromPage !== backPage) {
      setBackPage(location.state.fromPage);
    }
  }, [location, backPage]);

  const isCitySaved = userCityData.some(
    (savedCity) => savedCity.city_id === Number(city_id)
  );
  const { isLoggedIn } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (isLoading && !currentCity) return <LoadingScreen />;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity && !searchLoading)
    return <div>No city data available.</div>;

  let stateName = currentCity?.state_name;
  if (state === "District of Columbia") {
    state = "DC";
  }

  const handleHeartClick = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (isCitySaved) {
      await removeCity(Number(city_id));
    } else {
      await addCity(Number(city_id));
    }
  };

  const handleBack = () => {
    switch (backPage) {
      case "results":
        navigate("/explore");
        break;
      case "search":
        navigate("/");
        break;
      case "home":
        navigate("/");
        break;
      case "my-locations":
        navigate("/my-locations");
        break;
      case "recommendations":
        navigate("/recommendations");
        break;
      default:
        navigate("/");
    }
  };

  const backButtonLabel = () => {
    switch (backPage) {
      case "results":
        return "Results";
      case "search":
        return "Search";
      case "my-locations":
        return "My Locations";
      case "recommendations":
        return "Recommendations";
      case "home":
        return "Back to Home";
      default:
        return "Back";
    }
  };

  if (searchLoading) return <LoadingScreen />;

  const getCanonicalUrl = () => {
    return window.location.href;
  };

  return (
    <div className="container-fluid">
      <Helmet>
        <title>
          {currentCity?.city_name}, {currentCity?.state_abbrev}
        </title>
        <meta
          name="description"
          content="Welcome to HomeKnown, your go-to platform for discovering amazing cities."
        />
        <link rel="canonical" href={getCanonicalUrl()} />
      </Helmet>
      <div className={`row ${styles.cityContainer}`}>
        <div className={`${styles.navContainer} col-md-3 col-12 bg-light`}>
          <SideBar city_id={city_id} city={currentCity} />
        </div>
        <main className={`col-md-9 col-12 ms-sm-auto px-4 p`}>
          <div className={styles.headerContainer}>
            <button
              onClick={handleBack}
              className={`btn btn-secondary ${styles.backButton}`}
            >
              <FontAwesomeIcon icon={faAngleLeft} className="mr-1" />{" "}
              {backButtonLabel()}
            </button>
            <div className={`${styles.cityName} container`}>
              <p className={styles.header}>
                {currentCity?.city_name}, {stateName}
              </p>
              <HeartIcon
                onClick={() => handleHeartClick(city_id)}
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
