import React from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingText}>
        Please wait while we find you the perfect place to live
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
