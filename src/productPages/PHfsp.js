import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/phfsp.png";

const P_hfsp = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };

  
  const pHalfScreen = {
    position: "absolute",
    left: "20px",
    top: "30px",
    width: "672px",
    height: "610px",
    zIndex: "100"
  };

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className='pHFSPImage' style={pHalfScreen}>
        <Dropzone
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="portrait"
        />
      </div>
    </div>
  );
};

export default P_hfsp;
