import React from "react";
import Button from "@material-ui/core/Button";
import { Switch, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import backButton from "./assets/backButtonSmall.png";

// try passing in the theme and referencing the theme as theme.palette.primary.main
const useStyles = makeStyles((AppTheme) => ({
  continueButton: {
    position: "relative",
    width: "21.5%",
    height: "27%",
    backgrounColor: "transparent",
    border: "2px white solid",
    borderRadius: "4px",
    color: "white",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0px 4px 9.4px 0.6px rgba(0, 0, 0, 0.33)",
    userSelect: "none",
    "&:hover": {
      border: "2px #009bdb solid",
    },
    zIndex: "100",
  },
  backButton: {
    position: "fixed",
    top: "40px",
    left: "40px",
    "&:hover": {
      opacity: ".5",
    },
    cursor: "pointer",
    // this controls the text color for some reason
    //color: AppTheme.palette.primary.main,
    //backgroundColor: AppTheme.palette.secondary.main,
  },
  colorPickerInput: {
    color: "white",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
  },
  colorPickerContainer: {
    width: "79px",
    height: "23px",
  },
}));

export const ContinueButton = ({ currentPageNumber, handleContinueButtonPressed, continueButtonDisabled }) => {
  const classes = useStyles();
  return (
    <Button disabled={continueButtonDisabled} onClick={handleContinueButtonPressed} className={classes.continueButton}>
      {currentPageNumber === 3 ? "CREATE AD FILES" : currentPageNumber === 4 ? "CREATE NEW AD" : "CONTINUE"}
    </Button>
  );
};
export const BackButton = (props) => {
  const handleBackButton = props.handleBackButton;
  const classes = useStyles();
  return (
    <div onClick={handleBackButton} className={classes.backButton}>
      <img src={backButton} alt="back"></img>
    </div>
  );
};

export const BlackWhiteToggleButton = (props) => {
  const classes = useStyles();
  const handleBlackWhiteToggleChange = () => {
    props.handleBlackWhiteToggleChange();
  };
  const handleNoImagesToggleChange = () => {
    props.handleNoImagesToggleChange();
  };

  const handleBINTColorChange = (e) => {
    props.handleBINTColorChange(e.target.value);
  };

  const bintBGColor = props.bintBGColor;

  return (
    <div className="bintColorPickerContainer">
      {/* toggle button for bint white/black text  */}
      <div className="bintColorPickerBG">
        <FormControlLabel className="bintColorPickerInner" control={<Switch onChange={handleBlackWhiteToggleChange} />} labelPlacement="start" size="small" label="TEXT" />
      </div>
      {/* bint bg color text input */}
      <div className={`bintColorPickerBG color ${classes.colorPickerContainer}`}>
        #<input className={classes.colorPickerInput} type="text" name="bintBgColor" value={bintBGColor} maxLength="6" onChange={handleBINTColorChange}></input>
      </div>
      {/* toggle button for bint image  */}
      <div className="bintColorPickerBG">
        <FormControlLabel className="bintColorPickerInner" control={<Switch onChange={handleNoImagesToggleChange} />} labelPlacement="start" size="small" label="Image?" />
      </div>
    </div>
  );
};
