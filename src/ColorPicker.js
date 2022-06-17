import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { BlockPicker } from 'react-color';
import { CustomPicker } from './ColorPicker';
import './SketchPicker.css'


const ColorPicker = (props) => {
    const [bgColor, setBGColor] = useState("#FFFFFF")

    const handleBINTColorChange = (color) => {
        setBGColor(color.hex)
        props.handleBINTColorChange(color.hex)
    }
    const pickerStyle = {
        background: "green"
    }

   
    return (

        <div style={pickerStyle} className="colorPicker">
            <BlockPicker 
                triangle="hide"
                colors="['#ff8a65', '#ba68c8']"
                color={bgColor}
                onChangeComplete={(color) => { handleBINTColorChange(color) }}
            />
        </div>
    );
};

export default ColorPicker;