import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/evsa.png";

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
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            <div style={vsaImage}><Dropzone handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/></div>
            <div style={vsaContent}></div>
        </div>
    )


};

export default E_vsa;