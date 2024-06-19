import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const location = useLocation();
  const { city, fromPage, fromSurvey } = location.state || {};
  const { city_name, state_name } = city || {};

  useEffect(() => {
    console.log("fromSurvey", fromSurvey);
  }, [fromSurvey]);

  const isActive = (path) => {
    if (
      path ===
      `/results/${toUrlFriendly(state_name)}/${toUrlFriendly(city_name)}`
    ) {
      return location.pathname === path;
    }

    return location.pathname.includes(path);
  };

  const toUrlFriendly = (str) => str?.toLowerCase()?.replace(/\s+/g, "_");

  const linkClass = (path) =>
    `nav-link ${isActive(path) ? styles.activeLink : ""}`;

  return (
    <div>
      <div
        className={`nav-pills d-md-none d-flex bg-light p-3 ${styles.mobileNav}`}
      >
        <Link
          to={`/results/${state_name}/${city_name}`}
          state={{ city, fromSurvey, fromPage }}
          className={linkClass(
            `/results/${toUrlFriendly(state_name)}/${toUrlFriendly(city_name)}`
          )}
        >
          Overview
        </Link>
        <Link
          to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
            city_name
          )}/recreation`}
          state={{ city, fromSurvey, fromPage }}
          className={linkClass("/recreation")}
        >
          Recreation
        </Link>
        <Link
          to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
            city_name
          )}/weather`}
          state={{ city, fromSurvey, fromPage }}
          className={linkClass("/weather")}
        >
          Weather
        </Link>
        <Link
          to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
            city_name
          )}/housing`}
          state={{ city, fromSurvey, fromPage }}
          className={linkClass("/housing")}
        >
          Housing
        </Link>
        <Link
          to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
            city_name
          )}/job-industry`}
          state={{ city, fromSurvey, fromPage }}
          className={linkClass("/job-industry")}
        >
          Job Industry
        </Link>
        <Link
          to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
            city_name
          )}/air-quality`}
          state={{ city, fromSurvey, fromPage }}
          className={linkClass("/air-quality")}
        >
          Air Quality
        </Link>
        <Link
          to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
            city_name
          )}/demographics`}
          state={{ city, fromSurvey, fromPage }}
          className={linkClass("/demographics")}
        >
          Demographics
        </Link>
      </div>

      <div className={`d-none d-md-block bg-light p-3 ${styles.sidebar}`}>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
                city_name
              )}`}
              state={{ city, fromSurvey, fromPage }}
              className={linkClass(
                `/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
                  city_name
                )}`
              )}
            >
              Overview
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
                city_name
              )}/recreation`}
              state={{ city, fromSurvey, fromPage }}
              className={linkClass("/recreation")}
            >
              Recreation
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
                city_name
              )}/weather`}
              state={{ city, fromSurvey, fromPage }}
              className={linkClass("/weather")}
            >
              Weather
            </Link>
          </li>
          <li>
            <Link
              to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
                city_name
              )}/housing`}
              state={{ city, fromSurvey, fromPage }}
              className={linkClass("/housing")}
            >
              Housing
            </Link>
          </li>
          <li>
            <Link
              to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
                city_name
              )}/job-industry`}
              state={{ city, fromSurvey, fromPage }}
              className={linkClass("/job-industry")}
            >
              Job Industry
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
                city_name
              )}/air-quality`}
              state={{ city, fromSurvey, fromPage }}
              className={linkClass("/air-quality")}
            >
              Air Quality
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to={`/results/${toUrlFriendly(state_name)}/${toUrlFriendly(
                city_name
              )}/demographics`}
              state={{ city, fromSurvey, fromPage }}
              className={linkClass("/demographics")}
            >
              Demographics
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
