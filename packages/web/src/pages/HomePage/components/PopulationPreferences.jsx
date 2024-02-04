import React, { useState, useEffect } from "react";
import styles from "./LivingPreferenceForm.module.css";

const populationRanges = [
  { label: "Small Towns", min: -1, max: 999 },
  { label: "Towns", min: 1000, max: 20000 },
  { label: "Small Cities", min: 20001, max: 100000 },
  { label: "Medium Cities", min: 100001, max: 500000 },
  { label: "Large Cities", min: 500001, max: 1000000 },
  { label: "Metropolises", min: 1000001, max: -1 },
];

const PopulationPreferences = ({ formData, setFormData }) => {
  const [selectedRanges, setSelectedRanges] = useState([]);

  const findRangeIndexes = () => {
    let startIndex = populationRanges.findIndex(
      (range) =>
        formData.minPopulation >= range.min &&
        formData.minPopulation <= range.max
    );
    let endIndex =
      formData.maxPopulation === -1
        ? populationRanges.length - 1
        : populationRanges.findIndex(
            (range) =>
              formData.maxPopulation >= range.min &&
              formData.maxPopulation <= range.max
          );

    if (formData.maxPopulation === -1) {
      endIndex = populationRanges.findIndex((range) => range.min >= 1000001);
    }

    return { startIndex, endIndex };
  };

  useEffect(() => {
    const { startIndex, endIndex } = findRangeIndexes();

    if (startIndex !== -1 && endIndex !== -1) {
      const newSelectedRanges = Array.from(
        { length: endIndex - startIndex + 1 },
        (_, i) => i + startIndex
      );
      setSelectedRanges(newSelectedRanges);
    } else {
      setSelectedRanges([]);
    }
  }, []);

  const handleRangeClick = (index) => {
    const isAtBoundary =
      index === Math.min(...selectedRanges) ||
      index === Math.max(...selectedRanges);

    if (selectedRanges.includes(index) && isAtBoundary) {
      let newSelectedRanges = selectedRanges.filter((i) => i !== index);
      if (index !== Math.min(...selectedRanges)) {
        newSelectedRanges = selectedRanges.filter((i) => i < index);
      } else if (index !== Math.max(...selectedRanges)) {
        newSelectedRanges = selectedRanges.filter((i) => i > index);
      }

      setSelectedRanges(newSelectedRanges.sort((a, b) => a - b));

      if (newSelectedRanges.length > 0) {
        const minIndex = Math.min(...newSelectedRanges);
        const maxIndex = Math.max(...newSelectedRanges);
        setFormData({
          ...formData,
          minPopulation: populationRanges[minIndex].min,
          maxPopulation: populationRanges[maxIndex].max,
        });
      } else {
        setFormData({ ...formData, minPopulation: null, maxPopulation: null });
      }
    } else if (!selectedRanges.includes(index)) {
      let newSelectedRanges = [...selectedRanges, index];
      const minSelectedIndex = Math.min(...newSelectedRanges);
      const maxSelectedIndex = Math.max(...newSelectedRanges);
      newSelectedRanges = [];
      for (let i = minSelectedIndex; i <= maxSelectedIndex; i++) {
        newSelectedRanges.push(i);
      }

      setSelectedRanges(newSelectedRanges.sort((a, b) => a - b));

      const minIndex = Math.min(...newSelectedRanges);
      const maxIndex = Math.max(...newSelectedRanges);
      setFormData({
        ...formData,
        minPopulation: populationRanges[minIndex].min,
        maxPopulation: populationRanges[maxIndex].max,
      });
    }
  };

  return (
    <div className={`form-group ${styles.formGroup}`}>
      <h4 className="pb-3">Population</h4>
      <p className="mb-3">
        Select preferred population range(s). Range must be continous:
      </p>
      <div className={`row ${styles.popBoxContainer}`}>
        {populationRanges.map((range, index) => (
          <div
            key={index}
            className={`${styles.populationBox} col-6 col-md-4 col-lg-4 col-xl-2 pl-1 pr-1`}
            onClick={() => handleRangeClick(index)}
          >
            <div
              className={` mt-2 ${styles.populationRangeButton} ${
                selectedRanges.includes(index) ? styles.selected : ""
              } d-flex flex-column align-items-center`}
            >
              {range.label}
            </div>
            <div className={`${styles.populationRangeText} mt-2 text-center`}>
              {range.max === -1
                ? `(${Math.abs(range.min).toLocaleString()} +)`
                : `(${Math.abs(range.min).toLocaleString()}-${Math.abs(
                    range.max
                  ).toLocaleString()})`}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3">
        {formData.minPopulation == null && formData.maxPopulation == null
          ? "Selected Population Range - None"
          : formData.minPopulation === -1 && formData.maxPopulation === -1
          ? "Selected Population Range - Any"
          : `Selected Population Range: ${Math.abs(
              formData.minPopulation || 0
            ).toLocaleString()} ${
              formData.maxPopulation === -1
                ? "and above"
                : `- ${Math.abs(formData.maxPopulation || 0).toLocaleString()}`
            }`}
      </p>
    </div>
  );
};

export default PopulationPreferences;
