import React from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.nav}></div>
      <div className={styles.header}></div>
      <div className={styles.photo}></div>
      <div className={styles.description}></div>
      <div className={styles.details}>
        <div className={styles.contentBlock}></div>
        <div className={styles.contentBlock}></div>
        <div className={styles.contentBlock}></div>
        <div className={styles.contentBlock}></div>
      </div>

      <div className={styles.footer}></div>
    </div>
  );
};

export default LoadingScreen;
