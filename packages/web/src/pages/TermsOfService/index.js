import React from "react";
import styles from "./TermsOfService.module.css";

const TermsOfService = () => {
  return (
    <div className={styles.termsOfServiceContainer}>
      <h1 className={styles.heading}>Terms of Service</h1>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Acceptance of Terms</h2>
        <p className={styles.paragraph}>
          By accessing our application, you agree to comply with these Terms of
          Service. If you do not agree with any part of the terms, you are
          prohibited from using the service.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Use of Data</h2>
        <p className={styles.paragraph}>
          The data provided by our application is sourced from publicly
          available government databases as well as third party sources. You are
          not permitted to download this data directly from our application.
          However, you are free to use the results of your searches for your own
          purposes.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>No Guarantee of Service</h2>
        <p className={styles.paragraph}>
          While we strive to keep the service up and running and the information
          accurate, we cannot guarantee the availability or accuracy of the data
          at all times. The application is provided on an "as is" and "as
          available" basis.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Restrictions of Use</h2>
        <p className={styles.paragraph}>
          You agree not to misuse the application or help anyone else do so. For
          example, you must not even try to do any of the following in
          connection with the application:
          <ul>
            <li>
              Probe, scan, or test the vulnerability of any system or network;
            </li>
            <li>
              Breach or otherwise circumvent any security or authentication
              measures;
            </li>
            <li>
              Access, tamper with, or use non-public areas or parts of the
              application;
            </li>
            <li>
              Interfere with or disrupt any user, host, or network, for example
              by sending a virus, overloading, flooding, spamming, or
              mail-bombing any part of the application;
            </li>
            <li>
              Access or search the application by any means other than our
              publicly supported interfaces (for example, "scraping").
            </li>
          </ul>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Changes to the Service and Terms</h2>
        <p className={styles.paragraph}>
          We reserve the right to modify the application and these Terms at any
          time, for example, to reflect changes to the law or changes to our
          application. We will notify you of any changes by posting them on the
          application or by sending
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subHeading}>Future Services</h2>
        <p className={styles.paragraph}>
          We may offer new services, including a paid version of the
          application, which may include more detailed results or additional
          searches beyond the free version's limits. Details of these services,
          including any charges, will be provided at the time they are offered.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Limitation of Liability</h2>
        <p className={styles.paragraph}>
          In no event will we be liable for any indirect, incidental, special,
          consequential, or punitive damages, including without limitation
          damages for loss of profits, data, use, goodwill, or other intangible
          losses resulting from (i) your access to or use of or inability to
          access or use the application; (ii) any conduct or content of any
          third party on the application; or (iii) unauthorized access, use, or
          alteration of your transmissions or content, whether based on
          warranty, contract, tort (including negligence) or any other legal
          theory, whether or not we have been informed of the possibility of
          such damage, and even if a remedy set forth herein is found to have
          failed of its essential purpose.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Governing Law</h2>
        <p className={styles.paragraph}>
          These Terms will be governed by and interpreted in accordance with the
          laws of the jurisdiction where you reside, without regard to its
          conflict of law provisions.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>Contact Information</h2>
        <p className={styles.paragraph}>
          If you have any questions about these Terms, please contact us at
          [kennedy01mike@gmail.com].
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
