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

        if (DATA_PRODUCTS_ARRAY[props.productIndex].allowImage && item.value === 'image') {
            container.isDisabled = false;
        }
        else if (DATA_PRODUCTS_ARRAY[props.productIndex].allowVideo && item.value === 'video') {
            container.isDisabled = false;
        }
        else {
            container.isDisabled = true;
        }
        return container;
    }) : []

    const handleAnyInputsChange = (name, value) => {
        props.handleAnyInputsChange(name, value);
    };
    return (
        <div>
            <div className='inputsFullPage'>
                <div className='inputsLeftColumn'>

                    <TextBox
                        value={props.inputValues.client}
                        label="CLIENT NAME:"
                        varID="client"
                    />
                    <TextBox
                        value={props.inputValues.campaign}
                        label="DESCRIPTION:"
                        varID="campaign"
                    />

                    <SelectBox
                        options={DATA_PRODUCTS_ARRAY}
                        label="PRODUCT:"
                        varID="product"

                    />
                </div>

                <div className='inputsRightColumn'>
                <SelectBox
                        options={DATA_DURATION_ARRAY}
                        label="DURATION:"
                        varID="duration"
                        onSelectOption={handleAnyInputsChange}
                    />
                    <SelectBox
                        options={DATA_COUNTRY_CODE_ARRAY}
                        label="COUNTRY:"
                        varID="countryCode"
                        onSelectOption={handleAnyInputsChange}
                    />
                    <SelectBox
                        options={MEDIA_TYPE_FILTER_PLUS_isEnabled}
                        label="PLATFORM:"
                        varID="mediaType"
                        onSelectOption={handleAnyInputsChange}
                    />
                   
                </div>

            </div>
        </div>

    );
};

export default Inputs;
