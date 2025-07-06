import React from "react";
import styles from "./GoogleLoginButton.module.css";

const GOOGLE_OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
  import.meta.env.VITE_GOOGLE_CLIENT_ID
}&redirect_uri=${
  import.meta.env.VITE_GOOGLE_CALLBACK_URL
}&response_type=code&scope=profile email openid&access_type=offline&prompt=consent`;

const handleGoogleLogin = () => {
  window.location.href = GOOGLE_OAUTH_URL;
};

const GoogleLoginButton = () => (
  <button className={styles.googleButton} onClick={handleGoogleLogin}>
    <img
      src="/assets/google-logo.png"
      alt="Google logo"
      className={styles.googleLogo}
    />
    Sign in with Google
  </button>
);

export default GoogleLoginButton;
