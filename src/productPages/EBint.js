import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/ebint.png";

const E_bint = (props) => {

    const handleAllDropzoneChanges = (name, value, droppedFileType) => {
        props.handleAllDropzoneChangesParent(name, value, droppedFileType)
    }
    
    const eBINTImage = {
        width: "21%",
        height: "95%",
        position: 'absolute',
        right: "7px",
        top: '7px',
        zIndex: 100
    }
    const eStandardAd = {
    
        width: "75%",
        height: "56.25%",
        position: "absolute",
        marginLeft: "7px",
        marginTop: "8px",
        overflow: "hidden",
        zIndex: "100"
    }

    return (
        <div className='elevatorProductContainer'>
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            
            <div style={eStandardAd}className='eStandardAd'>
                <Dropzone isStandardAd="true"  handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='standardAd'/>
            </div>
           
            
            <div style={eBINTImage}>    
                <Dropzone                      handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/>
            </div>
        </div>
    );
};

export default E_bint;