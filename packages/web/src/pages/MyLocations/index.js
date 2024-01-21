import React, { useEffect, useState } from "react";
import styles from "../ResultsPage/ResultsPage.module.css";
import { Link } from "react-router-dom";
import { useCityData } from "../../utils/CityDataContext";

const MyLocations = () => {
  const { userCityData } = useCityData();
  const [allStatesOpen, setAllStatesOpen] = useState(true);
  const [selectedStates, setSelectedStates] = useState(new Set());
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [tempSelectedStates, setTempSelectedStates] = useState(new Set());

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
    setOpenStates((prev) => {
      const newState = { ...prev };
      selectedStates.forEach((state) => {
        if (newState.hasOwnProperty(state)) {
          newState[state] = allStatesOpen;
        }
      });
      return newState;
    });
    setAllStatesOpen(!allStatesOpen);
  };

  const handleStateSelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (o) => o.value
    );
    setSelectedStates(new Set(selectedOptions));
  };

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

  const toggleSelectAllStates = () => {
    if (selectedStates.size === Object.keys(citiesByState).length) {
      setSelectedStates(new Set());
    } else {
      setSelectedStates(new Set(Object.keys(citiesByState)));
    }
  };

  const renderCityData = (city) => {
    return (
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
        <button
          onClick={toggleSelectAllStates}
          className={`btn ${styles.selectAllButton}`}
        >
          {selectedStates.size === Object.keys(citiesByState).length
            ? "Deselect All"
            : "Select All"}
        </button>
        <select
          multiple
          value={[...selectedStates]}
          onChange={handleStateSelection}
          className={styles.stateSelect}
        >
          {Object.keys(citiesByState).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <div className={styles.resultsList}>
          <button
            onClick={toggleAllStates}
            className={`btn float-right ${styles.toggleAllButton}`}
          >
            Toggle All
          </button>
          {Object.keys(citiesByState)
            .filter((state) => selectedStates.has(state))
            .map((state) => (
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
