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

// DropZone Component
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
    // add other swipe handlers if needed
  });

  const ref = useRef(null);
  const combinedRef = useCombinedRefs(ref, dropRef);

  useEffect(() => {
    // This ensures that our swipeable handlers are attached to the element
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

  const addTokenToSection = (sectionKey) => {
    setWeights((prevState) => {
      if (prevState.totalAvailablePoints > 0) {
        return {
          ...prevState,
          [sectionKey]: prevState[sectionKey] + 1,
          totalAvailablePoints: prevState.totalAvailablePoints - 1,
        };
      }
      return prevState;
    });
  };

  const removeTokenFromSection = (sectionKey) => {
    setWeights((prevState) => {
      console.log("Previous State:", prevState);
      if (prevState[sectionKey] > 0) {
        const newState = {
          ...prevState,
          [sectionKey]: prevState[sectionKey] - 1,
          totalAvailablePoints: prevState.totalAvailablePoints + 1,
        };
        console.log("New State:", newState);
        return newState;
      }
      return prevState;
    });
  };

  const [selectedTokens, setSelectedTokens] = useState([]);

  const { item, itemType, currentOffset, isDragging } = useItemDragLayer();

  const handleDragOut = (fromSection, sectionKey) => {
    if (
      (fromSection === null && sectionKey === null) ||
      fromSection === sectionKey
    )
      return;
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
    setSelectedTokens((prev) => {
      let newSelectedTokens = [...prev];
      if (newSelectedTokens.includes(index)) {
        newSelectedTokens = newSelectedTokens.filter((i) => i !== index);
      } else {
        newSelectedTokens.push(index);
        // Sort to make sure tokens are in order
        newSelectedTokens.sort((a, b) => a - b);
      }

      // Find the two outermost selected tokens
      const minSelectedIndex = Math.min(...newSelectedTokens);
      const maxSelectedIndex = Math.max(...newSelectedTokens);

      // Select all tokens between the two outermost selected tokens
      for (let i = minSelectedIndex; i <= maxSelectedIndex; i++) {
        if (!newSelectedTokens.includes(i)) {
          newSelectedTokens.push(i);
        }
      }

      return newSelectedTokens;
    });
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

      if (!adjustment && !fromSection) {
        newWeights[targetSection] = prevState[targetSection] + 1;
        newWeights.totalAvailablePoints = prevState.totalAvailablePoints - 1;
      } else {
        newWeights[targetSection] = prevState[targetSection] + adjustment;
      }

      return newWeights;
    });

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
        <SectionDropZone
          title="Cost of Living"
          sectionKey="costOfLivingWeight"
          weight={weights.costOfLivingWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
          addTokenToSection={addTokenToSection}
          removeTokenFromSection={removeTokenFromSection}
        />

        <SectionDropZone
          title="Recreational Activities"
          sectionKey="recreationalActivitiesWeight"
          weight={weights.recreationalActivitiesWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
          addTokenToSection={addTokenToSection}
          removeTokenFromSection={removeTokenFromSection}
        />

        <SectionDropZone
          title="Weather"
          sectionKey="weatherWeight"
          weight={weights.weatherWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
          addTokenToSection={addTokenToSection}
          removeTokenFromSection={removeTokenFromSection}
        />

        <SectionDropZone
          title="Salary & Job Opportunity"
          sectionKey="jobOpportunityWeight"
          weight={weights.jobOpportunityWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
          addTokenToSection={addTokenToSection}
          removeTokenFromSection={removeTokenFromSection}
        />

        <SectionDropZone
          title="Public Services"
          sectionKey="publicServicesWeight"
          weight={weights.publicServicesWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
          addTokenToSection={addTokenToSection}
          removeTokenFromSection={removeTokenFromSection}
        />

        <SectionDropZone
          title="Crime Rate"
          sectionKey="crimeRateWeight"
          weight={weights.crimeRateWeight}
          onDropToken={(sectionKey, fromSection) =>
            updateSectionWeight(sectionKey, fromSection)
          }
          onDragOut={handleDragOut}
          addTokenToSection={addTokenToSection}
          removeTokenFromSection={removeTokenFromSection}
        />
      </div>

      {isDragging && (
        <div style={getLayerStyles(currentOffset)}>{renderItem()}</div>
      )}
    </div>
  );
}

export default PreferenceWeight;
