import React, { useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FilterBar.module.css";

const FilterBar = ({ filters, onFilterChange }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionChange = (field, value) => {
    const newValue = value === filters[field] ? "any" : value;
    onFilterChange(field, newValue);
  };

  const createButtonGroup = (field, options) => (
    <div className={styles.optionGroup}>
      {options.map((option) => (
        <button
          key={option}
          className={`${styles.innerButton} ${
            filters[field] === option.toString() ? styles.selected : ""
          }`}
          onClick={() => handleOptionChange(field, option.toString())}
        >
          {option}+
        </button>
      ))}
      <button
        className={`${styles.filterButton} ${
          filters[field] === "any" ? styles.selected : ""
        }`}
        onClick={() => handleOptionChange(field, "any")}
      >
        Any
      </button>
    </div>
  );

  const bedBathButtonText = () => {
    let text = "";
    text += filters.beds !== "any" ? `${filters.beds} bed` : "";
    text += filters.baths !== "any" ? `, ${filters.baths} bath` : "";
    return text || "Beds & Baths";
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterItem}>
        <select
          className={styles.filterSelect}
          value={filters.type}
          onChange={(e) => onFilterChange("type", e.target.value)}
        >
          <option value="for_rent">For Rent</option>
          <option value="for_sale">For Sale</option>
        </select>
      </div>
      <div className={styles.filterItem}>
        <button
          className={styles.filterButton}
          onClick={() => setShowOptions(!showOptions)}
        >
          {bedBathButtonText()}{" "}
          <FontAwesomeIcon
            icon={showOptions ? faAngleUp : faAngleDown}
            className={`ml-1 ${styles.icon}`}
          />
        </button>
        {showOptions && (
          <div className={styles.dropdownContent}>
            <div className={styles.filterLabel}>Bedrooms:</div>
            {createButtonGroup("beds", [1, 2, 3, 4, 5])}
            <div className={styles.filterLabel}>Bathrooms:</div>
            {createButtonGroup("baths", [1, 1.5, 2, 3, 4])}
            <button
              className={styles.applyButton}
              onClick={() => setShowOptions(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
