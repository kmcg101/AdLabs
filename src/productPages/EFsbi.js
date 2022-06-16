import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/efsbi.png";

const E_fsbi =  (props) => {
    const acceptedFileTypeString = "video/mp4, image/png, image/jpg, image/jpeg";
    
    const acceptedFileTypeStringSVG = "image/svg+xml";

    const handleAllDropzoneChanges = (name, value, droppedFileType) => {
        props.handleAllDropzoneChangesParent(name, value, droppedFileType)
    }
    const eFSBILogo = {
        width: "90px",
        height: "90px",
        position: 'absolute',
        left: "500px",
        top: '10px',
        zIndex: '100'
    }
    return (
        <div className='elevatorProductContainer'>
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            <div className='eFullScreen'>   <Dropzone acceptedFileTypeString={acceptedFileTypeString} handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/></div>
            <div className='eFSBISVG' style={eFSBILogo}><Dropzone acceptedFileTypeString={acceptedFileTypeStringSVG} isSVG="true"  handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='svg'/></div>
        </div>
    );
};

export default E_fsbi;