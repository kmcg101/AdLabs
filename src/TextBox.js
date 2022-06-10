
import React, { useState } from "react";

import './pages/inputs.css'

function TextBox(props) {
    const [valueIsValid, setValueIsValid] = useState(false)

    const handleAnyInputsChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        props.handleAnyInputsChange(name, value);
        if(value === ""){
            setValueIsValid(false);
        }
        else{
            setValueIsValid(true);
        }
    };
    const inputsCheckButtonPressed = props.inputsCheckButtonPressed;
    const inputValues = props.inputValues;



    return (
        <div className='textBox'>

            <div className='textBoxInner'>
                <label className="titleText">{props.label}</label>
                <div className=''>
                    <input className={`standardText ${inputsCheckButtonPressed &&  valueIsValid === false ? "textInputErrorShake textInputErrorOutline": "" }`}
                        
                        type='text'
                        name={props.varID}
                        value={props.value}
                        onChange={handleAnyInputsChange}
                    >

                    </input>
                </div>
            </div>
        </div>
    )

}

export default TextBox