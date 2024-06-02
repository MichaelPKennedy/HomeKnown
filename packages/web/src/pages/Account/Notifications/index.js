import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import feathersClient from "../../../feathersClient";
import { AuthContext } from "../../../AuthContext";
import styles from "./Notifications.module.css";

const NotificationSettings = () => {
  const { user } = useContext(AuthContext);
  const [settings, setSettings] = useState({
    promotional: true,
    recommendations: true,
    newsletter: true,
    feedback: true,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await feathersClient
          .service("user-notifications")
          .find({ query: { user_id: user?.user_id } });
        if (response?.length > 0) {
          const emailSettings = response.find(
            (setting) => setting.type === "email"
          );
          if (emailSettings) {
            setSettings(emailSettings);
          }
        }
      } catch (error) {
        console.error("Failed to fetch notification settings", error);
      }
    };

    fetchSettings();
  }, [user]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSettings((prevSettings) => ({ ...prevSettings, [name]: checked }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await feathersClient.service("user-notifications").patch(null, settings, {
        query: { user_id: user?.user_id, type: "email" },
      });
      toast.success("Notifications Successfully Updated.");
    } catch (error) {
      console.error("Failed to update notification settings", error);
    }
  };

  return (
    <div className={styles.personalInfoContainer}>
      <div className={styles.breadcrumb}>
        <Link to="/account-settings" className={styles.accountLink}>
          Account
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevronIcon} />
        <span> Notification Settings</span>
      </div>

      <h2 className={styles.title}>Email Notifications</h2>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <div className={styles.infoItem}>
          <label className={styles.infoLabel}>
            <input
              type="checkbox"
              name="recommendations"
              checked={settings.recommendations}
              onChange={handleChange}
              className={styles.checkbox}
            />
            New Recommendations
          </label>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.infoLabel}>
            <input
              type="checkbox"
              name="promotional"
              checked={settings.promotional}
              onChange={handleChange}
              className={styles.checkbox}
            />
            Promotional
          </label>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.infoLabel}>
            <input
              type="checkbox"
              name="newsletter"
              checked={settings.newsletter}
              onChange={handleChange}
              className={styles.checkbox}
            />
            Newsletter
          </label>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.infoLabel}>
            <input
              type="checkbox"
              name="feedback"
              checked={settings.feedback}
              onChange={handleChange}
              className={styles.checkbox}
            />
            Feedback
          </label>
        </div>
        <button type="submit" className={styles.saveBtn}>
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default NotificationSettings;
