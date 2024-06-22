import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./SideBar.module.css";

const SideBar = ({ city }) => {
  const location = useLocation();
  const { fromPage, fromSurvey } = location.state || {};
  const { city_name, state_name, state_abbrev } = city || {};

  const isActive = (path) => {
    if (
      path ===
      `/results/${toUrlFriendly(state_name)}/${toUrlFriendly(city_name)}`
    ) {
      return location.pathname === path;
    }

    return location.pathname.includes(path);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getPageTitle = () => {
    const pathParts = location.pathname.split("/");
    if (pathParts.length > 4) {
      return `${city_name}, ${state_abbrev} ${capitalizeFirstLetter(
        pathParts[4].replace("-", " ")
      )}`;
    }
    return `${city_name}, ${state_abbrev}`;
  };

  const toUrlFriendly = (str) => str?.toLowerCase()?.replace(/\s+/g, "_");

  const linkClass = (path) =>
    `nav-link ${isActive(path) ? styles.activeLink : ""}`;

  const getCanonicalUrl = () => {
    return window.location.href;
  };

  const getKeywords = () => {
    const pathParts = location.pathname.split("/");
    let keywords = [city_name, state_name, "living", "quality of life"];
    if (pathParts.length > 4) {
      keywords.push(pathParts[4].replace("-", " "));
    }

    return keywords.join(", ");
  };

  const getDescription = () => {
    const pathParts = location.pathname.split("/");
    if (pathParts.length > 4) {
      return `Learn about ${capitalizeFirstLetter(
        pathParts[4].replace("-", " ")
      )} in ${city_name}, ${state_name}. Discover the best places to live, work, and visit.`;
    }
    return `Discover ${city_name}, ${state_name}. Learn about the best places to live, work, and visit.`;
  };

  return (
    <div>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getDescription()} />
        <link rel="canonical" href={getCanonicalUrl()} />
        <meta name="keywords" content={getKeywords()} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getDescription()} />
        <meta property="og:url" content={getCanonicalUrl()} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.homeknown.app/light-logo.png"
        />
        <meta
          name="twitter:card"
          content="https://www.homeknown.app/light-logo.png"
        />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getDescription()} />
        <meta
          name="twitter:image"
          content="https://www.homeknown.app/light-logo.png"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: `${city_name}, ${state_name}`,
            description: getDescription(),
            url: getCanonicalUrl(),
            image: "https://www.homeknown.app/light-logo.png",
            address: {
              "@type": "PostalAddress",
              addressLocality: city_name,
              addressRegion: state_name,
              addressCountry: "Country",
            },
          })}
        </script>
      </Helmet>
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
