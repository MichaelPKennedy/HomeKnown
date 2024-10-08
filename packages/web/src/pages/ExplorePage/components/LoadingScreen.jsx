import React from "react";
import styles from "./LoadingScreen.module.css";
import logoImage from "../assets/light-logo.png";

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <img src={logoImage} alt="Loading" className={styles.logo} />
      <div className={styles.loadingText}>
        <p>Please wait while we find you the perfect place to live</p>
      </div>
      <div className={styles.loadingDots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
