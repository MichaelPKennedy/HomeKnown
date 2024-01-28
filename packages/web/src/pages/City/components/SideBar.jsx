import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const location = useLocation();
  const { cityId } = useParams();

  const isActive = (path) => {
    if (path === `/results/${cityId}`) {
      return location.pathname === path;
    }

    return location.pathname.includes(path);
  };

  const linkClass = (path) =>
    `nav-link ${isActive(path) ? styles.activeLink : ""}`;

  return (
    <div>
      <div
        className={`nav-pills d-md-none d-flex justify-content-around bg-light p-3 ${styles.mobileNav}`}
      >
        <Link
          to={`/results/${cityId}`}
          className={linkClass(`/results/${cityId}`)}
        >
          Overview
        </Link>

        <Link
          to={`/results/${cityId}/recreation`}
          className={linkClass("/recreation")}
        >
          Recreation
        </Link>
        <Link
          to={`/results/${cityId}/weather`}
          className={linkClass("/weather")}
        >
          Weather
        </Link>
        <Link
          to={`/results/${cityId}/housing`}
          className={linkClass("/housing")}
        >
          Housing
        </Link>
      </div>

      <div className={`d-none d-md-block bg-light p-3 ${styles.sidebar}`}>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to={`/results/${cityId}`}
              className={linkClass(`/results/${cityId}`)}
            >
              Overview
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/results/${cityId}/recreation`}
              className={linkClass("/recreation")}
            >
              Recreation
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/results/${cityId}/weather`}
              className={linkClass("/weather")}
            >
              Weather
            </Link>
          </li>
          <li>
            <Link
              to={`/results/${cityId}/housing`}
              className={linkClass("/housing")}
            >
              Housing
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
