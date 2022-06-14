import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/ebint.png";

const E_bint = (props) => {

    const handleAllDropzoneChanges = (name, value, droppedFileType) => {
        props.handleAllDropzoneChangesParent(name, value, droppedFileType)
    }
    
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
        position: "absolute",
        marginLeft: "10px",
        marginTop: "10px",
        overflow: "hidden",
        zIndex: "100"
    }

    return (
        <div className='elevatorProductContainer'>
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            
            <div style={eStandardAd} className='eStandardAd'>
                <Dropzone isStandardAd="true"  handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='standardAd'/>
            </div>
           
            
            <div className='eBintAd' style={eBINTImage}>    
                <Dropzone                      handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/>
            </div>
        </div>
    );
};

export default E_bint;