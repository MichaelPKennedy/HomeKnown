import React, { useEffect, useState, useContext } from "react";
import client from "../../feathersClient";
import styles from "../ResultsPage/ResultsPage.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useCityData } from "../../utils/CityDataContext";

const MyLocations = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { setUserCityData, userCityData } = useCityData();
  const [allStatesOpen, setAllStatesOpen] = useState(true);

  const groupCitiesByState = (cities) => {
    return cities.reduce((acc, city) => {
      const state = city.state_name;
      if (!acc[state]) {
        acc[state] = [];
      }
      acc[state].push(city);
      return acc;
    }, {});
  };

  const toggleAllStates = () => {
    const newState = {};
    Object.keys(citiesByState).forEach((state) => {
      newState[state] = !allStatesOpen;
    });
    setOpenStates(newState);
    setAllStatesOpen(!allStatesOpen);
  };

  const fetchCityData = async () => {
    try {
      const response = await client
        .service("survey")
        .find({ query: { user_id: user.user_id } });
      console.log("cities response find method", response);
      setUserCityData(response);
    } catch (error) {
      console.error("Error fetching saved cities:", error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || userCityData.length > 0) {
      return;
    }
    fetchCityData();
  }, [user]);

  const [citiesByState, setCitiesByState] = useState({});
  const [openStates, setOpenStates] = useState({});

  useEffect(() => {
    if (userCityData.length > 0) {
      const groupedCities = groupCitiesByState(userCityData);
      setCitiesByState(groupedCities);

      const initialOpenStates = {};
      Object.keys(groupedCities).forEach((state) => {
        initialOpenStates[state] = true;
      });
      setOpenStates(initialOpenStates);
    }
  }, [userCityData]);

  const toggleState = (state) => {
    setOpenStates((prev) => ({ ...prev, [state]: !prev[state] }));
  };

  const renderCityData = (city) => {
    return (
      <div className={styles.cityContainer} key={city.city_id}>
        <Link
          to={`/results/${city.city_id}`}
          key={city.city_id}
          state={{ city }}
        >
          <div className={styles.cityDetails}>
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
      </div>
    );
  };

  return (
    <div className={styles.myLocationsContainer}>
      <div className={styles.resultsContainer}>
        <h1 className={styles.resultsHeader}>My Locations</h1>
        <div className={styles.resultsList}>
          <button
            onClick={toggleAllStates}
            className={`btn float-right ${styles.toggleAllButton}`}
          >
            Toggle All
          </button>
          {Object.keys(citiesByState).map((state) => (
            <div key={state} className={styles.resultsList}>
              <button
                onClick={() => toggleState(state)}
                className={styles.stateDropdownButton}
              >
                {state}
              </button>
              {openStates[state] && (
                <div className={styles.myLocationsList}>
                  {citiesByState[state].map((city, index) =>
                    renderCityData(city, index)
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MyLocations;
