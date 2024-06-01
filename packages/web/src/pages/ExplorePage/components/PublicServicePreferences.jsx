import React from "react";
import styles from "./LivingPreferenceForm.module.css";

const PublicServicePreferences = ({ formData, handleCheckboxChange }) => {
  return (
    <div className={`form-group ${styles.formGroup}`}>
      <h4 className="pb-3">Public Services</h4>
      <p className="mb-3">
        Check the following public services that you care about:
      </p>

      <div className={styles.collapsibleSections}>
        <details>
          <summary>Public Services</summary>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="schools">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="schools"
                id="schools"
                name="publicServices"
                onChange={handleCheckboxChange}
                checked={formData.publicServices.includes("schools")}
              />
              Proximity to K-12 schools
            </label>
          </div>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="hospitals">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="hospitals"
                id="hospitals"
                name="publicServices"
                onChange={handleCheckboxChange}
                checked={formData.publicServices.includes("hospitals")}
              />
              Proximity to Hospitals
            </label>
          </div>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="libraries">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="libraries"
                id="libraries"
                name="publicServices"
                onChange={handleCheckboxChange}
                checked={formData.publicServices.includes("libraries")}
              />
              Proximity to public libraries
            </label>
          </div>
          <div className={styles.formCheck}>
            <label
              className={styles.formCheckLabel}
              htmlFor="emergencyServices"
            >
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="emergencyServices"
                id="emergencyServices"
                name="publicServices"
                onChange={handleCheckboxChange}
                checked={formData.publicServices.includes("emergencyServices")}
              />
              Number of fire departments and police stations
            </label>
          </div>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="airports">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="airports"
                id="airports"
                name="publicServices"
                onChange={handleCheckboxChange}
                checked={formData.publicServices.includes("airports")}
              />
              Proximity to Airports
            </label>
          </div>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="transitStations">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="transitStations"
                id="transitStations"
                name="publicServices"
                onChange={handleCheckboxChange}
                checked={formData.publicServices.includes("transitStations")}
              />
              Proximity to Train stations and bus terminals
            </label>
          </div>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="marineTerminals">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="marineTerminals"
                id="marineTerminals"
                name="publicServices"
                onChange={handleCheckboxChange}
                checked={formData.publicServices.includes("marineTerminals")}
              />
              Proximity to Marine Terminals
            </label>
          </div>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="localParks">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="localParks"
                id="localParks"
                name="publicServices"
                onChange={handleCheckboxChange}
                checked={formData.publicServices.includes("localParks")}
              />
              Local Parks and Recreation Areas
            </label>
          </div>
          <div className={styles.formCheck}>
            <label className={styles.formCheckLabel} htmlFor="placesOfWorship">
              <input
                className={styles.formCheckInput}
                type="checkbox"
                value="placesOfWorship"
                id="placesOfWorship"
                name="publicServices"
                onChange={handleCheckboxChange}
                checked={formData.publicServices.includes("placesOfWorship")}
              />
              Proximity to churches, places of worship
            </label>
          </div>
        </details>
      </div>
    </div>
  );
};

export default PublicServicePreferences;
