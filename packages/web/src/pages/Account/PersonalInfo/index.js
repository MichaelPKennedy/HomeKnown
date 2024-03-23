import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../AuthContext";
import styles from "./PersonalInfo.module.css";

const PersonalInfo = () => {
  const { isLoggedIn, user, updateUserField } = useContext(AuthContext);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

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

    return `${day} ${monthName} ${year}`;
  };

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
      <div className={`d-flex align-items-center mt-2 ${styles.editForm}`}>
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
      </div>
    );

  const renderCancelButton = () => (
    <button
      className={`btn btn-secondary ${styles.cancelBtn}`}
      onClick={() => setEditingField(null)}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );

  const renderEditButton = (field, value) => (
    <div className={styles.actionLink} onClick={() => handleEdit(field, value)}>
      {value ? "Edit" : "Add"}
    </div>
  );

  const renderInfoValue = (value) => (
    <div className={styles.infoValue}>{value || "N/A"}</div>
  );

  const fieldRenderer = (field, label) => (
    <div className={styles.infoItem}>
      <div className={styles.titleSection}>
        <div className={styles.infoLabel}>{label}</div>
        {editingField === field
          ? renderCancelButton()
          : renderEditButton(field, user?.[field])}
      </div>
      {editingField === field
        ? renderEditForm(field)
        : renderInfoValue(user?.[field])}
    </div>
  );

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

      {fieldRenderer("username", "Username")}
      {fieldRenderer("first_name", "First Name")}
      {fieldRenderer("last_name", "Last Name")}
      {fieldRenderer("primary_email", "Email Address")}
      {fieldRenderer("phone", "Phone Number")}

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
