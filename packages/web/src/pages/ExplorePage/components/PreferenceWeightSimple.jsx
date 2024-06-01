import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faTree,
  faSun,
  faMountain,
  faBriefcase,
  faBuilding,
  faShieldAlt,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./PreferenceWeightSimple.module.css";

function SelectableBox({ title, sectionKey, weight, onSelect, icon }) {
  const handleClick = () => {
    onSelect(sectionKey);
  };

  const iconColor = weight > 0 ? "white" : "#01697c";

  return (
    <div
      onClick={handleClick}
      className={`${styles.dropzone} ${
        weight > 0 ? styles.selected : styles.unselected
      }`}
    >
      <FontAwesomeIcon icon={icon} size="3x" color={iconColor} />
      <p className={styles.dropzoneTitle}>{title}</p>
    </div>
  );
}

function PreferenceWeight({
  onWeightsChange,
  weights,
  tempWeights,
  setTotalWeights,
}) {
  const handleSelect = (sectionKey) => {
    const newWeights = { ...weights };
    const isDeselect = weights[sectionKey] > 0;

    newWeights[sectionKey] = isDeselect ? 0 : tempWeights[sectionKey];
    const total = Object.values(newWeights).reduce((a, b) => a + b, 0);
    onWeightsChange(newWeights, isDeselect);
    setTotalWeights(total);
  };

  return (
    <div className={styles.preferenceContainer}>
      <div className={styles.dropZoneContainer}>
        {[
          {
            title: "Cost of Living",
            sectionKey: "costOfLivingWeight",
            icon: faMoneyBillWave,
          },
          {
            title: "Recreation",
            sectionKey: "recreationalActivitiesWeight",
            icon: faTree,
          },
          { title: "Weather", sectionKey: "weatherWeight", icon: faSun },
          { title: "Scenery", sectionKey: "sceneryWeight", icon: faMountain },
          {
            title: "Salary & Job",
            sectionKey: "jobOpportunityWeight",
            icon: faBriefcase,
          },
          {
            title: "Public Services",
            sectionKey: "publicServicesWeight",
            icon: faBuilding,
          },
          {
            title: "Crime Rate",
            sectionKey: "crimeRateWeight",
            icon: faShieldAlt,
          },
          {
            title: "Air Quality",
            sectionKey: "airQualityWeight",
            icon: faWind,
          },
        ].map((section) => (
          <SelectableBox
            title={section.title}
            key={section.sectionKey}
            sectionKey={section.sectionKey}
            weight={weights[section.sectionKey]}
            onSelect={handleSelect}
            icon={section.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default PreferenceWeight;
