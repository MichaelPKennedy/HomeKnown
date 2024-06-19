import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import styles from "../ResultsPage/ResultsPage.module.css";
import { Link } from "react-router-dom";
import { useCityData } from "../../utils/CityDataContext";
import { AuthContext } from "../../AuthContext";
import LoginModal from "../../components/LoginModal";
import PleaseLogin from "./components/PleaseLogin";
import LargeResultsMap from "../ResultsPage/components/LargeResultsMap";

const MyLocations = () => {
  const { userCityData, userCityIds, addCity, removeCity } = useCityData();
  const [selectedStates, setSelectedStates] = useState(new Set());
  const [allStatesOpen, setAllStatesOpen] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [tempSelectedStates, setTempSelectedStates] = useState(new Set());
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const groupCitiesByState = (cities) => {
    const groupedCities = {};
    const initialOpenStates = {};

    cities.forEach((city) => {
      const state = city.state_name;
      if (!groupedCities[state]) {
        groupedCities[state] = [];
        initialOpenStates[state] = true;
      }
      groupedCities[state].push(city);
    });

    setOpenStates(initialOpenStates);
    return groupedCities;
  };

  const [citiesByState, setCitiesByState] = useState({});
  const [openStates, setOpenStates] = useState({});

  useEffect(() => {
    if (userCityData.length > 0) {
      const groupedCities = groupCitiesByState(userCityData);
      setCitiesByState(groupedCities);

      const allStates = new Set(Object.keys(groupedCities));
      setSelectedStates(allStates);
      setTempSelectedStates(allStates);
    }
  }, [userCityData]);

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

  const toggleState = (state) => {
    setOpenStates((prev) => ({ ...prev, [state]: !prev[state] }));
  };

  const toggleSelectAllStates = () => {
    if (tempSelectedStates.size === Object.keys(citiesByState).length) {
      setTempSelectedStates(new Set());
    } else {
      setTempSelectedStates(new Set(Object.keys(citiesByState)));
    }
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleCheckboxChange = (event) => {
    const state = event.target.name;
    const isChecked = event.target.checked;
    setTempSelectedStates((prev) => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(state);
      } else {
        newSet.delete(state);
      }
      return newSet;
    });
  };

  const toggleAllStates = () => {
    const newState = !allStatesOpen;
    setOpenStates((prev) => {
      const newOpenStates = { ...prev };
      Object.keys(citiesByState).forEach((state) => {
        newOpenStates[state] = newState;
      });
      return newOpenStates;
    });
    setAllStatesOpen(newState);
  };

  const applyFilter = () => {
    setSelectedStates(tempSelectedStates);
    setIsFilterVisible(false);
  };

  const selectOnlyThisState = (selectedState) => {
    setTempSelectedStates(new Set([selectedState]));
  };

  const filteredCities = userCityData.filter((city) =>
    selectedStates.has(city.state_name)
  );

  const hasLocations = userCityIds && userCityIds.length > 0;

  const toUrlFriendly = (str) => str?.toLowerCase()?.replace(/\s+/g, "_");

  return isLoggedIn ? (
    <>
      <Helmet>
        <title>HomeKnown | My Locations</title>
        <meta
          name="description"
          content="Welcome to HomeKnown, your go-to platform for discovering amazing cities."
        />
      </Helmet>
      {hasLocations ? (
        <div className={styles.myLocationsContainer}>
          <button
            onClick={toggleFilterVisibility}
            className={styles.filterButton}
          >
            Select Filters
          </button>
          {isFilterVisible && (
            <div className={styles.filterOptions}>
              <button
                onClick={toggleSelectAllStates}
                className={`btn ${styles.selectAllButton}`}
              >
                {tempSelectedStates.size === Object.keys(citiesByState).length
                  ? "Deselect All"
                  : "Select All"}
              </button>
              {Object.keys(citiesByState).map((state) => (
                <div key={state} className={styles.checkboxContainer}>
                  <label className={styles.label} htmlFor={`checkbox-${state}`}>
                    <input
                      type="checkbox"
                      id={`checkbox-${state}`}
                      name={state}
                      checked={tempSelectedStates.has(state)}
                      onChange={handleCheckboxChange}
                    />
                    {state}
                  </label>
                  <button
                    onClick={() => selectOnlyThisState(state)}
                    className={`${styles.selectOnlyButton} float-right`}
                  >
                    Only
                  </button>
                </div>
              ))}
              <button onClick={applyFilter} className={styles.applyButton}>
                Save and Apply
              </button>
            </div>
          )}
          <div className={styles.resultsList}>
            <button
              onClick={toggleAllStates}
              className={`btn float-right ${styles.toggleAllButton}`}
            >
              {allStatesOpen ? "Close All" : "Expand All"}
            </button>
            {Object.keys(citiesByState)
              .filter((state) => selectedStates.has(state))
              .map((state) => (
                <div key={state} className={styles.stateSection}>
                  <button
                    onClick={() => toggleState(state)}
                    className={styles.stateDropdownButton}
                  >
                    {state}
                  </button>
                  {openStates[state] && (
                    <div className={styles.myLocationsList}>
                      {citiesByState[state].map((city, index) => {
                        const isCitySaved = userCityIds.some(
                          (id) => id === city.city_id
                        );
                        return (
                          <div
                            className={styles.myLocationsBox}
                            key={`my-locations-${city.city_id}`}
                          >
                            <Link
                              to={`/results/${toUrlFriendly(
                                city.state_name
                              )}/${toUrlFriendly(city.city_name)}`}
                              key={city.city_id}
                              state={{
                                city,
                                fromPage: "my-locations",
                                fromSurvey: false,
                              }}
                            >
                              <div className={styles.cityDetails}>
                                <p className={styles.myLocationsHeader}>
                                  {city.city_name}
                                </p>
                              </div>
                            </Link>
                            <span
                              onClick={() => handleHeartClick(city.city_id)}
                              className={styles.myLocationsHeartButton}
                              role="button"
                              tabIndex="0"
                              onKeyDown={(event) =>
                                event.key === "Enter" &&
                                handleHeartClick(city.city_id)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              x
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className={styles.myLocationsMapContainer}>
            <LargeResultsMap cities={filteredCities}></LargeResultsMap>
          </div>
          {showLoginModal && (
            <LoginModal onClose={() => setShowLoginModal(false)} />
          )}
        </div>
      ) : (
        <div className="ml-5 mt-5">Locations you save will appear here.</div>
      )}
    </>
  ) : (
    <PleaseLogin />
  );
};
export default MyLocations;
