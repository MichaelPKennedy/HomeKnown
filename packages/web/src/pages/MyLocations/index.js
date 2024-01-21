import React, { useEffect, useState, useContext } from "react";
import client from "../../feathersClient";
import styles from "../ResultsPage/ResultsPage.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useCityData } from "../../utils/CityDataContext";

const MyLocations = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { setUserCityData, userCityData } = useCityData();

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
    if (!isLoggedIn) {
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
    }
  }, [userCityData]);

  const toggleState = (state) => {
    setOpenStates((prev) => ({ ...prev, [state]: !prev[state] }));
  };

  return (
    <div className={styles.resultsPageContainer}>
      <div className={styles.resultsContainer}>
        <h1 className={styles.resultsHeader}>My Locations</h1>
        <div className={styles.resultsList}>
          {Object.keys(citiesByState).map((state) => (
            <div key={state}>
              <button
                onClick={() => toggleState(state)}
                className={styles.stateDropdownButton}
              >
                {state}
              </button>
              {openStates[state] && (
                <div className={styles.cityList}>
                  {citiesByState[state].map((city) => (
                    <div key={city.city_id} className={styles.cityContainer}>
                      <Link to={`/city/${city.city_id}`} state={{ city }}>
                        <div className={styles.cityName}>{city.city_name}</div>
                      </Link>
                    </div>
                  ))}
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
