import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import feathersClient from "../../../feathersClient";

const PasswordReset = () => {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const [tokenVerified, setTokenVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetStatus, setResetStatus] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token) {
      setVerificationStatus("Verification token is missing.");
      return;
    }

    async function verifyToken() {
      try {
        const response = await feathersClient
          .service("forgot-password")
          .get(token);
        if (response.verified) {
          setVerificationStatus(
            "Token verified. Please enter your new password."
          );
          setTokenVerified(true);
        } else {
          setVerificationStatus(
            response.message || "Token is invalid or expired"
          );
        }
      } catch (error) {
        console.error("Failed to verify forgot password token", error);
        setVerificationStatus(error.message || "Token is invalid or expired");
      }
    }

    verifyToken();
  }, [location.search, navigate]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await feathersClient.service("forgot-password").create({
        token: new URLSearchParams(location.search).get("token"),
        newPassword: newPassword,
      });
      if (response.success) {
        setResetStatus("Your password has been reset successfully.");
        navigate("/login");
      } else {
        setResetStatus(
          response.message || "Failed to reset password. Please try again."
        );
      }
    } catch (error) {
      console.error("Failed to reset password", error);
      setResetStatus(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <p>{verificationStatus}</p>
      {tokenVerified && (
        <form onSubmit={handleSubmit}>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </label>
          <button type="submit">Reset Password</button>
        </form>
      )}
      {resetStatus && <p>{resetStatus}</p>}
    </div>
  );
};

export default PasswordReset;
