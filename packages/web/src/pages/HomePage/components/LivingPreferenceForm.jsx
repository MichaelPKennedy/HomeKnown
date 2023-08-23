import React, { useState } from "react";
import styles from "./LivingPreferenceForm.module.css";

const LivingPreferenceForm = () => {
  const [formData, setFormData] = useState({
    temperature: 70,
    job: "",
    livingPreference: "city",
    housingBudget: 150000,
    settingPreference: "",
    hasChildren: false,
    lowCrimePriority: false,
    publicTransportation: false,
    commuteTime: "",
    proximityAirportHighway: false,
    culturalOfferings: false,
    nightlifeImportance: false,
    landscapeFeatures: [],
    recreationalInterests: [],
    industries: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    if (Array.isArray(formData[name])) {
      if (checked && !formData[name].includes(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: [...prevState[name], value],
        }));
      } else if (!checked && formData[name].includes(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: prevState[name].filter((item) => item !== value),
        }));
      }
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));
    }
  };

  const handleSelectMultipleChange = (e) => {
    const options = e.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      recreationalInterests: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="form-group">
        <label>Preferred Landscape Features:</label>
        <div className="dropdown">
          <button
            className={`btn btn-info dropdown-toggle ${styles.btnDropdown}`}
            type="button"
            id="landscapeDropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Select Landscape Features
          </button>
          <div className="dropdown-menu" aria-labelledby="landscapeDropdown">
            {[
              "ocean",
              "mountains",
              "rivers",
              "lakes",
              "desert",
              "national parks",
            ].map((feature) => (
              <div className="form-check" key={feature}>
                <input
                  className={`custom-checkbox ${styles.formCheckInput}`}
                  type="checkbox"
                  name="landscapeFeatures"
                  value={feature}
                  id={`${feature}Feature`}
                  onChange={handleCheckboxChange}
                  checked={formData.landscapeFeatures.includes(feature)}
                />
                <label
                  className={`${styles.formCheckLabel}`}
                  htmlFor={`${feature}Feature`}
                >
                  {feature.charAt(0).toUpperCase() + feature.slice(1)}
                </label>
              </div>
            ))}
            <button
              type="button"
              className={`btn btn-info mt-2 ${styles.btnDropdown} ${styles.saveButton}`}
              onClick={() => {
                document.getElementById("landscapeDropdown").click();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Recreational Interests:</label>
        <div className="dropdown">
          <button
            className={`btn btn-info dropdown-toggle ${styles.btnDropdown}`}
            type="button"
            id="recreationalDropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Select Recreational Interests
          </button>
          <div className="dropdown-menu" aria-labelledby="recreationalDropdown">
            {["hiking", "bars", "biking", "swimming"].map((interest) => (
              <div className="form-check" key={interest}>
                <input
                  className={`custom-checkbox ${styles.formCheckInput}`}
                  type="checkbox"
                  name="recreationalInterests"
                  value={interest}
                  id={`${interest}Interest`}
                  onChange={handleCheckboxChange}
                  checked={formData.recreationalInterests.includes(interest)}
                />
                <label
                  className={`${styles.formCheckLabel}`}
                  htmlFor={`${interest}Interest`}
                >
                  {interest.charAt(0).toUpperCase() + interest.slice(1)}
                </label>
              </div>
            ))}
            <button
              type="button"
              className={`btn btn-info mt-2 ${styles.btnDropdown} ${styles.saveButton}`}
              onClick={() => {
                document.getElementById("recreationalDropdown").click();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="temperature">Preferred Weather (°F):</label>
        <input
          type="range"
          name="temperature"
          min="0"
          max="120"
          step="5" // This makes the slider move in increments of 5
          value={formData.temperature}
          onChange={handleInputChange}
          className={`form-control-range ${styles.formControlRange}`}
          id="temperature"
        />
        <small className="form-text text-muted">{formData.temperature}°F</small>
      </div>

      <div className="form-group">
        <label>Job Industries:</label>
        <div className="dropdown">
          <button
            className={`btn btn-info dropdown-toggle ${styles.btnDropdown}`}
            type="button"
            id="industriesDropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Select You and Your Partner's Job Industries
          </button>
          <div className="dropdown-menu" aria-labelledby="industriesDropdown">
            {[
              "technology",
              "finance",
              "healthcare",
              "education",
              "government",
              "retail",
              "manufacturing",
              "construction",
              "transportation",
              "agriculture",
              "entertainment",
              "hospitality",
              "self-employed",
            ].map((industry) => (
              <div className="form-check" key={industry}>
                <input
                  className={`custom-checkbox ${styles.formCheckInput}`}
                  type="checkbox"
                  name="industries"
                  value={industry}
                  id={`${industry}industry`}
                  onChange={handleCheckboxChange}
                  checked={formData.industries.includes(industry)}
                />
                <label
                  className={`${styles.formCheckLabel}`}
                  htmlFor={`${industry}industry`}
                >
                  {industry.charAt(0).toUpperCase() + industry.slice(1)}
                </label>
              </div>
            ))}
            <button
              type="button"
              className={`btn btn-info mt-2 ${styles.btnDropdown} ${styles.saveButton}`}
              onClick={() => {
                document.getElementById("industriesDropdown").click();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Living Preference:</label>
        <div className="form-check">
          <input
            type="radio"
            name="livingPreference"
            value="city"
            checked={formData.livingPreference === "city"}
            onChange={handleInputChange}
            className="form-check-input"
            id="cityPreference"
          />
          <label className="form-check-label" htmlFor="cityPreference">
            City
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="livingPreference"
            value="suburb"
            checked={formData.livingPreference === "suburb"}
            onChange={handleInputChange}
            className="form-check-input"
            id="suburbPreference"
          />
          <label className="form-check-label" htmlFor="suburbPreference">
            Suburb
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="livingPreference"
            value="rural"
            checked={formData.livingPreference === "rural"}
            onChange={handleInputChange}
            className="form-check-input"
            id="ruralPreference"
          />
          <label className="form-check-label" htmlFor="ruralPreference">
            Rural
          </label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="housingBudget">Housing Budget:</label>
        <input
          type="range"
          name="housingBudget"
          min="50000"
          max="1000000"
          step="50000"
          value={formData.housingBudget}
          onChange={handleInputChange}
          className={`form-control-range ${styles.formControlRange}`}
          id="housingBudget"
        />
        <small className="form-text text-muted">
          ${formData.housingBudget.toLocaleString()}
        </small>
      </div>

      {/* ... Continue for all the additional questions ... */}

      <button
        type="submit"
        className={`btn btn-info mt-2 ${styles.btnDropdown}`}
      >
        Submit
      </button>
    </form>
  );
};

export default LivingPreferenceForm;
