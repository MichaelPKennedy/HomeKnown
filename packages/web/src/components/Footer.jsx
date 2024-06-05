import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container fluid className={styles.container}>
        <Row className={styles.row}>
          <Col className={styles.leftColumn}>
            <p>&copy; {new Date().getFullYear()} Everyday Adventurer, llc.</p>
            <p>
              <Link to="/terms-of-service" className={styles.footerLink}>
                Terms of Service
              </Link>{" "}
              |{" "}
              <Link to="/privacy-policy" className={styles.footerLink}>
                Privacy Policy
              </Link>
            </p>
          </Col>
          <Col className={styles.rightColumn}>
            <p>
              <Link to="/support" className={styles.footerLink}>
                Contact Support
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
