import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchNavStrip.module.css";

const SearchNavStrip = ({ onSelectionChange, currentSelection }) => {
  const options = [
    {
      id: "topMonthlyCities",
      label: "Top Monthly",
      icon: faCalendarAlt,
    },
    { id: "topCities", label: "Top All Time", icon: faCity },
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
