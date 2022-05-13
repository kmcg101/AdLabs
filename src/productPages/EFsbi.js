import React from 'react';
import './elevatorProductStyle.css'
import Dropzone from '../Dropzone'

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
        top: '25px'
    }
    return (
        <div className='elevatorProductContainer'>
            <div className='eFullScreen'>   <Dropzone               handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} assetType={props.assetType} droppedFileType='elevator'/></div>
            <div style={eFSBILogo}>         <Dropzone isSVG="true"  handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} assetType={props.assetType} droppedFileType='svg'/></div>
        </div>
    );
};

export default E_fsbi;