import React from "react";
import { useParams } from "react-router-dom";
import styles from "./City.module.css"; // Make sure to create this CSS module file.

function City() {
  const { cityId } = useParams();

  return (
    <div className={styles.cityPage}>
      <h1>City Details for ID: {cityId}</h1>
      {/* Render the city details here */}
    </div>
  );
}

export default City;
