import React from "react";
import styles from "./PlaceholderCard.module.css";

const PlaceholderCard = ({ index }) => {
  return (
    <div className={styles.placeholderContainer} key={index}>
      <div className={styles.imageContainer}></div>
    </div>
  );
};

export default PlaceholderCard;
