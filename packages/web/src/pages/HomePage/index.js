import React from "react";
import styles from "./HomePage.module.css";
import LivingPreferenceForm from "./components/LivingPreferenceForm.jsx";

const HomePage = () => {
  const handleStartClick = () => {
    // Logic for what should happen when the "Start" button is clicked
    alert("Start button clicked!");
  };

  return (
    <div className={styles.homepageContainer}>
      <LivingPreferenceForm />
    </div>
  );
};

export default HomePage;
