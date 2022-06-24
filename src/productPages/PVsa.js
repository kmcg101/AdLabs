import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/pvsa.png";

const P_vsa = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  const pVsaImage = {
    width: "360px",
    height: "640px",
    zIndex: "100",
    position: "absolute",
    left: "24px",
    top: "24px",
  };
  const acceptedFileTypeString = "video/mp4";

  const pfdFileError = props.pfdFileError


  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className='pVSAImage' style={pVsaImage}>
        <Dropzone
          acceptedFileTypeString={acceptedFileTypeString}
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="portrait"
        />
      </div>
    </div>
  );
};

export default P_vsa;
