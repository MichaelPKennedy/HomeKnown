import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./PleaseLogin.module.css";

const PleaseLogin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.header}>
          Please Login to see your recommendations
        </h1>
        <p className={styles.description}>
          If you don't have an account, register for a free account to start
          receiving personalized AI generated recommendations
        </p>
        <div className={styles.buttonRow}>
          <Link
            to="/login"
            className={`${styles.button} ${styles.primaryButton}`}
          >
            Log In
          </Link>
          <Link
            to="/register"
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PleaseLogin;
