import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faCalendarAlt,
  faUmbrellaBeach,
  faWater,
  faUniversity,
  faSnowflake,
  faMapMarkerAlt,
  faFish,
  faSun,
  faMountain,
  faLeaf,
  faAnchor,
  faSeedling,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchNavStrip.module.css";

const SearchNavStrip = ({ onSelectionChange, currentSelection }) => {
  const options = [
    {
      id: "topMonthlyCities",
      label: "Top Monthly",
      icon: faCalendarAlt,
    },
    {
      id: "topCities",
      label: "Top All Time",
      icon: faCity,
    },
    {
      id: "tropical",
      label: "Tropical",
      icon: faUmbrellaBeach,
    },
    {
      id: "coast",
      label: "Coast",
      icon: faWater,
    },
    {
      id: "collegeTown",
      label: "College Town",
      icon: faUniversity,
    },
    {
      id: "winter",
      label: "Winter",
      icon: faSnowflake,
    },
    {
      id: "Southeast",
      label: "Southeast",
      icon: faMapMarkerAlt,
    },
    {
      id: "Pacific",
      label: "Pacific",
      icon: faFish,
    },
    {
      id: "Southwest",
      label: "Southwest",
      icon: faSun,
    },
    {
      id: "SouthCentral",
      label: "South Central",
      icon: faMapMarkerAlt,
    },
    {
      id: "PacificCoast",
      label: "Pacific Coast",
      icon: faWater,
    },
    {
      id: "MountainWest",
      label: "Mountain West",
      icon: faMountain,
    },
    {
      id: "NewEngland",
      label: "New England",
      icon: faLeaf,
    },
    {
      id: "MidAtlantic",
      label: "Mid-Atlantic",
      icon: faAnchor,
    },
    {
      id: "GreatLakes",
      label: "Great Lakes",
      icon: faWater,
    },
    {
      id: "GreatPlains",
      label: "Great Plains",
      icon: faSeedling,
    },
    {
      id: "PacificNorthwest",
      label: "Pacific Northwest",
      icon: faTree,
    },
  ];

  return (
    <div className={`d-flex bg-light p-3 ${styles.navStrip}`}>
      {options.map((option) => (
        <button
          key={option.id}
          className={`btn ${
            currentSelection === option.id
              ? styles.navButtonSelected
              : styles.navButton
          } ${currentSelection === option.id ? styles.selected : ""}`}
          onClick={() => onSelectionChange(option.id)}
        >
          <FontAwesomeIcon icon={option.icon} className={styles.icon} />
          <span
            className={
              currentSelection === option.id
                ? styles.boldLabel
                : styles.textLabel
            }
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SearchNavStrip;
