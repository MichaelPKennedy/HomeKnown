import React from "react";
import styles from "./LivingPreferenceForm.module.css";

const SceneryPreferences = ({ formData, handleCheckboxChange }) => {
  return (
    <div className={`form-group ${styles.formGroup}`}>
      <h4 className="pb-3">Scenery and Landscape</h4>
      <p className="mb-3">
        Select the following scenery options that you enjoy:
      </p>

      <div className={styles.collapsibleSections}>
        <details>
          <summary>Scenic Features</summary>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="forests">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="forests"
                id="forests"
                name="scenery"
                onChange={handleCheckboxChange}
                checked={formData.scenery.includes("forests")}
              />
              Forests
            </label>
          </div>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="lakesRivers">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="lakes_rivers"
                id="lakesRivers"
                name="scenery"
                onChange={handleCheckboxChange}
                checked={formData.scenery.includes("lakes_rivers")}
              />
              Lakes and Rivers
            </label>
          </div>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="mountains">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="mountains"
                id="mountains"
                name="scenery"
                onChange={handleCheckboxChange}
                checked={formData.scenery.includes("mountains")}
              />
              Mountains
            </label>
          </div>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="beaches">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="beaches"
                id="beaches"
                name="scenery"
                onChange={handleCheckboxChange}
                checked={formData.scenery.includes("beaches")}
              />
              Beaches
            </label>
          </div>
        </details>
      </div>
    </div>
  );
};

export default SceneryPreferences;
