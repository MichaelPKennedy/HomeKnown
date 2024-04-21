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
      id: "coast",
      label: "Coastal",
      icon: faWater,
    },
    {
      id: "tropical",
      label: "Tropical",
      icon: faUmbrellaBeach,
    },
    // {
    //   id: "collegeTown",
    //   label: "College Town",
    //   icon: faUniversity,
    // },
    {
      id: "winter",
      label: "Snowy",
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
      id: "South Central",
      label: "South Central",
      icon: faMapMarkerAlt,
    },
    {
      id: "Pacific Coast",
      label: "Pacific Coast",
      icon: faWater,
    },
    {
      id: "Mountain West",
      label: "Mountain West",
      icon: faMountain,
    },
    {
      id: "Pacific Northwest",
      label: "Pacific Northwest",
      icon: faTree,
    },
    {
      id: "New England",
      label: "New England",
      icon: faLeaf,
    },
    {
      id: "Mid-Atlantic",
      label: "Mid-Atlantic",
      icon: faAnchor,
    },
    {
      id: "Great Lakes",
      label: "Great Lakes",
      icon: faWater,
    },
    {
      id: "Great Plains",
      label: "Great Plains",
      icon: faSeedling,
    },
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
