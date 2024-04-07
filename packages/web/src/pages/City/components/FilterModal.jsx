import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./FilterModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    marginBottom: "50px",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "600px",
    height: "100%",
    border: "1px solid #ccc",
    padding: "20px",
    paddingBottom: "70px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};

const isMobile = window.innerWidth < 768;

if (isMobile) {
  customStyles.content.width = "100%";
  customStyles.content.maxWidth = "100%";
}

const initialFilterOptions = {
  type: "for_sale",
  price: { min: "any", max: "any" },
  beds: "any",
  baths: "any",
  sqft: { min: "any", max: "any" },
  propertyType: "any",
};

Modal.setAppElement("#root");

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
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

  const bedOptions = [1, 2, 3, 4, 5];
  const bathOptions = [1, 1.5, 2, 3, 4];
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

  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);

  const handleInputChange = (field, subfield, value) => {
    if (subfield) {
      setFilterOptions((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subfield]: value,
        },
      }));
    } else {
      setFilterOptions((prev) => ({ ...prev, [field]: value }));
    }
  };

  const renderSelectOption = (option) => {
    if (typeof option === "number" || option === "any") {
      return option.toString();
    } else {
      return option.replace(/_/g, " ");
    }
  };

  const renderSelectInput = (label, field, options, includeAny = true) => (
    <div className={styles.fieldContainer}>
      <label className={styles.label}>{label}</label>
      <select
        className={styles.select}
        value={filterOptions[field]}
        onChange={(e) => handleInputChange(field, null, e.target.value)}
      >
        {includeAny && <option value="any">Any</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {renderSelectOption(option)}
          </option>
        ))}
      </select>
    </div>
  );

  const getPriceOptions = () => {
    return filterOptions.type === "for_sale"
      ? buyPriceOptions
      : rentPriceOptions;
  };

  const renderRangeSelectInput = (label, field) => {
    const options = getPriceOptions();
    return (
      <div>
        <label className={styles.label}>{label} Minimum:</label>
        <select
          className={styles.select}
          value={filterOptions[field].min}
          onChange={(e) => handleSelectChange(field, { min: e.target.value })}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option !== "any" ? `$${option.toLocaleString()}` : "No Min"}
            </option>
          ))}
        </select>
        <label className={styles.label}>{label} Maximum:</label>
        <select
          className={styles.select}
          value={filterOptions[field].max}
          onChange={(e) => handleSelectChange(field, { max: e.target.value })}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option !== "any" ? `$${option.toLocaleString()}` : "No Max"}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const handleSelectChange = (field, value) => {
    if (field === "type") {
      setFilterOptions((prev) => ({
        ...prev,
        price: { min: "any", max: "any" },
        [field]: value,
      }));
    } else {
      setFilterOptions((prev) => ({
        ...prev,
        [field]:
          typeof prev[field] === "object"
            ? { ...prev[field], ...value }
            : value,
      }));
    }
  };

  const clearFilters = () => {
    setFilterOptions(initialFilterOptions);
  };

  const propertyTypes = [
    "apartment",
    "condo_townhome",
    "condo_townhome_rowhome_coop",
    "condop",
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

  return isOpen ? (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Filter Properties"
    >
      <div className={styles.flexContainer}>
        <div className={styles.scrollableContent}>
          <div className={styles.btnContainer}>
            <p className={styles.header}>Filter Properties</p>
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
          </div>
          {renderSelectInput(
            "Rent or Buy",
            "type",
            ["for_rent", "for_sale"],
            false
          )}
          {renderRangeSelectInput("Price", "price")}
          {renderSelectInput("Beds", "beds", bedOptions, true)}
          {renderSelectInput("Baths", "baths", bathOptions, true)}
          {renderRangeSelectInput("Sqft", "sqft", sqftOptions)}
          {renderSelectInput(
            "Property Type",
            "propertyType",
            propertyTypes,
            true
          )}
        </div>
        <div className={styles.footer}>
          <button
            className={styles.button}
            onClick={() => onApplyFilters(filterOptions)}
          >
            Apply Filters
          </button>
          <button
            className={`${styles.button} ${styles.clearButton}`}
            onClick={clearFilters}
          >
            Clear All
          </button>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default FilterModal;
