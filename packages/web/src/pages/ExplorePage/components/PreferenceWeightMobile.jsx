import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./PreferenceWeight.module.css";

function DraggableToken({ sectionKey, onRemove }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => onRemove(sectionKey),
  });

  return (
    <div
      {...handlers}
      className={`${styles.preferenceToken} ${styles.selectedToken}`}
    ></div>
  );
}

function SectionDropZone({
  title,
  sectionKey,
  weight,
  addTokenToSection,
  removeTokenFromSection,
}) {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (weight > 0) {
        removeTokenFromSection(sectionKey);
      }
    },
  });

  const handleClick = () => {
    addTokenToSection(sectionKey);
  };

  return (
    <div {...handlers} onClick={handleClick} className={styles.dropzone}>
      <p className={styles.dropzoneTitle}>{title}</p>
      <div className="tokens">
        {Array(weight)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`${styles.preferenceToken} ${styles.selectedToken}`}
            ></div>
          ))}
      </div>
    </div>
  );
}

function PreferenceWeight({ onWeightsChange, weights }) {
  const addTokenToSection = (sectionKey) => {
    if (weights.totalAvailablePoints > 0) {
      const newWeights = {
        ...weights,
        [sectionKey]: weights[sectionKey] + 1,
        totalAvailablePoints: weights.totalAvailablePoints - 1,
      };
      onWeightsChange(newWeights);
    }
  };

  const removeTokenFromSection = (sectionKey) => {
    if (weights[sectionKey] > 0) {
      const newWeights = {
        ...weights,
        [sectionKey]: weights[sectionKey] - 1,
        totalAvailablePoints: weights.totalAvailablePoints + 1,
      };
      onWeightsChange(newWeights);
    }
  };

  const [selectedTokens, setSelectedTokens] = useState([]);

  const handleDragOut = (fromSection, sectionKey) => {
    if (
      (fromSection === null && sectionKey === null) ||
      fromSection === sectionKey
    ) {
      return;
    }

    const newWeights = {
      ...weights,
      [fromSection]: weights[fromSection] - 1,
    };

    if (sectionKey) {
      newWeights[sectionKey] = weights[sectionKey] + 1;
    } else {
      newWeights.totalAvailablePoints = weights.totalAvailablePoints + 1;
    }

    onWeightsChange(newWeights);
  };

  const toggleTokenSelection = (index) => {
    setSelectedTokens((prev) => {
      if (prev.includes(index)) {
        return [];
      } else {
        return [index];
      }
    });
  };

  const updateSectionWeight = (targetSection, fromSection = null) => {
    let adjustment = selectedTokens.length;
    let newWeights = { ...weights };

    if (!fromSection) {
      newWeights.totalAvailablePoints =
        weights.totalAvailablePoints - adjustment;
    }

    if (!adjustment && !fromSection) {
      newWeights[targetSection] = weights[targetSection] + 1;
      newWeights.totalAvailablePoints = weights.totalAvailablePoints - 1;
    } else {
      newWeights[targetSection] = weights[targetSection] + adjustment;
    }

    // Update the weights in the parent component
    onWeightsChange(newWeights);

    setSelectedTokens([]);
  };

  return (
    <div className={styles.preferenceContainer}>
      <div className={styles.tokenBank}>
        {Array(weights.totalAvailablePoints)
          .fill(null)
          .map((_, index) => (
            <DraggableToken
              key={index}
              index={index}
              selectedTokens={selectedTokens}
              onSelect={toggleTokenSelection}
              isDragging={selectedTokens.length > 0}
              removeTokenFromSection={removeTokenFromSection}
            />
          ))}
      </div>
      <div className={styles.dropZoneContainer}>
        {[
          {
            title: "Cost of Living",
            sectionKey: "costOfLivingWeight",
            weight: weights.costOfLivingWeight,
          },
          {
            title: "Recreation",
            sectionKey: "recreationalActivitiesWeight",
            weight: weights.recreationalActivitiesWeight,
          },
          {
            title: "Weather",
            sectionKey: "weatherWeight",
            weight: weights.weatherWeight,
          },
          {
            title: "Scenery",
            sectionKey: "sceneryWeight",
            weight: weights.sceneryWeight,
          },
          {
            title: "Salary & Job ",
            sectionKey: "jobOpportunityWeight",
            weight: weights.jobOpportunityWeight,
          },
          {
            title: "Public Services",
            sectionKey: "publicServicesWeight",
            weight: weights.publicServicesWeight,
          },
          {
            title: "Crime Rate",
            sectionKey: "crimeRateWeight",
            weight: weights.crimeRateWeight,
          },
          {
            title: "Air Quality",
            sectionKey: "airQualityWeight",
            weight: weights.airQualityWeight,
          },
        ].map((section) => (
          <div className={styles.section} key={section.sectionKey}>
            <div className={styles.sectionTitle}>{section.title}</div>
            <SectionDropZone
              sectionKey={section.sectionKey}
              weight={section.weight}
              onDropToken={(sectionKey, fromSection) =>
                updateSectionWeight(sectionKey, fromSection)
              }
              onDragOut={handleDragOut}
              addTokenToSection={addTokenToSection}
              removeTokenFromSection={removeTokenFromSection}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreferenceWeight;
