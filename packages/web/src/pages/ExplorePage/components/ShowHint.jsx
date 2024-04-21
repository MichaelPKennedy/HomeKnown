import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HintPopup = () => {
  const isMobile = window.innerWidth < 768;
  const hintMessage = isMobile
    ? "Click inside a category to add a token. Swipe left on a category to remove a token. Add more tokens to the categories you care about most!"
    : "Click inside a category to add a token or simply drag and drop tokens to different categories. Add more tokens to the categories you care about most!";

  const displayHint = () => {
    toast(hintMessage, {
      position: "top-center",
      autoClose: false,
      closeOnClick: true,
      closeButton: true,
      draggable: false,
      zIndex: 9999,
      toastId: "FormWeightsHint",
    });
  };

  if (isMobile) {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 9000,
          }}
        >
          <button
            onClick={displayHint}
            style={{
              background: "#f0f0f0",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <span style={{ fontSize: "18px", color: "#333" }}>?</span>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "32px",
          right: "200px",
          zIndex: 9000,
        }}
      >
        <button
          onClick={displayHint}
          style={{
            background: "#f0f0f0",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <span style={{ fontSize: "22px", color: "#333" }}>?</span>
        </button>
      </div>
    </div>
  );
};

export default HintPopup;
