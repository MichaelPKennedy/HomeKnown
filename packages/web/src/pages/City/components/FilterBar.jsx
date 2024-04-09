import React, { useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FilterBar.module.css";

const FilterBar = ({ filters, onFilterChange }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const buyPriceOptions = [
    0,
    50000,
    100000,
    150000,
    200000,
    250000,
    300000,
    350000,
    400000,
    450000,
    500000,
    550000,
    600000,
    650000,
    700000,
    750000,
    800000,
    850000,
    900000,
    950000,
    1000000,
    1250000,
    1500000,
    1750000,
    2000000,
    2250000,
    2500000,
    2750000,
    3000000,
    3250000,
    3500000,
    3750000,
    4000000,
    4250000,
    4500000,
    4750000,
    5000000,
    6000000,
    7000000,
    8000000,
    9000000,
    10000000,
    11000000,
    12000000,
    13000000,
    14000000,
    15000000,
    16000000,
    "any",
  ];

  const rentPriceOptions = [
    0,
    500,
    1000,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    4500,
    5000,
    5500,
    6000,
    6500,
    7000,
    7500,
    8000,
    8500,
    9000,
    9500,
    10000,
    "any",
  ];

  const sqftOptions = [
    500,
    1000,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    4500,
    5000,
    5500,
    6000,
    6500,
    7000,
    7500,
    8000,
    8500,
    9000,
    9500,
    10000,
    "any",
  ];

  const propertyTypes = [
    "apartment",
    "condo_townhome",
    "condos",
    "coop",
    "duplex_triplex",
    "farm",
    "land",
    "mobile",
    "multi_family",
    "single_family",
    "townhomes",
  ];

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleOptionChange = (field, value) => {
    const newValue = value === filters[field] ? "any" : value;
    onFilterChange(field, newValue);
  };

  const handlePropertyTypeChange = (propertyType) => {
    if (propertyType === "any") {
      const newPropertyTypes =
        filters.propertyTypes.length === propertyTypes.length
          ? []
          : [...propertyTypes];
      onFilterChange("propertyTypes", newPropertyTypes);
    } else {
      const newPropertyTypes = filters.propertyTypes.includes(propertyType)
        ? filters.propertyTypes.filter((type) => type !== propertyType)
        : [...filters.propertyTypes, propertyType];

      onFilterChange("propertyTypes", newPropertyTypes);
    }
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

  const createPriceDropdown = () => {
    const priceOptions =
      filters.status === "for_sale" ? buyPriceOptions : rentPriceOptions;
    return (
      <div className={styles.dropdownContent}>
        <div className={styles.filterLabel}>Price Range:</div>
        <div className={styles.priceRangeGroup}>
          <div>
            <label className={styles.label}>Minimum:</label>
            <select
              className={styles.select}
              value={filters.price.min}
              onChange={(e) =>
                onFilterChange("price", {
                  ...filters.price,
                  min: e.target.value,
                })
              }
            >
              {priceOptions.map((price) => (
                <option key={price} value={price}>
                  {price !== "any" ? `$${price.toLocaleString()}` : "No Min"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>Maximum:</label>
            <select
              className={styles.select}
              value={filters.price.max}
              onChange={(e) =>
                onFilterChange("price", {
                  ...filters.price,
                  max: e.target.value,
                })
              }
            >
              {priceOptions.map((price) => (
                <option key={price} value={price}>
                  {price !== "any" ? `$${price.toLocaleString()}` : "No Max"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className={styles.applyButton}
          onClick={() => setActiveDropdown(null)}
        >
          Apply
        </button>
      </div>
    );
  };

  const createSqftDropdown = () => {
    return (
      <div className={styles.dropdownContent}>
        <div className={styles.filterLabel}>Square Footage:</div>
        <div className={styles.sqftRangeGroup}>
          <div>
            <label className={styles.label}>Minimum:</label>
            <select
              className={styles.select}
              value={filters.sqft.min}
              onChange={(e) =>
                onFilterChange("sqft", {
                  ...filters.sqft,
                  min: e.target.value,
                })
              }
            >
              {sqftOptions.map((sqft) => (
                <option key={sqft} value={sqft}>
                  {sqft !== "any" ? sqft.toLocaleString() : "No Min"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>Maximum:</label>
            <select
              className={styles.select}
              value={filters.sqft.max}
              onChange={(e) =>
                onFilterChange("sqft", {
                  ...filters.sqft,
                  max: e.target.value,
                })
              }
            >
              {sqftOptions.map((sqft) => (
                <option key={sqft} value={sqft}>
                  {sqft !== "any" ? `$${sqft.toLocaleString()}` : "No Max"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className={styles.applyButton}
          onClick={() => setActiveDropdown(null)}
        >
          Apply
        </button>
      </div>
    );
  };

  const statusOptions = ["for_rent", "for_sale", "sold"];

  const createStatusDropdown = () => (
    <div className={styles.dropdownContent}>
      {statusOptions.map((status) => (
        <label key={status} className={styles.radioLabel}>
          <input
            type="radio"
            name="status"
            value={status}
            checked={filters.status === status}
            onChange={() => {
              handleOptionChange("status", status);
            }}
            className={styles.radioInput}
          />
          {status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
        </label>
      ))}
      <button
        className={styles.applyButton}
        onClick={() => setActiveDropdown(null)}
      >
        Apply
      </button>
    </div>
  );

  const createTypeDropdown = () => (
    <div className={styles.dropdownContent}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="propertyTypeAny"
          value="any"
          checked={
            filters.propertyTypes.length === 0 ||
            filters.propertyTypes.length === propertyTypes.length
          }
          onChange={() => handlePropertyTypeChange("any")}
          className={styles.checkboxInput}
        />
        Any
      </label>
      {propertyTypes.map((propertyType) => (
        <label key={propertyType} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="propertyType"
            value={propertyType}
            checked={filters.propertyTypes.includes(propertyType)}
            onChange={() => handlePropertyTypeChange(propertyType)}
            className={styles.checkboxInput}
          />
          {propertyType
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </label>
      ))}
      <button
        className={styles.applyButton}
        onClick={() => setActiveDropdown(null)}
      >
        Apply
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
        <button
          className={styles.filterButton}
          onClick={() => toggleDropdown("status")}
        >
          {filters.status.replace(/_/g, " ") || "Type"}
          <FontAwesomeIcon
            icon={activeDropdown === "status" ? faAngleUp : faAngleDown}
            className={`ml-1 ${styles.icon}`}
          />
        </button>
        {activeDropdown === "status" && createStatusDropdown()}
      </div>
      <div className={styles.filterItem}>
        <button
          className={styles.filterButton}
          onClick={() => toggleDropdown("price")}
        >
          Price
          <FontAwesomeIcon
            icon={activeDropdown === "price" ? faAngleUp : faAngleDown}
            className={`ml-1 ${styles.icon}`}
          />
        </button>
        {activeDropdown === "price" && createPriceDropdown()}
      </div>
      <div className={styles.filterItem}>
        <button
          className={styles.filterButton}
          onClick={() => toggleDropdown("bedsBaths")}
        >
          {bedBathButtonText()}{" "}
          <FontAwesomeIcon
            icon={activeDropdown === "bedsBaths" ? faAngleUp : faAngleDown}
            className={`ml-1 ${styles.icon}`}
          />
        </button>
        {activeDropdown === "bedsBaths" && (
          <div className={styles.dropdownContent}>
            <div className={styles.filterLabel}>Bedrooms:</div>
            {createButtonGroup("beds", [1, 2, 3, 4, 5])}
            <div className={styles.filterLabel}>Bathrooms:</div>
            {createButtonGroup("baths", [1, 1.5, 2, 3, 4])}
            <button
              className={styles.applyButton}
              onClick={() => setActiveDropdown(null)}
            >
              Apply
            </button>
          </div>
        )}
      </div>
      <div className={styles.filterItem}>
        <button
          className={styles.filterButton}
          onClick={() => toggleDropdown("propertyType")}
        >
          Home Types
          {filters.propertyTypes.length !== propertyTypes.length &&
            ` (${filters.propertyTypes.length})`}
          <FontAwesomeIcon
            icon={activeDropdown === "propertyType" ? faAngleUp : faAngleDown}
            className={`ml-1 ${styles.icon}`}
          />
        </button>
        {activeDropdown === "propertyType" && createTypeDropdown()}
      </div>
      <div className={styles.filterItem}>
        <button
          className={styles.filterButton}
          onClick={() => toggleDropdown("sqft")}
        >
          Square Feet
          <FontAwesomeIcon
            icon={activeDropdown === "sqft" ? faAngleUp : faAngleDown}
            className={`ml-1 ${styles.icon}`}
          />
        </button>
        {activeDropdown === "sqft" && createSqftDropdown()}
      </div>
    </div>
  );
};

export default FilterBar;
