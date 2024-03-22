import React from "react";
import styles from "./AccountPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faCreditCard,
  faBell,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Placeholder components
const PersonalInfo = () => <div>Personal Info Component</div>;
const LoginSecurity = () => <div>Login & Security Component</div>;
const PaymentsSubscriptions = () => (
  <div>Payments & Subscriptions Component</div>
);
const Notifications = () => <div>Notifications Component</div>;

const AccountPage = () => {
  return (
    <div className={styles.gridContainer}>
      {/* Personal Info */}
      <div className={styles.gridItem} onClick={() => <PersonalInfo />}>
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
        <div className={styles.textContainer}>
          <p className={styles.title}>Personal Info</p>
          <p className={styles.description}>
            Provide personal details and how we can reach you
          </p>
        </div>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
      </div>

      {/* Login & Security */}
      <div className={styles.gridItem} onClick={() => <LoginSecurity />}>
        <FontAwesomeIcon icon={faLock} className={styles.icon} />
        <div className={styles.textContainer}>
          <p className={styles.title}>Login & Security</p>
          <p className={styles.description}>
            Update your password and secure your account
          </p>
        </div>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
      </div>

      {/* Payments & Subscriptions */}
      <div
        className={styles.gridItem}
        onClick={() => <PaymentsSubscriptions />}
      >
        <FontAwesomeIcon icon={faCreditCard} className={styles.icon} />
        <div className={styles.textContainer}>
          <p className={styles.title}>Payments & Subscriptions</p>
          <p className={styles.description}>
            Manage your payment methods and subscriptions
          </p>
        </div>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
      </div>

      {/* Notifications */}
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
    </div>
  );
};

export default AccountPage;
