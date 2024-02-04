import React from "react";
import { statesMapping } from "../constants";
import styles from "./LivingPreferenceForm.module.css";

const StateSelection = ({ formData, setFormData }) => {
  const allSelected = formData.includedStates.length === 0;

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    let updatedIncludedStates;
    const intValue = parseInt(value);

    if (allSelected) {
      updatedIncludedStates = Object.keys(statesMapping)
        .map(Number)
        .filter((code) => code !== intValue);
    } else {
      updatedIncludedStates = checked
        ? [...formData.includedStates, intValue]
        : formData.includedStates.filter((code) => code !== intValue);

      if (updatedIncludedStates.length === Object.keys(statesMapping).length) {
        updatedIncludedStates = [];
      }
    }

    setFormData({
      ...formData,
      includedStates: updatedIncludedStates,
    });
  };

  const handleOnlyButtonClick = (event, stateCode) => {
    event.preventDefault();
    setFormData({
      ...formData,
      includedStates: [parseInt(stateCode)],
    });
  };

  const toggleAllStates = () => {
    setFormData({
      ...formData,
      includedStates: allSelected ? Object.keys(statesMapping).map(Number) : [],
    });
  };

  return (
    <div className={`form-group ${styles.formGroup}`}>
      <h4 className="pb-3">State Preferences</h4>
      <p className="mb-3">Select the states you're interested in:</p>
      <div className={styles.collapsibleSections}>
        <details>
          <summary>States</summary>
          <button
            type="button"
            onClick={toggleAllStates}
            className={`${styles.btnDropdown} m-2`}
          >
            Select All States
          </button>
          {Object.entries(statesMapping).map(([stateCode, stateName]) => (
            <div
              className={styles.formCheck}
              key={stateCode}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value={stateCode}
                  id={`state-${stateCode}`}
                  onChange={handleCheckboxChange}
                  checked={
                    allSelected ||
                    formData.includedStates.includes(parseInt(stateCode))
                  }
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor={`state-${stateCode}`}
                >
                  {stateName}
                </label>
              </div>
              <button
                onClick={(e) => handleOnlyButtonClick(e, stateCode)}
                className={styles.onlyButton}
                style={{ marginLeft: "10px" }}
              >
                Only
              </button>
            </div>
          ))}
        </details>
      </div>
    </div>
  );
};

export default StateSelection;
