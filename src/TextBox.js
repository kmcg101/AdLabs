
import React, { useState } from "react";

function TextBox (props) {
    const [valueIsValid, setValueIsValid] = useState(true)
    const [errorValue, setErrorValue] = useState('')

    const handleInputChange = (e) => {
        console.log("change " + e.target.value)
        

        //const regExPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        
        let isGood = true;

        // check for spaces or caps or anything other than alphanumeric
        //const goodCharacters = 'abcdefghigjklmnopqrstuvwxyz'
        

        if (e.target.value.indexOf(" ") > -1) {
            setValueIsValid(false)
            setErrorValue('error: space')
            isGood = false;
        }
        else if (e.target.value.toLowerCase() !== e.target.value) {
            setValueIsValid(false)
            setErrorValue('error: caps')
            isGood = false;
        }
        else if (e.target.value.length === 0) {
            setValueIsValid(false)
            setErrorValue('error: length')
            isGood = false;
        }
        else {
            setValueIsValid(true)
            setErrorValue('')
           
            
        }
       
        props.onTextChange(e.target.name, e.target.value);

    }
    
    return (
        <div className='textBox'>
            
            <div className='textBoxInner'>
                <input className={valueIsValid ? 'goodInput' : 'badInput'}
                    type='text'
                    name={props.varID}
                    onChange={handleInputChange}
                    placeholder={props.label}
                    value={props.value}
                >
                </input>
                <label className='errorMessage'>{errorValue}</label>
            </div>
        </div>
    )
    
}

export default TextBox