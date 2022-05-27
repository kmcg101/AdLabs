import React from "react";
import SelectBox from "./SelectBox";
import TextBox from "./TextBox";
import DATA_PRODUCTS from "./DATA_PRODUCTS";
import DATA_DURATION from "./DATA_DURATION";
import DATA_COUNTRY_CODE from "./DATA_COUNTRY_CODE";
import DATA_PLATFORM from "./DATA_PLATFORM";

const Inputs = (props) => {

    let DATA_PRODUCTS_ARRAY = DATA_PRODUCTS.data;
    let DATA_DURATION_ARRAY = DATA_DURATION.data;
    let DATA_COUNTRY_CODE_ARRAY = DATA_COUNTRY_CODE.data;
    let DATA_PLATFORM_ARRAY = DATA_PLATFORM.data;

    const inputsCheckButtonPressed = props.inputsCheckButtonPressed;
    const inputValues = props.inputValues;

   

    const handleAnyInputsChange = (name, value) => {
        props.handleAnyInputsChange(name, value);
    };
    return (
        <div>
            <div className='inputsFullPage'>
                <div className='inputsLeftColumn'>

                    <TextBox 
                        isError={false}
                        value={props.inputValues.client}
                        label="CLIENT NAME: v1.6"
                        varID="client"
                        handleAnyInputsChange={handleAnyInputsChange}
                        inputsCheckButtonPressed = {inputsCheckButtonPressed}
                    />
                    <TextBox  
                        isError={false}
                        value={props.inputValues.campaign}
                        label="DESCRIPTION:"
                        varID="campaign"
                        handleAnyInputsChange={handleAnyInputsChange}
                        inputsCheckButtonPressed = {inputsCheckButtonPressed}
                    />

                    <SelectBox
                        isError={false}
                        options={DATA_PRODUCTS_ARRAY}
                        label="PRODUCT:"
                        varID="product"
                        handleAnyInputsChange={handleAnyInputsChange}
                        inputsCheckButtonPressed = {inputsCheckButtonPressed}

                    />
                </div>

                <div className='inputsRightColumn'>
                <SelectBox
                        isError={false}
                        options={DATA_DURATION_ARRAY}
                        label="DURATION:"
                        varID="duration"
                        handleAnyInputsChange={handleAnyInputsChange}
                        inputsCheckButtonPressed = {inputsCheckButtonPressed}
                    />
                    <SelectBox
                        isError={false}
                        options={DATA_COUNTRY_CODE_ARRAY}
                        label="COUNTRY:"
                        varID="countryCode"
                        handleAnyInputsChange={handleAnyInputsChange}
                        inputsCheckButtonPressed = {inputsCheckButtonPressed}
                    />
                    <SelectBox
                        isError={false}
                        options={DATA_PLATFORM_ARRAY}
                        label="PLATFORM:"
                        varID="platform"
                        handleAnyInputsChange={handleAnyInputsChange}
                        inputsCheckButtonPressed = {inputsCheckButtonPressed}
                    />
                   
                </div>

            </div>
        </div>

    );
};

export default Inputs;
