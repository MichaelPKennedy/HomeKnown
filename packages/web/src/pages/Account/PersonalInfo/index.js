import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./PersonalInfo.module.css";

const PersonalInfo = () => {
  const userInfo = {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    memberSince: "January 2020",
  };

  return (
    <div className={styles.personalInfoContainer}>
      <div className={styles.breadcrumb}>
        <Link to="/account-settings" className={styles.accountLink}>
          Account
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevronIcon} />
        <span> Personal Info</span>
      </div>

      <h2 className={styles.title}>Personal Info</h2>

      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>First Name</div>
          <div className={styles.infoValue}>{userInfo.firstName}</div>
        </div>
        <div className={styles.actionLink}>Edit</div>
      </div>

      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>Last Name</div>
          <div className={styles.infoValue}>{userInfo.lastName}</div>
        </div>
        <div className={styles.actionLink}>Edit</div>
      </div>

      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>Email address</div>
          <div className={styles.infoValue}>{userInfo.email}</div>
        </div>
        <div className={styles.actionLink}>Edit</div>
      </div>

      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>Phone number</div>
          <div className={styles.infoValue}>{userInfo.phoneNumber}</div>
        </div>
        <div className={styles.actionLink}>Add</div>
      </div>

      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>Member Since</div>
          <div className={styles.infoValue}>{userInfo.memberSince}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
