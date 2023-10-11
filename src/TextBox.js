import React, { useState } from "react";

import "./pages/inputs.css";

function TextBox(props) {
  const [valueIsValid, setValueIsValid] = useState(false);
  const [allGoodCharacters, setAllGoodCharacters] = useState(true);

  function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9-]*$/.test(str);
  }

  const handleAnyInputsChange = (e) => {
    const testResult = onlyLettersAndNumbers(e.target.value);
    // true if all good characters
    setAllGoodCharacters(testResult);

    const name = e.target.name;
    const value = e.target.value;
    props.handleAnyInputsChange(name, value);

    // check if value is empty
    if (value === "") {
      setValueIsValid(false);
    } else {
      setValueIsValid(true);
    }
  };
  const inputsCheckButtonPressed = props.inputsCheckButtonPressed;
  const inputsCheckButtonPressedOnce = props.inputsCheckButtonPressedOnce;

  const textInputErrorText = {
    position: "absolute",
    left: "211px",
    top: "62px",
    zIndex: 100,
    fontSize: "15px",
    color: "white",
    fontStyle: "italic",
  };
  const textBoxInner = {
    position: "relative",
  };

  return (
    <div className="textBox">
      <div style={textBoxInner} className="textBoxInner">
        <label className="titleText">{props.label}</label>
        <div className="">
          {/* <input className={`standardText ${inputsCheckButtonPressed && valueIsValid === false ? "textInputErrorShake" : inputsCheckButtonPressedOnce && valueIsValid === false ?  "textInputErrorOutline" : allGoodCharacters ? "" : "textInputErrorOutline"}` */}
          <input
            className={`standardText ${inputsCheckButtonPressed && allGoodCharacters === false ? "textInputErrorShake" : ""} ${inputsCheckButtonPressed && valueIsValid === false ? "textInputErrorShake" : ""} ${inputsCheckButtonPressedOnce && valueIsValid === false ? "textInputErrorOutline" : ""} ${
              allGoodCharacters === false ? "textInputErrorOutline" : ""
            } `}
            type="text"
            autoComplete="on"
            name={props.varID}
            value={props.value}
            onChange={handleAnyInputsChange}
          ></input>
        </div>
        {allGoodCharacters ? null : <div style={textInputErrorText}>numbers, letters, hyphens</div>}
      </div>
    </div>
  );
}

export default TextBox;
