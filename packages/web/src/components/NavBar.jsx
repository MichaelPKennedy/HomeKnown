// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">
              Search
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto mr-1">
          <li className="nav-item">
            <Link className="nav-link " to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
