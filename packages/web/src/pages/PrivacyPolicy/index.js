import React from "react";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyPolicyContainer}>
      <h1 className={styles.heading}>Privacy Policy</h1>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Information We Collect</h2>
        <ol className={styles.orderedList}>
          <li>
            <strong>Information You Provide</strong>
            <ul className={styles.unorderedList}>
              <li>
                Account Information: When you sign up using Google login, we
                receive your Google profile information, including your name and
                email address.
              </li>
              <li>
                User Content: Any information or content you provide within the
                application.
              </li>
            </ul>
          </li>
          <li>
            <strong>Information Collected Automatically</strong>
            <ul className={styles.unorderedList}>
              <li>
                Usage Information: Details of your interactions with our app,
                including traffic data, location data, logs, and other
                communication data.
              </li>
              <li>
                Device Information: Information about your mobile device,
                including the hardware model, operating system, unique device
                identifiers, and mobile network information.
              </li>
            </ul>
          </li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>How We Use Your Information</h2>
        <ul className={styles.unorderedList}>
          <li>
            We use the information we collect to provide, maintain, and improve
            our services.
          </li>
          <li>Develop new products and features.</li>
          <li>Personalize your experience.</li>
          <li>
            Communicate with you, including sending notices, updates, security
            alerts, and support messages.
          </li>
          <li>
            Sell or share with third parties, including those in the real estate
            industry, for their marketing or analytics purposes.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Sharing of Information</h2>
        <ul className={styles.unorderedList}>
          <li>
            With your consent, including information such as location data, to
            third parties like real estate companies for their use in marketing
            and analytics.
          </li>
          <li>
            With vendors, consultants, and other service providers who need
            access to such information to carry out work on our behalf.
          </li>
          <li>
            In connection with, or during negotiations of, any merger, sale of
            company assets, financing, or acquisition of all or a portion of our
            business by another company.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Your Choices and Opt-Outs</h2>
        <p className={styles.paragraph}>
          Users can opt out of certain data uses, such as the selling or sharing
          of their data with third parties for marketing purposes.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Security</h2>
        <p className={styles.paragraph}>
          We implement appropriate technical and organizational measures to
          protect the security of your personal information.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Your Rights</h2>
        <ul className={styles.unorderedList}>
          <li>
            You may have certain rights under applicable law, including the
            right to access, correct, delete, or transfer your personal data.
          </li>
          <li>And to opt-out of the sale of your personal data.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Changes to the Privacy Policy</h2>
        <p className={styles.paragraph}>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new privacy policy on this page.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Contact Us</h2>
        <p className={styles.paragraph}>
          If you have any questions about this privacy policy, please contact us
          at: [kennedy01mike@gmail.com].
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
