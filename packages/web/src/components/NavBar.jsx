// NavBar.js
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/light-logo.png";
import styles from "./NavBar.module.css";
import { AuthContext } from "../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import BottomNavBar from "./BottomNavBar";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/signed-out");
  };

  const userInitial = user?.first_name
    ? user.first_name[0]
    : user?.username
    ? user.username[0]
    : null;

  const [bottomNavClass, setBottomNavClass] = useState(styles.bottomNavShow);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY <= 0) {
        setBottomNavClass(styles.bottomNavShow);
      } else if (window.scrollY > lastScrollY) {
        setBottomNavClass(styles.bottomNavHide);
      } else {
        setBottomNavClass(styles.bottomNavShow);
      }
      if (window.scrollY > 0) {
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <>
      <nav className={`${styles.nav}`}>
        <div
          className={`${styles.navBody} navbar navbar-expand-lg navbar-light bg-light`}
        >
          <Link to="/">
            <img src={logo} alt="Home Known Logo" className={styles.logo} />
          </Link>
          <Link className={`navbar-brand ${styles.brand}`} to="/">
            Home Known
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto mr-1">
              <li className="nav-item mr-4">
                <Link to="/explore">
                  <button className={`${styles.button} nav-link btn btn-link`}>
                    Explore
                  </button>
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <li className="nav-item mr-4">
                    <Link to="/recommendations">
                      <button
                        className={`${styles.button} nav-link btn btn-link`}
                      >
                        Recommendations
                      </button>
                    </Link>
                  </li>
                  <li className="nav-item mr-4">
                    <Link to="/my-locations">
                      <button
                        className={`${styles.button} nav-link btn btn-link`}
                      >
                        My Locations
                      </button>
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item dropdown">
                <button
                  className={`nav-link btn btn-link ${styles.userCircle}`}
                  id="userMenuDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {userInitial || <FontAwesomeIcon icon={faUser} />}
                </button>
                <div
                  className={`dropdown-menu dropdown-menu-right ${styles.dropdown}`}
                  aria-labelledby="userMenuDropdown"
                >
                  {isLoggedIn ? (
                    <>
                      <Link
                        className={`dropdown-item pl-3 ${styles.dropdownItem}`}
                        to="/account-settings"
                      >
                        Account
                      </Link>
                      <button
                        className={`dropdown-item pl-3 ${styles.dropdownItem}`}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      className={`dropdown-item pl-3 ${styles.dropdownItem}`}
                      to="/login"
                    >
                      Login
                    </Link>
                  )}
                  <div className="dropdown-divider"></div>
                  <Link
                    className={`dropdown-item pl-3 ${styles.dropdownItem}`}
                    to="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    className={`dropdown-item pl-3 ${styles.dropdownItem}`}
                    to="/terms-of-service"
                  >
                    Terms of Service
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <BottomNavBar bottomNavClass={bottomNavClass} />
      </div>
    </>
  );
};

export default NavBar;
