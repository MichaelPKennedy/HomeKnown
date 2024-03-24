import React from "react";
import styles from "./ExplorePage.module.css";
import LivingPreferenceForm from "./components/LivingPreferenceForm.jsx";

const ExplorePage = () => {
  return (
    <div className={styles.explorePageContainer}>
      <LivingPreferenceForm />
    </div>
  );
};

export default ExplorePage;
