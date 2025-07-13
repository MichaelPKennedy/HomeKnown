import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./PleaseLogin.module.css";

const PleaseLogin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.header}>Please Login to Contact Us</h1>
        <p className={styles.description}>
          This will help us quickly identify you and get you the help you need
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
