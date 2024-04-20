import React, { useEffect } from "react";
import TemperatureSelection from "./TemperatureSelection";
import Slider from "rc-slider";
import styles from "./LivingPreferenceForm.module.css";

const WeatherPreferences = ({
  formData,
  setFormData,
  handleInputChange,
  handleTemperatureChange,
  hasColdMonth,
}) => {
  return (
    <div>
      <div className={`form-group ${styles.formGroup}`}>
        <h4>Select Your Ideal Average Monthly Temperatures (°F) </h4>
        <TemperatureSelection
          data={formData.temperatureData}
          onDataChange={handleTemperatureChange}
        />
      </div>

      <div className={`form-group ${styles.formGroup}`}>
        <h4>Precipitation</h4>
        {hasColdMonth() && (
          <div className={`form-group ${styles.formGroup}`}>
            {/* Snow Preference */}
            <p className={styles.question}>
              Would you be okay living in an area that receives snow?
            </p>

            <label className={styles.radioFormCheckLabel}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="snowPreference"
                value="none"
                onChange={handleInputChange}
                checked={formData.snowPreference === "none"}
              />
              No snow
            </label>
            <label className={styles.radioFormCheckLabel}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="snowPreference"
                value="light"
                onChange={handleInputChange}
                checked={formData.snowPreference === "light"}
              />
              Light, occasional snow
            </label>
            <label className={styles.radioFormCheckLabel}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="snowPreference"
                value="heavy"
                onChange={handleInputChange}
                checked={formData.snowPreference === "heavy"}
              />
              Heavy snowfall
            </label>
          </div>
        )}

        {/* Rain Preference */}
        <div className={`form-group ${styles.formGroup}`}>
          <p className={styles.question}>
            Would you be okay living in an area that receives regular rainfall?
          </p>
          <label className={styles.radioFormCheckLabel}>
            <input
              className={styles.formCheckInput}
              type="radio"
              name="rainPreference"
              value="dry"
              onChange={handleInputChange}
              checked={formData.rainPreference === "dry"}
            />
            Generally dry
          </label>
          <label className={styles.radioFormCheckLabel}>
            <input
              className={styles.formCheckInput}
              type="radio"
              name="rainPreference"
              value="regular"
              onChange={handleInputChange}
              checked={formData.rainPreference === "regular"}
            />
            Comfortable with regular rainfall
          </label>
        </div>
      </div>
      {/* Humidity Preference */}
      <div className={`form-group ${styles.formGroup}`}>
        <h4>Humidity Preference</h4>
        <div className={styles.sliderContainer}>
          <Slider
            min={25}
            max={75}
            defaultValue={formData.humidityPreference}
            onChange={(value) => {
              setFormData((prevState) => ({
                ...prevState,
                humidityPreference: value,
              }));
            }}
            marks={{
              25: "Comfortably Dry",
              50: "Moderate",
              75: "High Moisture",
            }}
            step={null}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherPreferences;
