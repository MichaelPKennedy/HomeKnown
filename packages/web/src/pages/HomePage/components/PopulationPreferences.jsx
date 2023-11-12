import React from "react";
import styles from "./LivingPreferenceForm.module.css";

const PopulationPreferences = ({ formData, handleInputChange }) => {
  return (
    <div className={`form-group ${styles.formGroup}`}>
      <label>Living Preference:</label>
      <div className={styles.formCheck}>
        <input
          type="radio"
          name="livingPreference"
          value="city"
          checked={formData.livingPreference === "city"}
          onChange={handleInputChange}
          className={styles.formCheckInput}
          id="cityPreference"
        />
        <label className={styles.formCheckLabel} htmlFor="cityPreference">
          City
        </label>
      </div>
      <div className={styles.formCheck}>
        <input
          type="radio"
          name="livingPreference"
          value="suburb"
          checked={formData.livingPreference === "suburb"}
          onChange={handleInputChange}
          className={styles.formCheckInput}
          id="suburbPreference"
        />
        <label className={styles.formCheckLabel} htmlFor="suburbPreference">
          Suburb
        </label>
      </div>
      <div className={styles.formCheck}>
        <input
          type="radio"
          name="livingPreference"
          value="rural"
          checked={formData.livingPreference === "rural"}
          onChange={handleInputChange}
          className={styles.formCheckInput}
          id="ruralPreference"
        />
        <label className={styles.formCheckLabel} htmlFor="ruralPreference">
          Rural
        </label>
      </div>
    </div>
  );
};

export default PopulationPreferences;
