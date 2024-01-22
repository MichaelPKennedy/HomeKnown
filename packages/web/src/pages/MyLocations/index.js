import React, { useEffect, useState } from "react";
import styles from "../ResultsPage/ResultsPage.module.css";
import { Link } from "react-router-dom";
import { useCityData } from "../../utils/CityDataContext";

const MyLocations = () => {
  const { userCityData } = useCityData();
  const [selectedStates, setSelectedStates] = useState(new Set());
  const [allStatesOpen, setAllStatesOpen] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [tempSelectedStates, setTempSelectedStates] = useState(new Set());

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

  return (
    <div className={styles.myLocationsContainer}>
      <div className={styles.resultsContainer}>
        <h1 className={styles.resultsHeader}>My Locations</h1>
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
                <input
                  type="checkbox"
                  id={`checkbox-${state}`}
                  name={state}
                  checked={tempSelectedStates.has(state)}
                  onChange={handleCheckboxChange}
                />
                <label className={styles.label} htmlFor={`checkbox-${state}`}>
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
                    {citiesByState[state].map((city, index) => (
                      <div
                        className={styles.cityContainer}
                        key={`my-locations-${city.city_id}`}
                      >
                        <Link
                          to={`/results/${city.city_id}`}
                          key={city.city_id}
                          state={{ city }}
                        >
                          <div className={styles.cityDetails}>
                            <h4 className={styles.header}>
                              {city.city_name}, {city.state_name}
                            </h4>
                            <h6 className={styles.text}>
                              County: {city.county_name}
                            </h6>
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
