import React from "react";
import "./PopUp.css";

const bgStyle = {
  width: "100%",
  height: "100%",

  position: "fixed",
  left: "0px",
  top: "0px",
  zIndex: "300",
  backdropFilter: "blur(7px)",
};
const bgBlurStyle = {
  width: "100%",
  height: "100%",
  position: "relative",
  background: "rgba(255,255,255,.01)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const windowStyle = {
  position: "relative",
  width: "30%",
  height: "25%",
  background: "linear-gradient(180deg, rgba(0, 0, 0, .6) 0%, rgba(0, 0, 0, .9) 100%)",
  boxShadow: "0px 4px 9.4px 0.6px rgba(0, 0, 0, 0.33)",
  boxSizing: "border-box",
};
const textContainerStyle = {
  width: "100%",
  height: "77%",
  color: "white",
  padding: "30px",
  userSelect: "none",
};

const warningTitle = {
  fontSize: "1.8em",
  fontFamily: "Avenir-Heavy",
  textAlign: "center",
};

const warningText = {
  fontSize: "1.4em",
  marginTop: "14px",
  textAlign: "center",
};

const buttonContainer = {
  width: "100%",
  height: "23%",
  boxSizing: "border-box",
};

const PopUp = (props) => {
  const popUpMessage = props.popUpMessage;
  const handleBackPopUpPress = () => {
    props.handleBackPopUpPress();
  };
  const handleContinuePopUpPress = () => {
    props.handleContinuePopUpPress();
  };
  return (
    <div style={bgStyle}>
      <div style={bgBlurStyle}>
        <div style={windowStyle}>
          <div style={textContainerStyle}>
            <div style={warningTitle}>Please Verify</div>
            <div style={warningText}>{popUpMessage}</div>
          </div>
          <div className="buttonContainer" style={buttonContainer}>
            <button id="buttonLeft" className="buttonStyle" onClick={handleBackPopUpPress}>
              CANCEL
            </button>
            <button className="buttonStyle" onClick={handleContinuePopUpPress}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
