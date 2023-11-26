import React from "react";
import Autosuggest from "react-autosuggest";
import styles from "./LivingPreferenceForm.module.css";

const JobPreferences = ({
  formData,
  setFormData,
  searchTerm,
  setSearchTerm,
  suggestions,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  suggestionSelected,
}) => {
  // Function to handle job removal
  const handleJobRemoval = (jobToRemove) => {
    const updatedJobs = formData.selectedJobs.filter(
      (job) => job !== jobToRemove
    );
    setFormData((prevState) => ({
      ...prevState,
      selectedJobs: updatedJobs,
    }));
  };

  // JSX for the component
  return (
    formData.weights.jobOpportunityWeight > 0 && (
      <div className={`form-group ${styles.formGroup}`}>
        <h4 className="pb-2">Job Industry</h4>
        <label htmlFor="job">
          What's your current profession or job title?
        </label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={suggestionSelected}
          getSuggestionValue={(suggestion) => suggestion.occ_title}
          renderSuggestion={(suggestion) => <div>{suggestion.occ_title}</div>}
          inputProps={{
            className: `form-control ${styles.formInput}`,
            id: "job",
            placeholder: "Enter job title...",
            value: searchTerm,
            onChange: (_, { newValue }) => setSearchTerm(newValue),
          }}
        />

        <div className="selected-jobs mt-3">
          {formData.selectedJobs.map((job, index) => (
            <div
              key={index}
              className={`badge badge-primary mr-2 ${styles.selectedJobs}`}
            >
              {job.occ_title}
              <span
                style={{ cursor: "pointer", marginLeft: "5px" }}
                onClick={() => handleJobRemoval(job)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>

        {/* Minimum Salary Input */}
        <label htmlFor="minSalary">
          What's the minimum salary you'd be willing to accept?
        </label>
        <input
          type="number"
          name="minSalary"
          value={formData.minSalary || ""}
          onChange={(e) =>
            setFormData({ ...formData, minSalary: e.target.value })
          }
          className={`form-control`}
          id="minSalary"
          placeholder="Enter minimum acceptable salary"
        />
      </div>
    )
  );
};

export default JobPreferences;
