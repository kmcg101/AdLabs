import React from "react";
import Select from "react-select";
import './App.css'




function SelectBox(props) {

  const styles = {

    control: (provided, state) => ({
      ...provided,
      color: "white",
      height: "28px",
      background: "linear-gradient(90deg, rgba(0,0,0,.6) 100%, rgba(0,0,0,.2) 0%)",
      border: "none",
      borderRadius: "0px",
      border: 0,
      boxShadow: 'none'

    }),

    option: (provided, state) => ({
      ...provided,
      fontSize: "15px",
      color: "white",
      "&:hover": {
        background: "#009bdb"
      }
    }),
    singleValue: (provided, state) => ({
      ...provided,

      "&:hover": {
        background: "black"
      }
    }),

    input: (provided, state) => ({
      ...provided,
      height: "30px",
      color: "white",
      background: "black"

    }),

    menu: (provided, state) => ({
      ...provided,
      background: "linear-gradient(90deg, rgba(0,0,0,.6) 100%, rgba(0,0,0,.2) 0%)",
      marginTop: "-10px",
      marginBottom: 0,

    }),

    menuList: (provided, state) => ({
      ...provided,
      marginTop: 0,
      marginBottom: 0,
      backdropFilter: "blur(3px)"

    }),

    container: (provided, state) => ({
      ...provided,
      width: "275px",
      height: "47px"
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "white"
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white"
    }),



  };

  return (
    <div id={props.varID}>
      <label className='titleText'>{props.label}</label>
      <Select
        styles={styles}
        placeholder="select..."
        name={props.varID}
        options={props.options}
        isSearchable={false}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'rgba(0,0,0,0)',
            
          },
        })}
      ></Select>
    </div>
  );
}

export default SelectBox;
