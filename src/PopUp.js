import React from "react";

const bgStyle = {
  width: "100%",
  height: "100%",

  position: "fixed",
  left: "0px",
  top: "0px",
  zIndex: "300",

  backdropFilter: "blur(3px)",
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
  height: "30%",
  background: "linear-gradient(180deg, rgba(0, 0, 0, .6) 0%, rgba(0, 0, 0, .9) 100%)",
  boxShadow: "0px 4px 9.4px 0.6px rgba(0, 0, 0, 0.33)",
  boxSizing: "border-box",
};
const textContainerStyle = {
  width: "100%",
  height: "77%",
  color: "white",
  fontSize: "1.3em",
  padding: "20px",
};
const buttonContainer = {
  width: "100%",
  height: "23%",
  boxSizing: "border-box",
};
const buttonStyle = {
  color: "white",
  fontSize: "1.2em",
  border: "gray 1px solid",
  width: "50%",
  height: "100%",
  background: "transparent",
  cursor: "pointer",

  ":hover": {
    background: "white",
  },
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
          <div style={textContainerStyle}>{popUpMessage}</div>
          <div style={buttonContainer}>
            <button style={buttonStyle} onClick={handleBackPopUpPress}>
              CANCEL
            </button>
            <button style={buttonStyle} onClick={handleContinuePopUpPress}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
