import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./City.module.css"; // Make sure to create this CSS module file.
import RecreationMap from "../ResultsPage/components/RecreationMap";

function City() {
  const { cityId } = useParams();
  const location = useLocation();
  const { city } = location.state;
  console.log("city", city);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.cityPage}>
      <h1>
        {city.city_name}, {city.state_name}
      </h1>
      <RecreationMap {...city} />
    </div>
  );
}

export default City;
