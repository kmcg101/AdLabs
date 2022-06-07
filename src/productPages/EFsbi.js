import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/efsbi.png";

const E_fsbi =  (props) => {
   
    const handleAllDropzoneChanges = (name, value, droppedFileType) => {
        props.handleAllDropzoneChangesParent(name, value, droppedFileType)
    }
    const eFSBILogo = {
        width: "20%",
        height: "20%",
        border: 'solid black 1px',
        position: 'absolute',
        right: "50px",
        top: '25px',
        zIndex: '100'
    }
    return (
        <div className='elevatorProductContainer'>
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            <div className='eFullScreen'>   <Dropzone               handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/></div>
            <div style={eFSBILogo}>         <Dropzone isSVG="true"  handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='svg'/></div>
        </div>
    );
};

export default E_fsbi;