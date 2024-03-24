import React from "react";
import { Link } from "react-router-dom";
import styles from "./BottomNavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faMapMarkerAlt,
  faUserCircle,
  faRobot,
  faSearch,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

const BottomNavBar = ({ bottomNavClass }) => {
  return (
    <nav className={`${styles.bottomNav} ${bottomNavClass}`}>
      <div className={styles.navItem}>
        <Link to="/">
          <FontAwesomeIcon icon={faSearch} className={styles.icon} />
          <span className={styles.navText}>Search</span>
        </Link>
      </div>
      <div className={styles.navItem}>
        <Link to="/explore">
          <FontAwesomeIcon icon={faCompass} className={styles.icon} />
          <span className={styles.navText}>Explore</span>
        </Link>
      </div>
      <div className={styles.navItem}>
        <Link to="/recommendations">
          <FontAwesomeIcon icon={faRobot} className={styles.icon} />
          <span className={styles.navText}>Suggestions</span>
        </Link>
      </div>
      <div className={styles.navItem}>
        <Link to="/my-locations">
          <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
          <span className={styles.navText}>My Places</span>
        </Link>
      </div>
      <div className={styles.navItem}>
        <Link to="/account-settings">
          <FontAwesomeIcon icon={faUserCircle} className={styles.icon} />
          <span className={styles.navText}>Account</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavBar;
