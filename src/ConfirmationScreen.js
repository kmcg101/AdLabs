import React, { useState, useEffect } from "react";

import Confetti from "react-dom-confetti";
import "./confetti.css";

const ConfirmationScreen = (props) => {
  const [confettiOn, setConfettiOn] = useState(false);

  const fullScreenBG = {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, .6)",
    color: "white",
    backdropFilter: "blur(10px)",
    fontFamily: "Avenir-Heavy",
  };

  const successMessage = {
    fontSize: "22px",
  };

  const downloadStartedMessage = {
    fontSize: "16px",
    borderRadius: "1px",
    backgroundImage:
      "linear-gradient( 180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)",
    boxShadow: "0px 4px 9.4px 0.6px rgba(0, 0, 0, 0.33)",
    width: "231px",
    height: "72px",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };
  const config = {
    angle: "142",
    spread: "360",
    startVelocity: "58",
    elementCount: "113",
    dragFriction: "0.15",
    duration: "8270",
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "590px",
    colors: ["#f00", "#0f0", "#00f"],
  };
  const confettiStyle = {
    position: "absolute",
    left: "100px",
    top: "100px",
  };

  useEffect(() => {
    setTimeout(function() {
      setConfettiOn(true);
    }, 300);
  }, []);

  return (
    <div style={fullScreenBG} className="fullScreenBG">
      <Confetti
        style={confettiStyle}
        className="confetti"
        active={confettiOn}
        config={config}
      />

      <div style={successMessage} className="successMessage">
        SUCCESS
      </div>
      <div style={downloadStartedMessage} className="downloadStartedMessage">
        YOUR DOWNLOAD HAS STARTED
      </div>
    </div>
  );
};

export default ConfirmationScreen;
