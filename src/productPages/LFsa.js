import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lfsa.png";

const L_fsa = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  const acceptedFileTypeString = "video/mp4, image/png, image/jpg, image/jpeg";

  const lfdFileError = props.lfdFileError

  
  const lFullScreen = {
    width: "1024px",
    height: "680px",
    position: "absolute",
    left: "256px",
    top: "0px",
    zIndex: "100"
}
  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div style={lFullScreen} className="lFullScreen">
        <Dropzone
          acceptedFileTypeString={acceptedFileTypeString} 
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="landscape"
        />
      </div>
    </div>
  );
};

export default L_fsa;
