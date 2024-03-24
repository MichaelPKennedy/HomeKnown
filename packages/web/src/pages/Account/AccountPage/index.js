import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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

// Placeholder components
const PaymentsSubscriptions = () => (
  <div>Payments & Subscriptions Component</div>
);
const Notifications = () => <div>Notifications Component</div>;

const AccountPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/signed-out");
  };

  return (
    <div className={styles.gridContainer}>
      {/* Personal Info */}
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

      {/* Login & Security */}
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

      {/* Payments & Subscriptions */}
      <Link to="/account-settings/payments" className={styles.accountLink}>
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
      </Link>

      {/* Notifications */}
      <Link to="/account-settings/notifications" className={styles.accountLink}>
        <div className={styles.gridItem} onClick={() => <Notifications />}>
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

      {/* Contact Support */}
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
      {isLoggedIn ? (
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link className={styles.login} to="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default AccountPage;
