import React, { useState, useEffect } from "react";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import RecreationMap from "../../ResultsPage/components/RecreationMap";
import { fetchDataForPreference } from "../../ResultsPage/constants";
import Select from "react-select";
import styles from "./Recreation.module.css";
import { Spinner } from "react-bootstrap";

const options = [
  { value: "nationalParks", label: "National Parks" },
  { value: "botanicalGardens", label: "Botanical Gardens" },
  { value: "rivers", label: "Rivers" },
  { value: "zoos", label: "Zoos" },
  { value: "wildlifeReserves", label: "Wildlife Reserves" },
  { value: "beaches", label: "Beaches" },
  { value: "lakes", label: "Lakes" },
  { value: "mountains", label: "Mountains" },
  { value: "waterfalls", label: "Waterfalls" },
  { value: "forests", label: "Forests" },
  { value: "parks", label: "Parks" },
  { value: "hikingTrails", label: "Hiking Trails" },
  { value: "caves", label: "Caves" },
  { value: "skiResorts", label: "Ski Resorts" },
  { value: "outdoorRockClimbing", label: "Outdoor Rock Climbing" },
  { value: "crossCountrySkiAreas", label: "Cross Country Ski Areas" },
  { value: "indoorClimbingCentres", label: "Indoor Climbing Centres" },
  { value: "outdoorTennisCentres", label: "Outdoor Tennis Centres" },
  { value: "sportsCentres", label: "Sports Centres" },
  { value: "indoorSwimmingFacilities", label: "Indoor Swimming Facilities" },
  { value: "golfCourses", label: "Golf Courses" },
  { value: "hotAirBalloonRides", label: "Hot Air Balloon Rides" },
  { value: "bicycleTrails", label: "Bicycle Trails" },
  { value: "monuments", label: "Monuments" },
  { value: "museums", label: "Museums" },
  { value: "artGalleries", label: "Art Galleries" },
  { value: "historicSites", label: "Historic Sites" },
  { value: "spasAndWellnessCenters", label: "Spas and Wellness Centers" },
  { value: "yogaStudios", label: "Yoga Studios" },
  { value: "fitnessGyms", label: "Fitness Gyms" },
  { value: "danceStudios", label: "Dance Studios" },
];

const Recreation = () => {
  const location = useLocation();
  const { city } = location?.state || {};
  const { cityData, isLoading, error } = useCityData();
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const currentCity = city ? city : cityData;
  const fromSurvey = city ? true : false;

  const handleSearch = async () => {
    if (selectedOption && currentCity) {
      setIsLoadingSearch(true);
      setNoResults(false);
      try {
        const elements = await fetchDataForPreference(
          selectedOption.value,
          currentCity
        );
        let namedElements;
        if (elements.length > 500) {
          namedElements = elements
            .filter((el) => el.tags && el.tags.name)
            .slice(0, 500);
        } else {
          namedElements = elements;
        }
        setSearchData({ [selectedOption.value]: namedElements });
        if (namedElements.length === 0) {
          setNoResults(true);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoadingSearch(false);
      }
    }
  };

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;

  return (
    <>
      {!city && (
        <div className={styles.searchContainer}>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="Select a Recreation Activity"
            isClearable
            className={styles.select}
          />
          <button onClick={handleSearch} className={styles.searchBtn}>
            Search
          </button>
        </div>
      )}
      {isLoadingSearch && (
        <div className="d-flex align-items-center ml-3 mb-3">
          <p className="mb-0 mr-1">Locations Loading...</p>
          <Spinner animation="border" size="sm" />
        </div>
      )}
      {noResults && (
        <div className="d-flex align-items-center ml-3 mb-3">
          No results found. Try a different search.
        </div>
      )}
      {currentCity && (
        <RecreationMap
          data={currentCity}
          searchData={searchData}
          fromSurvey={fromSurvey}
        />
      )}
    </>
  );
};

export default Recreation;
