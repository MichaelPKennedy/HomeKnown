import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./PleaseLogin.module.css";

const PleaseLogin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.header}>
          Please Login to see your saved locations
        </h1>
        <p className={styles.description}>
          If you don't have an account, register for a free account to start
          saving locations
        </p>
        <div className={styles.buttonRow}>
          <Link
            to="/login"
            className={`${styles.button} ${styles.primaryButton}`}
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PleaseLogin;
