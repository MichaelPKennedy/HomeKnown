import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./ExplorePage.module.css";
import LivingPreferenceForm from "./components/LivingPreferenceForm.jsx";
import QuizIntro from "./components/QuizIntro.jsx";
import { AuthContext } from "../../AuthContext";

const ExplorePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showIntro, setShowIntro] = useState(!isLoggedIn);

  const handleStartQuiz = () => {
    setShowIntro(false);
  };

  const getCanonicalUrl = () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.toString();
  };

  return (
    <div className={styles.explorePageContainer}>
      <Helmet>
        <title>HomeKnown | Explore</title>
        <meta
          name="description"
          content="Welcome to HomeKnown, your go-to platform for discovering amazing cities."
        />
        <link rel="canonical" href={getCanonicalUrl()} />
      </Helmet>
      {!isLoggedIn && showIntro ? (
        <QuizIntro onStartQuiz={handleStartQuiz} />
      ) : (
        <LivingPreferenceForm />
      )}
    </div>
  );
};

export default ExplorePage;
