import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./AccountPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faCreditCard,
  faBell,
  faChevronRight,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../AuthContext";

const AccountPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleLogout = () => {
    logout();
    navigate("/signed-out");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn && !isMobile) {
      navigate("/login");
      return;
    }
  }, [isLoggedIn, navigate, isMobile]);

  const getCanonicalUrl = () => {
    return window.location.href;
  };

  return isLoggedIn ? (
    <div className={styles.gridContainer}>
      <Helmet>
        <title>HomeKnown | Account</title>
        <meta
          name="description"
          content="Welcome to HomeKnown, your go-to platform for discovering amazing cities."
        />
        <link rel="canonical" href={getCanonicalUrl()} />
      </Helmet>
      <Link to="/account-settings/personal-info" className={styles.accountLink}>
        <div className={styles.gridItem}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <div className={styles.textContainer}>
            <p className={styles.title}>Personal Info</p>
            <p className={styles.description}>
              Provide personal details and how we can reach you
            </p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        </div>
      </Link>

      <Link to="/account-settings/security" className={styles.accountLink}>
        <div className={styles.gridItem}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <div className={styles.textContainer}>
            <p className={styles.title}>Login & Security</p>
            <p className={styles.description}>
              Update your password and secure your account
            </p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        </div>
      </Link>

      {/* <Link to="/account-settings/payments" className={styles.accountLink}>
        <div className={styles.gridItem}>
          <FontAwesomeIcon icon={faCreditCard} className={styles.icon} />
          <div className={styles.textContainer}>
            <p className={styles.title}>Payments & Subscriptions</p>
            <p className={styles.description}>
              Manage your payment methods and subscriptions
            </p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        </div>
      </Link> */}

      <Link to="/account-settings/notifications" className={styles.accountLink}>
        <div className={styles.gridItem}>
          <FontAwesomeIcon icon={faBell} className={styles.icon} />
          <div className={styles.textContainer}>
            <p className={styles.title}>Notifications</p>
            <p className={styles.description}>
              Choose notification preferences and how you want to be contacted
            </p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        </div>
      </Link>

      <Link to="/support" className={styles.accountLink}>
        <div className={styles.gridItem}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <div className={styles.textContainer}>
            <p className={styles.title}>Contact Support</p>
            <p className={styles.description}>
              Contact Support about account or billing questions
            </p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        </div>
      </Link>
      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  ) : (
    <div className={styles.gridContainer}>
      <Link className={styles.login} to="/login">
        Login
      </Link>
    </div>
  );
};

export default AccountPage;
