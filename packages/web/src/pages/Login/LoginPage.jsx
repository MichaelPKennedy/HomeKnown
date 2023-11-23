import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import styles from "./LoginPage.module.css"; // Import your custom CSS module

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(email, password);
  };

  return (
    <div className={styles.loginPageContainer}>
      <h4 className={styles.title}>Login</h4>
      <Card className={styles.card}>
        <Card.Body>
          <Form onSubmit={handleLogin}>
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

            <Button
              variant="primary"
              type="submit"
              className={styles.submitButton}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className={styles.card}>
        <Card.Body>
          <p className="mb-0">
            Don't have an account?{" "}
            <Button
              variant="primary"
              type="submit"
              className={styles.registerButton}
            >
              Sign Up
            </Button>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
