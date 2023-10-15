import React, { useState } from "react";
import { useDrag, useDrop, useDragLayer } from "react-dnd";
import styles from "./PreferenceWeight.module.css";

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

// DropZone Component
function SectionDropZone({
  title,
  sectionKey,
  weight,
  onDropToken,
  onDragOut,
}) {
  const [{ isOver }, ref] = useDrop({
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

  return (
    <div
      ref={ref}
      className={`${styles.dropzone} ${isOver ? styles.dropZoneActive : ""}`}
    >
      <p className={styles.dropzoneTitle}>{title}</p>
      <div className="tokens">
        {weight > 0
          ? Array(weight)
              .fill(null)
              .map((_, index) => (
                <DraggableSectionToken
                  key={index}
                  section={sectionKey}
                  onDragOut={onDragOut}
                />
              ))
          : null}
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

function PreferenceWeight() {
  const [weights, setWeights] = useState({
    costOfLivingWeight: 0,
    recreationalActivitiesWeight: 0,
    weatherWeight: 0,
    jobOpportunityWeight: 0,
    publicServicesWeight: 0,
    crimeRateWeight: 0,
    totalAvailablePoints: 10,
  });

  const [selectedTokens, setSelectedTokens] = useState([]);

  const { item, itemType, currentOffset, isDragging } = useItemDragLayer();

  const handleDragOut = (fromSection, sectionKey) => {
    setWeights((prevState) => {
      const newWeights = {
        ...prevState,
        [fromSection]: prevState[fromSection] - 1,
      };

      if (sectionKey) {
        newWeights[sectionKey] = prevState[sectionKey] + 1;
      } else {
        newWeights.totalAvailablePoints = prevState.totalAvailablePoints + 1;
      }

      return newWeights;
    });
  };

  const toggleTokenSelection = (index) => {
    if (selectedTokens.includes(index)) {
      setSelectedTokens((prev) => prev.filter((i) => i !== index));
    } else {
      setSelectedTokens((prev) => [...prev, index]);
    }
  };

  const updateSectionWeight = (targetSection, fromSection = null) => {
    setWeights((prevState) => {
      let adjustment = selectedTokens.length;

      let newWeights = { ...prevState };

      if (!fromSection) {
        // Only decrement the totalAvailablePoints if the token is dragged from the bank
        newWeights.totalAvailablePoints =
          prevState.totalAvailablePoints - adjustment;
      }

      newWeights[targetSection] = prevState[targetSection] + adjustment;

      return newWeights;
    });

    setSelectedTokens([]); // Clear selected tokens after the operation
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
            />
          ))}
      </div>
      <div className={styles.dropZoneContainer}>
        <SectionDropZone
          title="Cost of Living"
          sectionKey="costOfLivingWeight"
          weight={weights.costOfLivingWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
        />

        <SectionDropZone
          title="Recreational Activities"
          sectionKey="recreationalActivitiesWeight"
          weight={weights.recreationalActivitiesWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
        />

        <SectionDropZone
          title="Weather"
          sectionKey="weatherWeight"
          weight={weights.weatherWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
        />

        <SectionDropZone
          title="Salary & Job Opportunity"
          sectionKey="jobOpportunityWeight"
          weight={weights.jobOpportunityWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
        />

        <SectionDropZone
          title="Public Services"
          sectionKey="publicServicesWeight"
          weight={weights.publicServicesWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
        />

        <SectionDropZone
          title="Crime Rate"
          sectionKey="crimeRateWeight"
          weight={weights.crimeRateWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
        />
      </div>

      {isDragging && (
        <div style={getLayerStyles(currentOffset)}>{renderItem()}</div>
      )}
    </div>
  );
}

export default PreferenceWeight;
