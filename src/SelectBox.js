import React from "react";
import Select from "react-select";

function SelectBox(props) {
  const handleSelectOptionChange = (e, action) => {
    props.onSelectOption(action.name, e.value);
  };

  return (
    <div className="selectBox" id={props.varID}>
      <label>{props.label}</label>
      <Select
        placeholder="Select..."
        name={props.varID}
        onChange={handleSelectOptionChange}
        //value={props.options[0]}
        //inputValue={props.product}
        options={props.options}
      ></Select>
    </div>
  );
}

export default SelectBox;
