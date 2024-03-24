import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./PleaseLogin.module.css";

const PleaseLogin = () => {
  return (
    <div className={`container ${styles.container}`}>
      <h1 className={`mt-4 ${styles.header}`}>Please Login to Contact Us</h1>
      <p className={`mt-4`}>
        This will help us quickly identify you and get you the help you need
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
  );
};

export default PleaseLogin;
