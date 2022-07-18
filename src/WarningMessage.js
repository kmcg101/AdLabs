import React, { useState, useEffect } from "react";
import DATA_PRODUCTS from "./DATA_PRODUCTS";
import XIcon from "./assets/icon_x.svg";
import "./WarningMessage.css";

const messageFormat = {
  fontSize: "1.4em",
  // color: "white",
  fontFamily: "Avenir-Roman",
  fontStyle: "italic",
  position: "absolute",
  top: "572px",
  display: "flex",
  alignItems: "center",
};
const iconX = {
  marginRight: "5px",
  width: "25px",
  height: "25px",
};

function WarningMessage(props) {
  //const [warningMessageText, setWarningMessageText] = useState(props.warningMessageText);
  const warningMessageText = props.warningMessageText;
  const warningMessageTextShowIcon = props.warningMessageTextShowIcon;
  console.log("show icon = ", warningMessageTextShowIcon);

  return (
    <div className="warningMessage" style={messageFormat}>
      {warningMessageText === "" ? null : warningMessageTextShowIcon === false ? null : (
        <img style={iconX} src={XIcon} alt="back"></img>
      )}
      {warningMessageText}
    </div>
  );
}
export default WarningMessage;
