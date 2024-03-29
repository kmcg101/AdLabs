import React, { useState } from "react";
import Select from "react-select";
import "./pages/inputs.css";

function SelectBox(props) {
  const inputsCheckButtonPressed = props.inputsCheckButtonPressed;

  const [isValueSelected, setIsValueSelected] = useState(false);

  const styles = {
    control: (provided, state) => ({
      ...provided,

      color: "white",
      height: "28px",
      background: "linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,.6) 100%)",

      borderRadius: "0px",

      // need to create a tr ue false to make this work
      border: inputsCheckButtonPressed && isValueSelected === false ? 0 : "1px",
      // border: inputsCheckButtonPressed && isValueSelected === false ? "1px red solid" : "none",
      boxShadow: inputsCheckButtonPressed && isValueSelected === false ? "0px 0px 8px 1px #0ff" : "none",
    }),

    option: (provided, state) => ({
      ...provided,
      fontSize: "1.0rem",
      color: "white",
      "&:hover": {
        background: "rgba(0,155,219,.5)",
      },
    }),

    input: (provided, state) => ({
      ...provided,
      height: "30px",
      color: "white",
      background: "black",
    }),

    menu: (provided, state) => ({
      ...provided,
      background: "linear-gradient(180deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,.60) 100%)",
      marginTop: "-10px",
      marginBottom: 0,
    }),

    menuList: (provided, state) => ({
      ...provided,
      marginTop: 0,
      marginBottom: 0,
      backdropFilter: "blur(3px)",
    }),

    container: (provided, state) => ({
      ...provided,
      width: "275px",
      height: "47px",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "white",
    }),

    singleValue: (provided, state) => ({
      ...provided,

      color: "white",
    }),
  };

  const handleAnyInputsChange = (e, action) => {
    setIsValueSelected(true);
    props.handleAnyInputsChange(action.name, e.value);
  };
  return (
    <div id={props.varID}>
      <label className="titleText">{props.label}</label>

      <Select
        className={`${inputsCheckButtonPressed && isValueSelected === false ? "textInputErrorShake" : ""}`}
        styles={styles}
        placeholder="select..."
        //value={props.value}
        name={props.varID}
        options={props.options}
        onChange={handleAnyInputsChange}
        isSearchable={false}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "rgba(0,0,0,0)",
          },
        })}
      ></Select>
    </div>
  );
}

export default SelectBox;
