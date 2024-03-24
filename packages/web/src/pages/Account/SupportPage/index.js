import React, { useContext } from "react";
import styles from "./SupportPage.module.css";
import ContactForm from "../components/ContactForm";
import PleaseLogin from "../components/PleaseLogin";
import { AuthContext } from "../../../AuthContext";

const SupportPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className={styles.supportContainer}>
      {isLoggedIn ? <ContactForm /> : <PleaseLogin />}
    </div>
  );
};

export default SupportPage;
