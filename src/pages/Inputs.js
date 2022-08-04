import React, { useState } from "react";
import SelectBox from "../SelectBox";
import TextBox from "../TextBox";
import DATA_PRODUCTS from "../DATA_PRODUCTS";
import DATA_DURATION from "../DATA_DURATION";
import DATA_COUNTRY_CODE from "../DATA_COUNTRY_CODE";
import DATA_PLATFORM from "../DATA_PLATFORM";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((AppTheme) => ({
  textInputStyle: {
    border: "none",
    background: "linear-gradient(180deg, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, .6) 100%)",
    display: "block",
    // this is the helper text color
    "& .Mui-error": {
      color: "#cc0000",
    },
  },
}));

const Inputs = (props, { inputsCheckButtonPressed, inputsCheckButtonPressedOnce, inputValues }) => {
  let DATA_PRODUCTS_ARRAY = DATA_PRODUCTS.data;
  let DATA_DURATION_ARRAY = DATA_DURATION.data;
  let DATA_COUNTRY_CODE_ARRAY = DATA_COUNTRY_CODE.data;
  let DATA_PLATFORM_ARRAY = DATA_PLATFORM.data;

  const [clientError, setClientError] = useState(true);
  const [campaignError, setCampaignError] = useState(false);

  const handleAnyInputsChange = (name, value) => {
    // for mui textfield
    //props.handleAnyInputsChange(e.target.name, e.target.value);

    // for my textfields
    props.handleAnyInputsChange(name, value);
  };

  const classes = useStyles();

  return (
    <div>
      <div className="inputsFullPage">
        <div className="inputsLeftColumn">
          <TextBox
            value={props.inputValues.client}
            label="CLIENT NAME: v4.10"
            varID="client"
            handleAnyInputsChange={handleAnyInputsChange}
            inputsCheckButtonPressed={inputsCheckButtonPressed}
            inputsCheckButtonPressedOnce={inputsCheckButtonPressedOnce}
          />
          <TextBox
            value={props.inputValues.campaign}
            label="DESCRIPTOR:"
            varID="campaign"
            handleAnyInputsChange={handleAnyInputsChange}
            inputsCheckButtonPressed={inputsCheckButtonPressed}
            inputsCheckButtonPressedOnce={inputsCheckButtonPressedOnce}
          />

          <SelectBox
            value={props.inputValues.platform}
            isError={false}
            options={DATA_PLATFORM_ARRAY}
            label="NETWORK:"
            varID="platform"
            handleAnyInputsChange={handleAnyInputsChange}
            inputsCheckButtonPressed={inputsCheckButtonPressed}
          />
        </div>

        <div className="inputsRightColumn">
          <SelectBox
            value={props.inputValues.duration}
            isError={false}
            options={DATA_DURATION_ARRAY}
            label="DURATION:"
            varID="duration"
            handleAnyInputsChange={handleAnyInputsChange}
            inputsCheckButtonPressed={inputsCheckButtonPressed}
          />
          <SelectBox
            value={props.inputValues.countryCode}
            isError={false}
            options={DATA_COUNTRY_CODE_ARRAY}
            label="COUNTRY/LANGUAGE:"
            varID="countryCode"
            handleAnyInputsChange={handleAnyInputsChange}
            inputsCheckButtonPressed={inputsCheckButtonPressed}
          />
          <SelectBox
            value={props.inputValues.product}
            isError={false}
            options={DATA_PRODUCTS_ARRAY}
            label="PRODUCT:"
            varID="product"
            handleAnyInputsChange={handleAnyInputsChange}
            inputsCheckButtonPressed={inputsCheckButtonPressed}
          />
        </div>
      </div>
    </div>
  );
};

export default Inputs;
