import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import styles from "./LoginPage.module.css";
import { toast } from "react-toastify";
import client from "../../feathersClient.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("showRegisterSuccessToast") === "true") {
      toast.success("You are now registered. Please log in to continue.");
      localStorage.removeItem("showRegisterSuccessToast");
    }
  }, []);

  if (localStorage.getItem("authToken")) {
    navigate("/");
    return null;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await client.service("/authentication").create({
        strategy: "local",
        login: login,
        password: password,
      });
      console.log("response", response);

      if (response.accessToken) {
        const { accessToken } = response.authentication;
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("showLoginSuccessToast", "true");
        window.location.href = "/";
      } else {
        toast.error("Incorrect Username or Password");
      }
    } catch (error) {
      console.error("Authentication error:", error);
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
              <Form.Label className="mt-2">Password</Form.Label>
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
