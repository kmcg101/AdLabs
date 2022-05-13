
import React, { useEffect, useState } from "react";

function SelectBox(props) {

    const handleSelectOptionChange = (e) => {

        props.onSelectOption(e);
        console.log(e.target.selectedIndex)
    }


    return (
        <div className='selectBox' id={props.varID}>
            <label>{props.label}</label>
            <select
                name={props.varID}
                onChange={handleSelectOptionChange}
                value={props.value}
            >
                <option disabled value=" Select "> -- Select -- </option>
                {props.options.map((element) => <option key={element.keyindex} value={element.value} >{element.label}</option>)}
            </select>
        </div>



    )
}

export default SelectBox