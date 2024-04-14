import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./SecurityPage.module.css";

const SecurityPage = () => {
  const { user, createPassword, changePassword, logout } =
    useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    console.log("in validatePassword");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const passwordValidationResult = validatePassword(newPassword);
      if (passwordValidationResult !== true) {
        passwordValidationResult.forEach((error) => toast.error(error));
        return;
      }
      if (!user.hasPassword) {
        await createPassword(newPassword);
        toast.success("Password created successfully. Please log in again.");
      } else {
        await changePassword(currentPassword, newPassword);
        toast.success("Password changed successfully. Please log in again.");
      }
      logout();
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  };

  return (
    <div className={styles.securityContainer}>
      <div className={styles.breadcrumb}>
        <Link to="/account-settings" className={styles.accountLink}>
          Account
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevronIcon} />
        <span> Security</span>
      </div>
      <h2>{user?.hasPassword ? "Change Password" : "Create Password"}</h2>
      <form onSubmit={handleSubmit}>
        {user?.hasPassword && (
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={`btn ${styles.saveBtn}`}>
          {user?.hasPassword ? "Change Password" : "Set Password"}
        </button>
      </form>
    </div>
  );
};

export default SecurityPage;
