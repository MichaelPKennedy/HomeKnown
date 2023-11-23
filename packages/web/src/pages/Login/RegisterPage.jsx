import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import styles from "./LoginPage.module.css";
import client from "../../feathersClient.js";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await client
        .service("users")
        .create({ username, primary_email: email, password });

      toast.success("You are now registered!");
      window.location.href = "/";
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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
