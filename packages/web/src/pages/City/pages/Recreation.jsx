import React, { useState, useEffect } from "react";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import RecreationMap from "../../ResultsPage/components/RecreationMap";
import { fetchDataForPreference } from "../../ResultsPage/constants";
import {
  faHiking,
  faTree,
  faBicycle,
  faMountain,
  faWater,
  faLandmark,
  faMuseum,
  faShoppingCart,
  faUtensils,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const iconMap = {
  outdoor: faHiking,
  cultural: faMuseum,
  attractions: faMuseum,
  shopping: faShoppingCart,
  dining: faUtensils,
  historical: faLandmark,
  sites: faLandmark,
  parks: faTree,
  gardens: faTree,
  rivers: faWater,
  lakes: faWater,
  mountains: faMountain,
  waterfalls: faWater,
  forests: faTree,
  hiking: faHiking,
  trails: faHiking,
  caves: faMountain,
  resorts: faMountain,
  climbing: faMountain,
  sports: faBicycle,
  swimming: faWater,
  golf: faBicycle,
  balloon: faBicycle,
  bicycle: faBicycle,
  monuments: faLandmark,
  museums: faMuseum,
  galleries: faMuseum,
  wellness: faUtensils,
  studios: faUtensils,
  fitness: faUtensils,
  dance: faMusic,
};

const getIconForTitle = (title) => {
  const titleLower = title.toLowerCase();
  for (const key in iconMap) {
    if (titleLower.includes(key)) {
      return iconMap[key];
    }
  }
  return faLandmark;
};

const Recreation = () => {
  const location = useLocation();
  const { city, fromSurvey } = location?.state || {};
  const { cityData, isLoading, error } = useCityData();
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [recreationWeight, setRecreationWeight] = useState(false);
  const [recreationWeightLoading, setRecreationWeightLoading] = useState(true);

  const currentCity = fromSurvey ? city : cityData;
  const { cityDescriptions } = currentCity || {};

  useEffect(() => {
    const item = sessionStorage.getItem("formData");
    if (item) {
      const savedFormData = JSON.parse(item);
      if (Number(savedFormData?.weights?.recreationalActivitiesWeight) > 0) {
        setRecreationWeight(true);
      }
    }
    setRecreationWeightLoading(false);
  }, []);

  const handleSearch = async (option) => {
    if (option && currentCity) {
      setIsLoadingSearch(true);
      setNoResults(false);
      setSelectedOption(option);
      try {
        const elements = await fetchDataForPreference(
          option.value,
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
        setSearchData({ [option.value]: namedElements });
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

  const parseDescription = (description) => {
    const sections = description.split(/\d+\.\s+/).filter(Boolean);
    return sections.map((section, index) => {
      const sectionTitle = section.match(/^\d+\.\s*(.*)$/)?.[1] || section;
      const [title, ...items] = sectionTitle
        .split("\n")
        .map((item) => item.trim());
      const icon = getIconForTitle(title);
      const cleanedTitle = title.replace(/\d+\.\s*/, "");

      let bulletItems = [];
      let currentItem = "";

      items.forEach((item) => {
        if (item.startsWith("- ")) {
          if (currentItem) {
            bulletItems.push(currentItem.trim());
          }
          currentItem = item;
        } else if (item === "") {
          if (currentItem) {
            bulletItems.push(currentItem.trim());
            currentItem = "";
          }
        } else if (currentItem) {
          currentItem += ` ${item}`;
        }
      });

      if (currentItem) {
        bulletItems.push(currentItem.trim());
      }

      return (
        <div key={index} className="mb-5">
          <h3>
            <FontAwesomeIcon icon={icon} style={{ marginRight: "10px" }} />{" "}
            {cleanedTitle}
          </h3>
          {bulletItems.length > 0 && (
            <ul className={styles.bulletList}>
              {bulletItems.map((item, idx) => {
                const match = item.match(/^- (.*?):\s*(.*)$/);
                const attraction = match ? match[1] : null;
                const details = match ? match[2] : item.slice(2).trim();
                return (
                  <li key={idx}>
                    {attraction ? <strong>{attraction}:</strong> : null}{" "}
                    {details}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );
    });
  };

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;

  return (
    <div className="pb-5">
      {(!city || !recreationWeight || !fromSurvey) && (
        <div className={styles.searchContainer}>
          <Select
            value={selectedOption}
            onChange={handleSearch}
            options={options}
            placeholder="Select an Activity"
            isClearable
            className={styles.select}
          />
        </div>
      )}
      {isLoadingSearch && (
        <div className="d-flex align-items-center ml-1 mb-3">
          <p className="mb-0 mr-1">Locations Loading...</p>
          <Spinner animation="border" size="sm" />
        </div>
      )}
      {noResults && (
        <div className="d-flex align-items-center ml-3 mb-3">
          No results found. Try a different search.
        </div>
      )}
      {currentCity && !recreationWeightLoading && (
        <div className="mb-5">
          <RecreationMap
            data={currentCity}
            searchData={searchData}
            fromSurvey={fromSurvey}
            recreationWeight={recreationWeight}
          />
          {cityDescriptions && cityDescriptions.recreation && (
            <div className={styles.description}>
              <h2 className="mb-5">
                Things to do in {currentCity.city_name}...
              </h2>
              {parseDescription(cityDescriptions.recreation)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recreation;
