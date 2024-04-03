import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import client from "../../../feathersClient";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await client.service("forgot-password").find({ query: { email } });
      toast.success(
        "If an account exists for this email, a reset email has been sent."
      );
      navigate("/login");
    } catch (error) {
      toast.error("Error sending reset email. Please try again.");
      console.error("Forgot password error:", error);
    }
  };

  return (
    <div className="forgot-password-page">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          <Form onSubmit={handleForgotPassword}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword;
