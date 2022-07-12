import React, { useState } from "react";
import "./SelectBox.css";

function SelectBox(props) {
  const inputsCheckButtonPressed = props.inputsCheckButtonPressed;
  const inputValues = props.inputValues;

  const [isValueSelected, setIsValueSelected] = useState(false);

  const handleAnyInputsChange = (e, action) => {
    setIsValueSelected(true);
    props.handleAnyInputsChange(action.name, e.value);
  };
  return (
    <div id={props.varID}>
      <label className="titleText">{props.label}</label>

      <select
        className={`selectBox ${
          inputsCheckButtonPressed && isValueSelected === false
            ? "textInputErrorShake"
            : ""
        }`}
        value={props.value}
        name={props.varID}
        onChange={handleAnyInputsChange}
      >
        <option value="select..." disabled>
          Select...
        </option>
        <option className="item" value="0">
          elevator
        </option>
        <option className="item" value="0">
          elevator
        </option>
        <option className="item" value="0">
          elevator
        </option>
        <option className="item" value="0">
          elevator
        </option>
        <option className="item" value="0">
          elevator
        </option>
        <option className="item" value="0">
          elevator
        </option>
      </select>
    </div>
  );
}

export default SelectBox;
