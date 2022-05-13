import React from 'react';
import './elevatorProductStyle.css'
import Dropzone from '../Dropzone'

const vsaImage = {
    width: "36.5%",
    height: "86.66%",
    border: 'solid black 1px',
    position: 'absolute',
    left: "50px",
    top: '20px'
}
const vsaContent = {
    width: "36.5%",
    height: "60%",
    border: 'solid black 1px',
    position: 'absolute',
    left: "280px",
    top: '85px'
}

const E_vsa = (props) => {

    const handleAllDropzoneChanges = (name, value) => {
        props.handleAllDropzoneChangesParent(name, value)
    }
    
    return (
        <div className='elevatorProductContainer'>
            <div style={vsaImage}><Dropzone handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} assetType={props.assetType} droppedFileType='elevator'/></div>
            <div style={vsaContent}></div>
        </div>
    )


};

export default E_vsa;