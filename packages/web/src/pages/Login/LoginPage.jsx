import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import styles from "./LoginPage.module.css";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  if (localStorage.getItem("authToken")) {
    window.location.href = "/";
    return null;
  }

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL
      : "http://localhost:3030/";

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        localStorage.setItem("authToken", accessToken);
        toast.success("Login successful");
        window.location.href = "/";
      } else {
        toast.error("Incorrect Username or Password");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <h4 className={styles.title}>Login</h4>
      <Card className={styles.card}>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                placeholder="Enter username or email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
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
              onSubmit={handleLogin}
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
              href="/register"
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
