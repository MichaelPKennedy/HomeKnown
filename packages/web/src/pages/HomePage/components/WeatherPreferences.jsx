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
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);
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
            <label>
              Would you be okay living in an area that receives snow?
            </label>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="snowPreference"
                value="none"
                onChange={handleInputChange}
                checked={formData.snowPreference === "none"}
              />
              <label className={styles.formCheckLabel}>No snow</label>
            </div>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="snowPreference"
                value="light"
                onChange={handleInputChange}
                checked={formData.snowPreference === "light"}
              />
              <label className={styles.formCheckLabel}>
                Light, occasional snow
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="snowPreference"
                value="heavy"
                onChange={handleInputChange}
                checked={formData.snowPreference === "heavy"}
              />
              <label className={styles.formCheckLabel}>Heavy snowfall</label>
            </div>
          </div>
        )}

        {/* Rain Preference */}
        <div className={`form-group ${styles.formGroup}`}>
          <label>
            Would you be okay living in an area that receives regular rainfall?
          </label>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="radio"
              name="rainPreference"
              value="dry"
              onChange={handleInputChange}
              checked={formData.rainPreference === "dry"}
            />
            <label className={styles.formCheckLabel}>Generally dry</label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="radio"
              name="rainPreference"
              value="regular"
              onChange={handleInputChange}
              checked={formData.rainPreference === "regular"}
            />
            <label className={styles.formCheckLabel}>
              Comfortable with regular rainfall
            </label>
          </div>
        </div>
      </div>
      {/* Humidity Preference */}
      <div className={`form-group ${styles.formGroup}`}>
        <h4>Humidity Preference</h4>
        <div className={styles.sliderContainer}>
          <Slider
            min={0}
            max={100}
            defaultValue={formData.humidityPreference}
            onChange={(value) => {
              setFormData((prevState) => ({
                ...prevState,
                humidityPreference: value,
              }));
            }}
            marks={{
              0: "Min",
              25: "Comfortably Dry",
              50: "Moderate",
              75: "High Moisture",
              100: "Max",
            }}
            step={null}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherPreferences;
