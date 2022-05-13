import React from 'react';
import './elevatorProductStyle.css'
import Dropzone from '../Dropzone'

const E_fsa = (props) => {

    const handleAllDropzoneChanges = (name, value) => {
        props.handleAllDropzoneChangesParent(name, value)
    }
    return (
        <div className='elevatorProductContainer'>
            <div className='eFullScreen'>
                <Dropzone handleAllDropzoneChanges={handleAllDropzoneChanges} droppedFile={props.droppedFile} productIndex={props.productIndex} assetType={props.assetType} droppedFileType='elevator'/>
            </div>
        </div>
    );
};

export default E_fsa;