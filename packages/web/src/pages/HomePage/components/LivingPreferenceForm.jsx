import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import styles from "./LivingPreferenceForm.module.css";
import { useQuery } from "react-query";
import client from "../../../feathersClient.js";
import { useNavigate } from "react-router-dom";

const LivingPreferenceForm = () => {
  const [formData, setFormData] = useState({
    temperature: 70,
    job: "",
    partnerJob: "",
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
    minSalary: null,
    jobLevel: "",
    wagePriority: 5,
    futureAspiration: "",
    selectedJobs: [],
  });

  const navigate = useNavigate();

  console.log("formData:", formData);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentJob, setCurrentJob] = useState({});

  const fetchOccCodes = async (inputQuery) => {
    try {
      const results = await client
        .service("occupation")
        .find({ query: { query: inputQuery } });
      return results;
    } catch (error) {
      console.error("Error fetching occupation codes:", error);
      return [];
    }
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const results = await fetchOccCodes(value);
    setSuggestions(results);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await client.service("survey").create({
        data: formData,
      });

      if (response && response.jobResponse) {
        navigate("/results", { state: { data: response.jobResponse } });
      }
    } catch (error) {
      console.error("Failed to submit the survey:", error);
    }
  };

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

  // const handleSelectMultipleChange = (e) => {
  //   const options = e.target.options;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i++) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     recreationalInterests: value,
  //   }));
  // };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="form-group">
        <label htmlFor="job">
          What's your current profession or job title?
        </label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={(event, { suggestion }) => {
            setCurrentJob(suggestion);
          }}
          getSuggestionValue={(suggestion) => suggestion.occ_title}
          renderSuggestion={(suggestion) => <div>{suggestion.occ_title}</div>}
          inputProps={{
            id: "job",
            placeholder: "Enter job title...",
            value: searchTerm,
            onChange: (_, { newValue }) => setSearchTerm(newValue),
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (
              currentJob &&
              !formData.selectedJobs.includes(currentJob.occ_title)
            ) {
              setFormData((prevState) => ({
                ...prevState,
                selectedJobs: [...prevState.selectedJobs, currentJob],
              }));
              setCurrentJob({});
            }
          }}
          className={`btn btn-info mt-4 ${styles.addJobButton}`}
        >
          Add
        </button>

        <div className="selected-jobs mt-3">
          {formData.selectedJobs.map((job, index) => (
            <div key={index} className="badge badge-primary mr-2">
              {job.occ_title}
              <span
                style={{ cursor: "pointer", marginLeft: "5px" }}
                onClick={() => {
                  const updatedJobs = formData.selectedJobs.filter(
                    (j) => j !== job
                  );
                  setFormData((prevState) => ({
                    ...prevState,
                    selectedJobs: updatedJobs,
                  }));
                }}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Minimum Salary Input */}
      <div className="form-group">
        <label htmlFor="minSalary">
          What's the minimum salary you'd be willing to accept for a job in a
          new state?
        </label>
        <input
          type="number"
          name="minSalary"
          value={formData.minSalary || ""}
          onChange={handleInputChange}
          className="form-control"
          id="minSalary"
          placeholder="Enter minimum acceptable salary"
        />
      </div>

      {/* Entry Level vs Senior Role Radio Buttons */}
      <div className="form-group">
        <label>
          Would you be open to entry-level positions, or are you looking for
          senior roles?
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="jobLevel"
            value="entry-level"
            onChange={handleInputChange}
            checked={formData.jobLevel === "entry-level"}
          />
          <label className="form-check-label">Entry-level</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="jobLevel"
            value="senior"
            onChange={handleInputChange}
            checked={formData.jobLevel === "senior"}
          />
          <label className="form-check-label">Senior role</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="jobLevel"
            value="both"
            onChange={handleInputChange}
            checked={formData.jobLevel === "both"}
          />
          <label className="form-check-label">Both</label>
        </div>
      </div>

      {/* <div className="form-group">
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
      </div> */}

      {/* <div className="form-group">
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
      </div> */}
      {/* <div className="form-group">
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
      </div> */}

      {/* <div className="form-group">
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
      </div> */}
      {/* <div className="form-group">
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
      </div> */}

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
