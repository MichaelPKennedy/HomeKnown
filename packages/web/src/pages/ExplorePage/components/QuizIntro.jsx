import React from "react";
import logo from "../../../assets/light-logo.png";
import styles from "./QuizIntro.module.css";

export default function QuizIntro({ onStartQuiz }) {
  return (
    <div className={styles.quizIntroContainer}>
      {/* Background Pattern */}
      <div className={styles.backgroundPattern}>
        <div className={styles.backgroundCircle1}></div>
        <div className={styles.backgroundCircle2}></div>
        <div className={styles.backgroundCircle3}></div>
      </div>

      <div className={styles.mainContent}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img
            src={logo}
            alt="HomeKnown"
            className={styles.logo}
            style={{ height: "60px", width: "auto" }}
          />
        </div>

        {/* Main Content */}
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>Find the Perfect Place to Live</h1>

          <p className={styles.description}>
            Take a short quiz to get matched with U.S. cities and towns that fit
            your lifestyle, priorities, and budget.
          </p>

          {/* CTA Button */}
          <button onClick={onStartQuiz} className={styles.ctaButton}>
            Start the Quiz
          </button>
        </div>

        {/* Benefits Section */}
        <div className={styles.benefitsContainer}>
          <div className={styles.benefitCard}>
            <div className={`${styles.iconContainer} ${styles.blue}`}>
              <svg
                className={`${styles.icon} ${styles.blue}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Data-Driven</h3>
            <p className={styles.cardDescription}>
              Based on cost of living, crime, weather, and more
            </p>
          </div>
          <div className={styles.benefitCard}>
            <div className={`${styles.iconContainer} ${styles.green}`}>
              <svg
                className={`${styles.icon} ${styles.green}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>No Signup Required</h3>
            <p className={styles.cardDescription}>
              Get started immediately, no account needed
            </p>
          </div>
          <div className={styles.benefitCard}>
            <div className={`${styles.iconContainer} ${styles.purple}`}>
              <svg
                className={`${styles.icon} ${styles.purple}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Quick & Easy</h3>
            <p className={styles.cardDescription}>Finish in under 2 minutes</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={`${styles.iconContainer} ${styles.orange}`}>
              <svg
                className={`${styles.icon} ${styles.orange}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Personalized</h3>
            <p className={styles.cardDescription}>
              Matched to your preferences
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={styles.trustContainer}>
          <p className={styles.trustText}>
            Trusted by thousands of people finding their perfect home
          </p>
        </div>
      </div>
    </div>
  );
}
