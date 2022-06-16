import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lhfsp.png";

const L_hfsp = (props) => {
  
  const lHalfScreen = {
    position: "absolute",
    left: "279px",
    top: "22px",
    width: "982px",
    height: "433px",
    zIndex: "100"
  };
  const acceptedFileTypeString = "video/mp4, image/png, image/jpg, image/jpeg";
  
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div class='lHFSPImage' style={lHalfScreen}>
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

export default L_hfsp;
