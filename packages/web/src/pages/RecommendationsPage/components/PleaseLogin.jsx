import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./PleaseLogin.module.css";

const PleaseLogin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={`mt-4 ${styles.header}`}>
          Please Login to see your recommendations
        </h1>
        <p className={`mt-4`}>
          If you don't have an account, register for a free account to start
          receiving personalized AI generated recommendations
        </p>
        <div className={styles.buttonRow}>
          <Link to="/login" className={`btn mt-3 ${styles.button}`}>
            Log In
          </Link>
          <Link to="/register" className={`btn mt-3 ${styles.button}`}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PleaseLogin;
