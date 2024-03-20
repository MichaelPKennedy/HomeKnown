import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import feathersClient from "../../feathersClient";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token) {
      setVerificationStatus("Verification token is missing.");
      return;
    }

    async function verifyEmail() {
      try {
        await feathersClient
          .service("email-verification")
          .patch(null, { token });

        setVerificationStatus(
          "Your email has been successfully verified! Redirecting..."
        );
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        console.error("Failed to verify email", error);
        setVerificationStatus(error.message || "Failed to verify email.");
      }
    }

    verifyEmail();
  }, [location.search, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default VerifyEmail;
