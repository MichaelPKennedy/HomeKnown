import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import styles from "./LoginPage.module.css";
import client from "../../feathersClient.js";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must include a number.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must include a lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must include an uppercase letter.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must include a special character.");
    }

    return errors.length === 0 ? true : errors;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult !== true) {
      passwordValidationResult.forEach((error) => toast.error(error));
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the terms of service and privacy policy.");
      return;
    }

    try {
      await client
        .service("users")
        .create({ username, primary_email: email, password });
      localStorage.setItem("showRegisterSuccessToast", "true");
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <h4 className={styles.title}>Register</h4>
      <Card className={styles.card}>
        <Card.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="mt-2">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-muted">
                Passwords must be at least 8 characters and include a number, an
                uppercase letter, a lowercase letter, and a special character.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label className="mt-2">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                className="mt-3"
                type="checkbox"
                label={
                  <span>
                    I agree to the{" "}
                    <Link to="/terms-of-service">Terms of Service</Link> and{" "}
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </span>
                }
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className={styles.submitButton}
            >
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterPage;
