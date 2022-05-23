import React from 'react';
import './elevatorProductStyle.css'
import Dropzone from '../Dropzone'

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
        border: 'solid black 1px'
    }

    return (
        <div className='elevatorProductContainer'>
            {/* <div className='eStandardAd'></div> */}
            <div className='eStandardAd'><Dropzone isStandardAd="true"  handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} assetType={"video"} droppedFileType='standardAd'/></div>
            <div className='eHSContentNarrow'></div>
            <div style={eBINTImage}>    <Dropzone                       handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} assetType={props.assetType} droppedFileType='elevator'/></div>
        </div>
    );
};

export default E_bint;