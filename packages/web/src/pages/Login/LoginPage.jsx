import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import styles from "./LoginPage.module.css";
import { toast } from "react-toastify";
import client from "../../feathersClient.js";
import queryString from "query-string";
import GoogleLoginButton from "../../components/GoogleLoginButton";

import { AuthContext } from "../../AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("showRegisterSuccessToast") === "true") {
      toast.success("You are now registered. Please log in to continue.");
      localStorage.removeItem("showRegisterSuccessToast");
    }
    const { access_token, user_id } = queryString.parse(window.location.search);
    if (access_token && user_id) {
      googleLogin(access_token, user_id);
      navigate("/");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await client.service("/authentication").create({
        strategy: "local",
        login: loginField,
        password: password,
      });
      if (response.accessToken && response.users) {
        login(response.accessToken, response.users);
        window.location.href = "/";
      } else {
        toast.error("Incorrect Username or Password");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const getCanonicalUrl = () => {
    return window.location.href;
  };

  return (
    <div className={styles.loginPageContainer}>
      <Helmet>
        <title>HomeKnown | Explore</title>
        <meta
          name="description"
          content="Welcome to HomeKnown, your go-to platform for discovering amazing cities."
        />
        <link rel="canonical" href={getCanonicalUrl()} />
      </Helmet>
      <h4 className={styles.title}>Login</h4>
      <Card className={styles.card}>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                placeholder="Enter username or email"
                value={loginField}
                onChange={(e) => setLoginField(e.target.value)}
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
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => navigate("/forgot-password")}
              className={styles.forgotPasswordButton}
            >
              Forgot Password?
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Card className={styles.card}>
        <Card.Body>
          <GoogleLoginButton />
          <p className={`mt-2 mb-0 ${styles.termsOfService}`}>
            By signing in with Google, you agree to our{" "}
            <a href="/terms-of-service"> Terms of Service</a> and
            <a href="/privacy-policy"> Privacy Policy.</a>
          </p>
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
