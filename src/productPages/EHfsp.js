import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/ehfsp.png";



const hfspMedia = {
    position: "absolute",
    width: "97%",
    height: "58%",
    top: '7px',
    left: '8px',
    zIndex: "100"
}



const E_hfsp = (props) => {

    const handleAllDropzoneChanges = (name, value) => {
        props.handleAllDropzoneChangesParent(name, value)
    }
    return (
        <div className='elevatorProductContainer'>
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            <div class='eHFSPImage' style={hfspMedia}><Dropzone handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/></div>
        </div>
    )
};

export default E_hfsp;