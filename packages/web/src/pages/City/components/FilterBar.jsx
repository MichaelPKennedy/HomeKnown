import React, { useState } from "react";
import styles from "./FilterBar.module.css";

const FilterBar = ({ filters, onFilterChange, onApplyFilters }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionChange = (field, value) => {
    const newValue = filters[field] === value ? "any" : value;
    onFilterChange(field, newValue);
  };

  const createButtonGroup = (field, options) => (
    <div className={styles.optionGroup}>
      <label className={styles.filterLabel}>
        {field.charAt(0).toUpperCase() + field.slice(1)}:
      </label>
      <div className={styles.buttonGroup}>
        {["any", ...options].map((option) => (
          <button
            key={option}
            className={`${styles.filterButton} ${
              filters[field] === option ? styles.selected : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleOptionChange(field, option);
            }}
          >
            {option === "any" ? "Any" : `${option}+`}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterItem}>{/* ... */}</div>

      <div className={styles.filterItem}>
        <button
          className={styles.filterButton}
          onClick={() => setShowOptions(!showOptions)}
        >
          Beds & Baths
        </button>
        {showOptions && (
          <div
            className={styles.dropdownContent}
            onClick={(e) => e.stopPropagation()}
          >
            {createButtonGroup("beds", [1, 2, 3, 4, 5])}
            {createButtonGroup("baths", [1, 1.5, 2, 3, 4])}
            <button
              className={styles.applyButton}
              onClick={() => {
                setShowOptions(false);
                onApplyFilters();
              }}
            >
              Apply
            </button>
          </div>
        )}
      </div>
      <button className={styles.applyButton} onClick={onApplyFilters}>
        Apply
      </button>
    </div>
  );
};

export default FilterBar;
