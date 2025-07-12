import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import client from "../../feathersClient.js";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must include a number.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must include a lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must include an uppercase letter.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must include a special character.");
    }

    return errors.length === 0 ? true : errors;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult !== true) {
      passwordValidationResult.forEach((error) => toast.error(error));
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the terms of service and privacy policy.");
      return;
    }

    try {
      await client
        .service("users")
        .create({ username, primary_email: email, password });
      localStorage.setItem("showRegisterSuccessToast", "true");
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <h1 className={styles.title}>Join HomeKnown</h1>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <form onSubmit={handleRegister}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Username</label>
              <input
                type="text"
                className={styles.formControl}
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <input
                type="email"
                className={styles.formControl}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input
                type="password"
                className={styles.formControl}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className={styles.formText}>
                Password must be at least 8 characters and include a number, an
                uppercase letter, a lowercase letter, and a special character.
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Confirm Password</label>
              <input
                type="password"
                className={styles.formControl}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                className={styles.checkbox}
                id="termsCheckbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
              />
              <label htmlFor="termsCheckbox" className={styles.checkboxLabel}>
                I agree to the{" "}
                <Link to="/terms-of-service">Terms of Service</Link> and{" "}
                <Link to="/privacy-policy">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className={styles.submitButton}>
              Create Account
            </button>
          </form>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.registerSection}>
            <p className={styles.registerText}>Already have an account?</p>
            <a href="/login" className={styles.registerButton}>
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
