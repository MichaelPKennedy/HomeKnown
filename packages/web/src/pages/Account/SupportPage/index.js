import React from "react";
import styles from "./SupportPage.module.css";
import ContactForm from "../components/ContactForm";

const SupportPage = () => {
  return (
    <div className={styles.supportContainer}>
      <ContactForm />
    </div>
  );
};

export default SupportPage;
