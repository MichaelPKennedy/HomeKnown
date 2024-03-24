import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import styles from "./ThankYouPage.module.css";

const ThankYouPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="container mt-5 text-center">
      <h1>Thank You!</h1>
      <p className="mt-4">
        We have received your message and will get back to you as soon as
        possible.
      </p>
      <p>
        If you have any more questions, please feel free to{" "}
        <Link to="/contact">contact us</Link> again.
      </p>
      {isLoggedIn ? (
        <Link to="/account-settings" className={`btn mt-3 ${styles.button}`}>
          Return To Account
        </Link>
      ) : (
        <Link to="/" className={`btn mt-3 ${styles.button}`}>
          Return Home
        </Link>
      )}
    </div>
  );
};

export default ThankYouPage;
