import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/ebint.png";

const E_bint = (props) => {

    const handleAllDropzoneChanges = (name, value, droppedFileType) => {
        props.handleAllDropzoneChangesParent(name, value, droppedFileType)
    }
    
    const eBINTImage = {
        width: "20.3%",
        height: "95.2%",
        position: 'absolute',
        right: "10px",
        top: '0px',
        border: 'solid black 1px',
        zIndex: 100
    }

    return (
        <div className='elevatorProductContainer'>
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            
            <div className='eStandardAd'>
                <Dropzone isStandardAd="true"  handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='standardAd'/>
            </div>
           
            <div className='eHSContentNarrow'></div>
            <div style={eBINTImage}>    
                <Dropzone                      handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/>
            </div>
        </div>
    );
};

export default E_bint;