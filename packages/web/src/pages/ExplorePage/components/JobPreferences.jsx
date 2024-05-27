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
          What's your current profession or job title? Enter up to 2 job titles.
        </label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={suggestionSelected}
          getSuggestionValue={(suggestion) => suggestion.occ_title}
          renderSuggestion={(suggestion) => (
            <div className={styles.suggestion}>{suggestion.occ_title}</div>
          )}
          inputProps={{
            className: `form-control ${styles.formInput}`,
            id: "job",
            placeholder: "Enter job title...",
            value: searchTerm,
            onChange: (_, { newValue }) => setSearchTerm(newValue),
            disabled: formData.selectedJobs.length >= 2,
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

        {formData.selectedJobs[0] && (
          <>
            <label htmlFor="minSalary1">
              What's the minimum salary you'd be willing to accept for{" "}
              {formData.selectedJobs[0].occ_title}?
            </label>
            <input
              type="number"
              name="minSalary1"
              value={formData.minSalary1 || 0}
              onChange={(e) =>
                setFormData({ ...formData, minSalary1: Number(e.target.value) })
              }
              className={`form-control`}
              id="minSalary1"
              placeholder="Enter minimum acceptable salary"
            />
          </>
        )}

        {formData.selectedJobs[1] && (
          <>
            <label htmlFor="minSalary2">
              What's the minimum salary you'd be willing to accept for{" "}
              {formData.selectedJobs[1].occ_title}?
            </label>
            <input
              type="number"
              name="minSalary2"
              value={formData.minSalary2 || 0}
              onChange={(e) =>
                setFormData({ ...formData, minSalary2: Number(e.target.value) })
              }
              className={`form-control`}
              id="minSalary2"
              placeholder="Enter minimum acceptable salary"
            />
          </>
        )}
      </div>
    )
  );
};

export default JobPreferences;
