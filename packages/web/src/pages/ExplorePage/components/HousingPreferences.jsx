// HousingPreferences.js
import React from "react";
import Slider from "rc-slider";
import "./Slider.css";
import "rc-slider/assets/index.css";
import styles from "./LivingPreferenceForm.module.css";

const HousingPreferences = ({ formData, setFormData }) => {
  // JSX for the component
  return (
    <div className={`form-group ${styles.formGroup}`}>
      <h4 className="pb-2">Housing</h4>
      <p className={styles.question}>Are you looking to buy or rent?</p>
      <div>
        <label className={styles.radioFormCheckLabel}>
          <input
            className={styles.formCheckInput}
            type="radio"
            name="housingType"
            value="buy"
            checked={formData.housingType === "buy"}
            onChange={(e) =>
              setFormData({ ...formData, housingType: e.target.value })
            }
          />
          Buy
        </label>
        <label className={styles.radioFormCheckLabel}>
          <input
            className={styles.formCheckInput}
            type="radio"
            name="housingType"
            value="rent"
            checked={formData.housingType === "rent"}
            onChange={(e) =>
              setFormData({ ...formData, housingType: e.target.value })
            }
          />
          Rent
        </label>
      </div>

      {/* If buying */}
      {formData.housingType === "buy" && (
        <div className={`form-group mt-3`}>
          <p htmlFor="homePriceRange" className={styles.question}>
            What is the home price range you are looking for?
          </p>
          <Slider
            range
            min={50000}
            max={1000000}
            value={[formData.homeMin, formData.homeMax]}
            onChange={(values) => {
              setFormData((prevState) => ({
                ...prevState,
                homeMin: values[0],
                homeMax: values[1],
              }));
            }}
          />
          <div className="mt-2">
            ${formData.homeMin || 50000} - ${formData.homeMax || 1000000}
          </div>
        </div>
      )}

      {/* If renting */}
      {formData.housingType === "rent" && (
        <div className={`form-group mt-3`}>
          <label htmlFor="rentPriceRange">
            What is the rent price range you are looking for?
          </label>
          <Slider
            range
            min={500}
            max={5000}
            value={[formData.rentMin, formData.rentMax]}
            onChange={(values) => {
              setFormData((prevState) => ({
                ...prevState,
                rentMin: values[0],
                rentMax: values[1],
              }));
            }}
          />
          <div className="mt-2">
            ${formData.rentMin || 500} - ${formData.rentMax || 5000}
          </div>
        </div>
      )}
    </div>
  );
};

export default HousingPreferences;
