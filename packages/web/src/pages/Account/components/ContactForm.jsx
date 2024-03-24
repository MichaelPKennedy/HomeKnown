import React, { useState, useContext } from "react";
import feathersClient from "../../../feathersClient";
import { AuthContext } from "../../../AuthContext";
import styles from "./ContactForm.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [contactType, setContactType] = useState("report a bug");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await feathersClient.service("contact-support").create({
        issue_type: contactType,
        user_id: user?.user_id || null,
        message,
      });
      setContactType("report a bug");
      setMessage("");
      navigate("/support/confirmation");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`mt-5 ${styles.contactFormContainer}`}>
      <h2>Contact Support</h2>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className="form-group">
          <label htmlFor="contactType">What can we help you with?</label>
          <select
            id="contactType"
            className="form-control"
            value={contactType}
            onChange={(e) => setContactType(e.target.value)}
            required
          >
            <option value="bug">Report a Bug</option>
            <option value="feedback">Submit Feedback</option>
            <option value="feature">Request New Feature</option>
            <option value="billing">Billing Support</option>
            <option value="business">Business Inquiry</option>
            <option value="account">Help with My Account</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className={`btn mt-3 ${styles.button}`}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
