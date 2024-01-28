import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { cityId } = useParams();

  return (
    <>
      <button
        className="btn btn-primary d-md-none" // This button is only visible on small (mobile) screens
        onClick={() => setOpen(!open)}
        aria-controls="sidebar"
        aria-expanded={open}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <Collapse in={open} className="d-md-block">
        <div className={`bg-light p-3 ${styles.sidebar}`}>
          {/* Your existing sidebar links */}
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link
                to={`/results/${cityId}`}
                className={`nav-link ${
                  location.pathname === `/results/${cityId}` ? "active" : ""
                }`}
              >
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/results/${cityId}/recreation`}
                className={`nav-link ${
                  location.pathname.includes("/recreation") ? "active" : ""
                }`}
              >
                Recreation
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/results/${cityId}/weather`}
                className={`nav-link ${
                  location.pathname.includes("/weather") ? "active" : ""
                }`}
              >
                Weather
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </Collapse>
    </>
  );
};

export default SideBar;
