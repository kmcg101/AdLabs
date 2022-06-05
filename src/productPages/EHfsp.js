import React from 'react';
import './pageAndProductStyle.css'
import Dropzone from '../Dropzone'
import background from "../assets/ehfsp.png";



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
            <div className='backgroundImageContainer'>
                <img alt='' className='backgroundImage' src={background}></img>
            </div>
            <div style={hfspMedia}><Dropzone handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} droppedFileType='elevator'/></div>
            <div style={hfspContent}></div>
        </div>
    )
};

export default E_hfsp;