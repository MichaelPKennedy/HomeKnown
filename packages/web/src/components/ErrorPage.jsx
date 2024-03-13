import React from "react";
import styles from "./ErrorPage.module.css";
import logo from "../assets/logo.png";

const ErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <h2>Something went wrong!</h2>
      <p>We're sorry for the inconvenience. Please try reloading the page.</p>
      <div>
        <img src={logo} alt="HomeKnown" className={styles.errorImage} />
      </div>
      <div>
        <button
          onClick={() => window.location.reload()}
          className={styles.reloadButton}
        >
          Reload Page
        </button>
      </div>
      <div style={{ marginTop: "30px" }}>
        <p>If the problem persists, please contact our support team.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
