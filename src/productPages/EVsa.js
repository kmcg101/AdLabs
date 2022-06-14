import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/evsa.png";

const vsaImage = {
    width: "234px",
    height: "416px",
    position: 'absolute',
    left: "14px",
    top: '14px',
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
            <div class='eVSAImage' style={vsaImage}><Dropzone handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/></div>
        </div>
    )


};

export default E_vsa;