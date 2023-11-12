import React, { useState, useRef, useEffect } from "react";
import { useDrag, useDrop, useDragLayer } from "react-dnd";
import styles from "./PreferenceWeight.module.css";
import { useSwipeable } from "react-swipeable";

function DragPreview({ count }) {
  return (
    <div className={styles.dragPreview}>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className={`${styles.preferenceToken} ${styles.previewToken} ${styles.selectedToken}`}
          ></div>
        ))}
    </div>
  );
}

function useCombinedRefs(...refs) {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

function useItemDragLayer() {
  return useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));
}

// Draggable Token Component
function DraggableToken({ index, selectedTokens, onSelect, isDragging }) {
  const [, ref] = useDrag({
    type: "TOKEN",
    item: { fromSection: null, count: selectedTokens.length || 1 },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const isTokenSelected = selectedTokens.includes(index);

  return (
    <div
      ref={ref}
      onClick={() => onSelect(index)}
      className={`
          ${styles.preferenceToken}
          ${isTokenSelected ? styles.selectedToken : ""}
          ${isDragging && isTokenSelected ? styles.draggingToken : ""}
        `}
    ></div>
  );
}

function DraggableSectionToken({ section, onDragOut }) {
  const [isBeingDragged, ref] = useDrag({
    type: "TOKEN",
    item: { fromSection: section, count: 1 },
    collect: (monitor) => ({
      isBeingDragged: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        onDragOut(section);
      }
    },
  });

  return (
    <div
      ref={ref}
      className={`
      ${styles.preferenceToken}
      ${styles.selectedToken}
      ${isBeingDragged ? styles.tokenBeingDragged : ""}
    `}
    ></div>
  );
}

function SectionDropZone({
  title,
  sectionKey,
  weight,
  onDropToken,
  onDragOut,
  addTokenToSection,
  removeTokenFromSection,
}) {
  const [{ isOver }, dropRef] = useDrop({
    accept: "TOKEN",
    drop: (draggedItem) => {
      onDropToken(sectionKey, draggedItem.fromSection);
      if (draggedItem.fromSection) {
        // If the token came from another section, call onDragOut for that section
        onDragOut(draggedItem.fromSection, sectionKey);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => removeTokenFromSection(sectionKey),
  });

  const ref = useRef(null);
  const combinedRef = useCombinedRefs(ref, dropRef);

  useEffect(() => {
    // ensures that our swipeable handlers are attached to the element
    if (ref.current) {
      const el = ref.current;
      handlers.ref(el);
    }
  }, [handlers.ref]);

  const handleClick = () => {
    addTokenToSection(sectionKey);
  };

  return (
    <div
      {...handlers}
      ref={combinedRef}
      onClick={handleClick}
      className={`${styles.dropzone} ${isOver ? styles.dropZoneActive : ""}`}
    >
      <p className={styles.dropzoneTitle}>{title}</p>
      <div className="tokens">
        {weight > 0 &&
          Array(weight)
            .fill(null)
            .map((_, index) => (
              <DraggableSectionToken
                key={index}
                section={sectionKey}
                onDragOut={onDragOut}
              />
            ))}
      </div>
    </div>
  );
}

function getLayerStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: "none",
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    pointerEvents: "none",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  };
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

  const { item, itemType, currentOffset, isDragging } = useItemDragLayer();

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
      let newSelectedTokens = [...prev];
      if (newSelectedTokens.includes(index)) {
        newSelectedTokens = newSelectedTokens.filter((i) => i !== index);
      } else {
        newSelectedTokens.push(index);
        newSelectedTokens.sort((a, b) => a - b);
      }

      const minSelectedIndex = Math.min(...newSelectedTokens);
      const maxSelectedIndex = Math.max(...newSelectedTokens);

      for (let i = minSelectedIndex; i <= maxSelectedIndex; i++) {
        if (!newSelectedTokens.includes(i)) {
          newSelectedTokens.push(i);
        }
      }

      return newSelectedTokens;
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

  function renderItem() {
    switch (itemType) {
      case "TOKEN":
        return <DragPreview count={item.count} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="token-bank">
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

      {isDragging && (
        <div style={getLayerStyles(currentOffset)}>{renderItem()}</div>
      )}
    </div>
  );
}

export default PreferenceWeight;
