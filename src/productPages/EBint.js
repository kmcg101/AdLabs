import React from 'react';
import './elevatorProductStyle.css'
import Dropzone from '../Dropzone'

const E_bint = (props) => {
    

    const handleAllDropzoneChanges = (name, value) => {
        props.handleAllDropzoneChangesParent(name, value)
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
            <div className='eStandardAd'></div>
            <div className='eHSContentNarrow'></div>
            <div style={eBINTImage}><Dropzone handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} assetType={props.assetType} droppedFileType='elevator'/></div>
        </div>
    );
};

export default E_bint;