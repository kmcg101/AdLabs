import React, { useState } from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/ebint.png";
import { SketchPicker } from 'react-color';

const E_bint = (props) => {

    const handleAllDropzoneChanges = (name, value, droppedFileType) => {
        props.handleAllDropzoneChangesParent(name, value, droppedFileType)
    }
    const [bgColor, setBGColor] = useState("#FFFFFF")
    const acceptedFileTypeStringStandardAd = "video/mp4";
    const acceptedFileTypeString = "image/png, image/jpg, image/jpeg";
    
    const eBINTImage = {
        width: "130px",
        height: "457px",
        position: 'absolute',
        left: "500px",
        top: '10px',
        zIndex: 100
    }
    const eStandardAd = {
    
        width: "480px",
        height: "270px",
        left: "10px",
        top: "10px",
        position: "absolute",
      
        overflow: "hidden",
        zIndex: "100"
    }
    const pickerStyle = {
        position: "absolute",
        left: "-350px",
        top: "78px",
        transform: 'scale(1.2)'
    }
    const bgStyle = {
        backgroundColor: bgColor
    }
 

    return (
        <div  className='elevatorProductContainer'>
            <div style={bgStyle} className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>

            <div  style={pickerStyle}>
                <SketchPicker 
                    color={bgColor}
                    onChangeComplete={ (color) =>{ setBGColor(color.hex) }  }
                
                />
            </div>
            
            <div style={eStandardAd} className='eStandardAd'>
                <Dropzone acceptedFileTypeString={acceptedFileTypeStringStandardAd} isStandardAd="true" handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='standardAd'/>
            </div>
           
            
            <div className='eBintAd' style={eBINTImage}>    
                <Dropzone acceptedFileTypeString={acceptedFileTypeString} handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/>
            </div>
        </div>
    );
};

export default E_bint;