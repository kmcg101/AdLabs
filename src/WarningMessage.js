import React, { useState } from "react";
import DATA_PRODUCTS from "./DATA_PRODUCTS";

const messageFormat = {
  fontSize: "1.4em",
  color: "red",
  fontFamily: "Avenir-Heavy",
  position: "absolute",
  top: "110px",
};

function WarningMessage(props) {
  const warningMessageText = props.warningMessageText;
  return <div style={messageFormat}>{warningMessageText}</div>;
}
export default WarningMessage;
