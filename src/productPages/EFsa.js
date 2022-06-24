import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/efsa.png";

const E_fsa = (props) => {
 
    const acceptedFileTypeString = "video/mp4";
    const elevatorFileError = props.elevatorFileError

    

    const handleAllDropzoneChanges = (name, value) => {
        props.handleAllDropzoneChangesParent(name, value)
    }
    return (
        <div className='elevatorProductContainer'>
            
            <div className='eFullScreen'>
                <Dropzone acceptedFileTypeString={acceptedFileTypeString} handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/>
            </div>
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
        </div>
    );
};

export default E_fsa;