import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        bottom: "40px",
        transform: "translate(-50%)",
        backgroundColor: "white",
        padding: "20px",
        border: "1px solid black",
        width: "80%",
      }}
    >
      <p>
        We use cookies to improve your experience on our site. By continuing to
        use our site, you accept our use of cookies.
      </p>

      <a href="/privacy-policy">Click to see our Privacy Policy</a>
      <button className="ml-4" onClick={handleAccept}>
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
