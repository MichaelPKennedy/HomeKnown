import React from "react";
import { Helmet } from "react-helmet";
import styles from "./ExplorePage.module.css";
import LivingPreferenceForm from "./components/LivingPreferenceForm.jsx";

const ExplorePage = () => {
  const getCanonicalUrl = () => {
    return window.location.href;
  };

  return (
    <div className={styles.explorePageContainer}>
      <Helmet>
        <title>HomeKnown | Explore</title>
        <meta
          name="description"
          content="Welcome to HomeKnown, your go-to platform for discovering amazing cities."
        />
        <link rel="canonical" href={getCanonicalUrl()} />
      </Helmet>
      <LivingPreferenceForm />
    </div>
  );
};

export default ExplorePage;
