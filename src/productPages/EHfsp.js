import React from 'react';
import './elevatorProductStyle.css'
import Dropzone from '../Dropzone'


const hfspMedia = {
    position: "relative",
    width: "98%",
    height: "58%",
    marginBottom: '5px',
    border: '1px black solid'
}
const hfspContent = {
    width: "98%",
    height: "38%",
    border: '1px black solid'
}


const E_hfsp = (props) => {

    const handleAllDropzoneChanges = (name, value) => {
        props.handleAllDropzoneChangesParent(name, value)
    }
    return (
        <div className='elevatorProductContainer'>
            <div style={hfspMedia}><Dropzone handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} assetType={props.assetType} droppedFileType='elevator'/></div>
            <div style={hfspContent}></div>
        </div>
    )
};

export default E_hfsp;