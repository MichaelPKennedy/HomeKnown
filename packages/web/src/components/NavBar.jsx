// NavBar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./NavBar.module.css";
import { AuthContext } from "../AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/signed-out");
  };

  return (
    <nav
      className={`${styles.nav} navbar navbar-expand-lg navbar-light bg-light`}
    >
      <Link to="/">
        <img src={logo} alt="Home Known Logo" className={styles.logo} />
      </Link>
      <Link className="navbar-brand" to="/">
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
        <ul className="navbar-nav">
          {/* <li className="nav-item">
            <Link className="nav-link" to="/search">
              Search
            </Link>
          </li> */}
        </ul>
        <ul className="navbar-nav ml-auto mr-1">
          <li className="nav-item dropdown mr-4">
            <button
              className="nav-link btn btn-link dropdown-toggle"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Settings
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item mb-2" to="/privacy-policy">
                Privacy Policy
              </Link>
              <Link className="dropdown-item mb-2" to="/terms-of-service">
                Terms of Service
              </Link>
              <Link className="dropdown-item" to="/data-sources">
                Our Data Sources
              </Link>
            </div>
          </li>
          {isLoggedIn ? (
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
