import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/evsa.png";

const vsaImage = {
    width: "234px",
    height: "416px",
    position: 'absolute',
    left: "18px",
    top: '19px',
    zIndex: "100"
}


const E_vsa = (props) => {
    const acceptedFileTypeString = "video/mp4";
    const elevatorFileError = props.elevatorFileError

    
    const handleAllDropzoneChanges = (name, value) => {
        props.handleAllDropzoneChangesParent(name, value)
    }
    
    return (
        <div className='elevatorProductContainer'>
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            <div className='eVSAImage' style={vsaImage}><Dropzone acceptedFileTypeString={acceptedFileTypeString} handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/></div>
        </div>
    )


};

export default E_vsa;