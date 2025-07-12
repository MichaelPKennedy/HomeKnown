import React, { useContext } from "react";
import styles from "./SupportPage.module.css";
import ContactForm from "../components/ContactForm";
import PleaseLogin from "../components/PleaseLogin";
import { AuthContext } from "../../../AuthContext";
import { Helmet } from "react-helmet";

const SupportPage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const getCanonicalUrl = () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.toString();
  };

  return (
    <>
      <Helmet>
        <title>HomeKnown | Support</title>
        <meta name="description" content="Contact HomeKnown support." />
        <link rel="canonical" href={getCanonicalUrl()} />
      </Helmet>
      {isLoggedIn ? (
        <div className={styles.supportContainer}>
          <ContactForm />
        </div>
      ) : (
        <PleaseLogin />
      )}
    </>
  );
};

export default SupportPage;
