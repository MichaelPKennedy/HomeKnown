import React, { useState } from "react";
import styles from "./LivingPreferenceForm.module.css";
import { useQuery } from "react-query";
import client from "../../../feathersClient.js";

const naicsMapping = [
  { naics_code: "001", naics_title: "Technology", displayName: "Tech" },
  { naics_code: "002", naics_title: "Healthcare", displayName: "Health" },
  // ... add other naics codes as needed
];

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
    desiredSalary: null,
    minSalary: null,
    jobLevel: "",
    wagePriority: 5,
    futureAspiration: "",
    selectedJobs: [],
  });
  const [selectedNaics, setSelectedNaics] = useState("");

  // Fetching OCC codes based on the selected NAICS code
  const { data: occCodes, isLoading } = useQuery(
    ["fetchOccCodes", selectedNaics],
    () => fetchOccCodes(selectedNaics),
    {
      enabled: !!selectedNaics, // Only run the query if there's a selected NAICS code
    }
  );

  const handleNaicsChange = (e) => {
    setSelectedNaics(e.target.value);
  };

  const fetchOccCodes = async (naicsCode) => {
    if (naicsCode === "001")
      return [
        { occ_code: "00-0001", occ_title: "Software Engineer" },
        { occ_code: "00-0002", occ_title: "Data Scientist" },
      ];
    if (naicsCode === "002")
      return [
        { occ_code: "00-0003", occ_title: "Nurse" },
        { occ_code: "00-0004", occ_title: "Doctor" },
      ];
    return [];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await client.service("survey").create({
      data: formData,
    });
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

  const handleAddJob = () => {
    const naicsCode = formData.naics;
    const occCode = formData.occ;

    if (naicsCode && occCode) {
      const newJob = { naics: naicsCode, occ: occCode };

      setFormData((prevState) => ({
        ...prevState,
        selectedJobs: [...prevState.selectedJobs, newJob],
      }));
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
        <label>Industry:</label>
        <select name="naics" onChange={handleNaicsChange}>
          {naicsMapping.map(({ naics_code, displayName }) => (
            <option value={naics_code} key={naics_code}>
              {displayName}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p>Loading OCC codes...</p>
      ) : (
        occCodes && (
          <div className="form-group">
            <label>Occupation:</label>
            <select name="occ" onChange={handleInputChange}>
              {occCodes.map(({ occCode, occTitle }) => (
                <option value={occCode} key={occCode}>
                  {occTitle}
                </option>
              ))}
            </select>
          </div>
        )
      )}

      <button onClick={handleAddJob}>Add Job</button>

      {/* Job Profession Input */}
      <div className="form-group">
        <label htmlFor="job">
          What's your current profession or job title?
        </label>
        <input
          type="text"
          name="job"
          value={formData.job}
          onChange={handleInputChange}
          className="form-control"
          id="job"
          placeholder="Enter your job title"
        />
      </div>

      {/* Partner's Job Profession Input */}
      <div className="form-group">
        <label htmlFor="partnerJob">
          What is your partner’s profession or job title?
        </label>
        <input
          type="text"
          name="partnerJob"
          value={formData.partnerJob || ""}
          onChange={handleInputChange}
          className="form-control"
          id="partnerJob"
          placeholder="Enter your partner's job title"
        />
      </div>

      {/* Desired Salary Input */}
      <div className="form-group">
        <label htmlFor="desiredSalary">
          What's your desired average annual salary?
        </label>
        <input
          type="number"
          name="desiredSalary"
          value={formData.desiredSalary || ""}
          onChange={handleInputChange}
          className="form-control"
          id="desiredSalary"
          placeholder="Enter desired annual salary"
        />
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
      </div>

      {/* Job's average hourly wage priority */}
      <div className="form-group">
        <label htmlFor="wagePriority">
          How important is it for you to live in a state where your job's
          average hourly wage is above the national average?
        </label>
        <input
          type="range"
          name="wagePriority"
          min="1"
          max="10"
          value={formData.wagePriority || 5}
          onChange={handleInputChange}
          className={`form-control-range ${styles.formControlRange}`}
          id="wagePriority"
        />
        <small className="form-text text-muted">
          Priority: {formData.wagePriority || 5} / 10
        </small>
      </div>

      {/* Future Aspirations */}
      <div className="form-group">
        <label htmlFor="futureAspiration">
          Where do you see yourself in the next 5 years in terms of job position
          and salary?
        </label>
        <textarea
          name="futureAspiration"
          value={formData.futureAspiration || ""}
          onChange={handleInputChange}
          className="form-control"
          id="futureAspiration"
          placeholder="Describe your future aspirations"
          rows="3"
        />
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
            Select Family's Job Industries
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
