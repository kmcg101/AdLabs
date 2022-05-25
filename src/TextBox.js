
import React, { useState } from "react";
import "./App.css"

function TextBox (props) {
    const [valueIsValid, setValueIsValid] = useState(true)
    const [errorValue, setErrorValue] = useState('')

   
    
    return (
        <div className='textBox'>
            
            <div className='textBoxInner'>
                <label className="titleText">{props.label}</label>
                <input className="standardText"
                    type='text'
                    name={props.varID}
                    // placeholder={props.label}
                    value={props.value}
                >
                </input>
                {/* <label className='errorMessage'>{errorValue}</label> */}
            </div>
        </div>
    )
    
}

export default TextBox