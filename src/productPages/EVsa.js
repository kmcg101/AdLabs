import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/evsa.png";

const vsaImage = {
    width: "36.5%",
    height: "86.66%",
    position: 'absolute',
    left: "12px",
    top: '12px',
    zIndex: "100"
}


const E_vsa = (props) => {

    const handleAllDropzoneChanges = (name, value) => {
        props.handleAllDropzoneChangesParent(name, value)
    }
    
    return (
        <div className='elevatorProductContainer'>
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            <div style={vsaImage}><Dropzone handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/></div>
        </div>
    )


};

export default E_vsa;