import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/ehfsp.png";



const hfspMedia = {
    position: "absolute",
    width: "620px",
    height: "278px",
    top: '10px',
    left: '10px',
    zIndex: "100"
}



const E_hfsp = (props) => {
    const acceptedFileTypeString = "video/mp4, image/png, image/jpg, image/jpeg";
    
    const handleAllDropzoneChanges = (name, value) => {
        props.handleAllDropzoneChangesParent(name, value)
    }
    return (
        <div className='elevatorProductContainer'>
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            <div className='eHFSPImage' style={hfspMedia}><Dropzone acceptedFileTypeString={acceptedFileTypeString} handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/></div>
        </div>
    )
};

export default E_hfsp;