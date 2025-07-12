import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { toast } from "react-toastify";
import client from "../../feathersClient.js";
import queryString from "query-string";
import GoogleLoginButton from "../../components/GoogleLoginButton";

import { AuthContext } from "../../AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("showRegisterSuccessToast") === "true") {
      toast.success("You are now registered. Please log in to continue.");
      localStorage.removeItem("showRegisterSuccessToast");
    }
    const { access_token, user_id } = queryString.parse(window.location.search);
    if (access_token && user_id) {
      googleLogin(access_token, user_id);
      navigate("/");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await client.service("/authentication").create({
        strategy: "local",
        login: loginField,
        password: password,
      });
      if (response.accessToken && response.users) {
        login(response.accessToken, response.users);
        window.location.href = "/";
      } else {
        toast.error("Incorrect Username or Password");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const getCanonicalUrl = () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.toString();
  };

  return (
    <div className={styles.loginPageContainer}>
      <Helmet>
        <title>HomeKnown | Login</title>
        <meta
          name="description"
          content="Login to HomeKnown and start discovering your perfect city."
        />
        <link rel="canonical" href={getCanonicalUrl()} />
      </Helmet>

      <h1 className={styles.title}>Welcome Back</h1>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Username or Email</label>
              <input
                type="text"
                className={styles.formControl}
                placeholder="Enter username or email"
                value={loginField}
                onChange={(e) => setLoginField(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input
                type="password"
                className={styles.formControl}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign In
            </button>
          </form>

          <div className={styles.forgotPasswordContainer}>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className={styles.forgotPasswordButton}
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.googleSection}>
            <GoogleLoginButton />
            <p className={styles.termsOfService}>
              By signing in with Google, you agree to our{" "}
              <a href="/terms-of-service">Terms of Service</a> and{" "}
              <a href="/privacy-policy">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.registerSection}>
            <p className={styles.registerText}>Don't have an account?</p>
            <a href="/register" className={styles.registerButton}>
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
