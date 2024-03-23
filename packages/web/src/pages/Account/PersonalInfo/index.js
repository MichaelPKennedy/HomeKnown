import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../AuthContext";
import styles from "./PersonalInfo.module.css";

const PersonalInfo = () => {
  const { isLoggedIn, user, updateUserField } = useContext(AuthContext);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const handleEdit = (fieldName, currentValue) => {
    setEditingField(fieldName);
    setEditValue(currentValue || "");
  };

  const handleSave = async () => {
    await updateUserField(user.user_id, editingField, editValue);
    setEditingField(null);
  };

  const renderEditForm = (field) =>
    editingField === field && (
      <div className="d-flex align-items-center mt-2">
        <input
          type="text"
          className="form-control"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          autoFocus
        />
        <button className={styles.saveBtn} onClick={handleSave}>
          Save
        </button>
        <button
          className={`btn btn-secondary ${styles.cancelBtn}`}
          onClick={() => setEditingField(null)}
        >
          <FontAwesomeIcon icon={faTimes} /> {/* Using FontAwesome icon */}
        </button>
      </div>
    );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[date.getMonth()];

    // Format: Day Month Year (e.g., 12 December 2023)
    return `${day} ${monthName} ${year}`;
  };

  return (
    <div className={styles.personalInfoContainer}>
      <div className={styles.breadcrumb}>
        <Link to="/account-settings" className={styles.accountLink}>
          Account
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevronIcon} />
        <span> Personal Info</span>
      </div>

      <h2 className={styles.title}>Personal Info</h2>

      {/* Username */}
      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>Username</div>
          <div className={styles.infoValue}>{user?.username || "N/A"}</div>
        </div>
        {editingField !== "username" && (
          <div
            className={styles.actionLink}
            onClick={() => handleEdit("username", user?.username)}
          >
            {user?.username ? "Edit" : "Add"}
          </div>
        )}
        {renderEditForm("username")}
      </div>

      {/* First Name */}
      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>First Name</div>
          <div className={styles.infoValue}>{user?.first_name || "N/A"}</div>
        </div>
        {editingField !== "first_name" && (
          <div
            className={styles.actionLink}
            onClick={() => handleEdit("first_name", user?.first_name)}
          >
            {user?.first_name ? "Edit" : "Add"}
          </div>
        )}
        {renderEditForm("first_name")}
      </div>

      {/* Last Name */}
      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>Last Name</div>
          <div className={styles.infoValue}>{user?.last_name || "N/A"}</div>
        </div>
        {editingField !== "last_name" && (
          <div
            className={styles.actionLink}
            onClick={() => handleEdit("last_name", user?.last_name)}
          >
            {user?.last_name ? "Edit" : "Add"}
          </div>
        )}
        {renderEditForm("last_name")}
      </div>

      {/* Email Address */}
      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>Email address</div>
          <div className={styles.infoValue}>{user?.primary_email || "N/A"}</div>
        </div>
        {editingField !== "primary_email" && (
          <div
            className={styles.actionLink}
            onClick={() => handleEdit("primary_email", user?.primary_email)}
          >
            {user?.primary_email ? "Edit" : "Add"}
          </div>
        )}
        {renderEditForm("primary_email")}
      </div>

      {/* Phone Number */}
      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>Phone number</div>
          <div className={styles.infoValue}>{user?.phone || "N/A"}</div>
        </div>
        {editingField !== "phone" && (
          <div
            className={styles.actionLink}
            onClick={() => handleEdit("phone", user?.phone)}
          >
            {user?.phone ? "Edit" : "Add"}
          </div>
        )}
        {renderEditForm("phone")}
      </div>

      {/* Member Since (Read-only) */}
      <div className={styles.infoItem}>
        <div>
          <div className={styles.infoLabel}>Member Since</div>
          <div className={styles.infoValue}>
            {user?.created_at ? formatDate(user.created_at) : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
