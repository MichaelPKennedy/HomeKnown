import React, { useState, useEffect, useContext } from "react";
import feathersClient from "../../../feathersClient";
import { AuthContext } from "../../../AuthContext";
import styles from "./notifications.module.css";

const Notification = () => {
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
          .find({ query: { user_id: user.id } });
        if (response.data.length > 0) {
          setSettings(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch notification settings", error);
      }
    };

    fetchSettings();
  }, [user.id]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSettings((prevSettings) => ({ ...prevSettings, [name]: checked }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await feathersClient
        .service("user-notifications")
        .patch(null, settings, { query: { user_id: user.id } });
      alert("Notification settings updated successfully!");
    } catch (error) {
      console.error("Failed to update notification settings", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Notification Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              name="promotional"
              checked={settings.promotional}
              onChange={handleChange}
            />
            Promotional
          </label>
        </div>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              name="recommendations"
              checked={settings.recommendations}
              onChange={handleChange}
            />
            Recommendations
          </label>
        </div>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={settings.newsletter}
              onChange={handleChange}
            />
            Newsletter
          </label>
        </div>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              name="feedback"
              checked={settings.feedback}
              onChange={handleChange}
            />
            Feedback
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Notification;
