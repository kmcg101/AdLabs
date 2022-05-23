import React from "react";
import SelectBox from "./SelectBox";
import TextBox from "./TextBox";
import DATA_PRODUCTS from "./DATA_PRODUCTS";
import DATA_DURATION from "./DATA_DURATION";
import DATA_COUNTRY_CODE from "./DATA_COUNTRY_CODE";
import DATA_MEDAI_TYPE from "./DATA_MEDIA_TYPE";

const Inputs = (props) => {
   
    let DATA_PRODUCTS_ARRAY = DATA_PRODUCTS.data;
    let DATA_DURATION_ARRAY = DATA_DURATION.data;
    let DATA_COUNTRY_CODE_ARRAY = DATA_COUNTRY_CODE.data;
    let DATA_MEDIA_TYPE_ARRAY = DATA_MEDAI_TYPE.data;

    const MEDIA_TYPE_FILTER_PLUS_isEnabled = props.productIndex !== undefined ? DATA_MEDIA_TYPE_ARRAY.map(item => {
        const container = {};
        container.keyindex = item.keyindex;
        container.value = item.value;
        container.label = item.label;
       
        if(DATA_PRODUCTS_ARRAY[props.productIndex].allowImage && item.value === 'image'){
            container.isDisabled = false;
        }
        else if(DATA_PRODUCTS_ARRAY[props.productIndex].allowVideo && item.value === 'video'){
            container.isDisabled = false;
        }
        else{
            container.isDisabled = true;
        }
        return container;
    }) : []

    const handleAnyInputsChange = (name, value) => {
        props.handleAnyInputsChange(name, value);
    };
    return (
        <div >
            
            <TextBox
                value={props.inputValues.client}
                className="clientName"
                label="Client:"
                validid="clientIsValid"
                varID="client"
                onTextChange={handleAnyInputsChange}
            />
            <TextBox
                value={props.inputValues.campaign}
                className="campaignName"
                label="campaign:"
                validid="campaignIsValid"
                varID="campaign"
                onTextChange={handleAnyInputsChange}
            />
            {/* // you want the source of the select box to be a function
// that function gets a parameter which is the value of the product
// the function does a filter which only returns the elements that
// contain the name of the product in their 'isEnabled' value */}

            <SelectBox
                options={DATA_PRODUCTS_ARRAY}
                label="Product:"
                varID="product"
                onSelectOption={handleAnyInputsChange}
                
            />
            
            <SelectBox
                options={DATA_COUNTRY_CODE_ARRAY}
                label="Country:"
                varID="countryCode"
                onSelectOption={handleAnyInputsChange}
            />
            <SelectBox
                options={MEDIA_TYPE_FILTER_PLUS_isEnabled}
                label="Media:"
                varID="mediaType"
                onSelectOption={handleAnyInputsChange}
            />
            <SelectBox
                options={DATA_DURATION_ARRAY}
                label="Duration:"
                varID="duration"
                onSelectOption={handleAnyInputsChange}
            /> 
            
        </div>
    );
};

export default Inputs;
