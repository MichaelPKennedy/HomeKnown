// NavBar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // Redirect to home page or login page
    navigate("/signed-out");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${styles.nav}`}
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
