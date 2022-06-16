import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/pbint.png";

const P_bint = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  const pBint = {
    width: "672px",
    height: "210px",
    position: "absolute",
    left: "24px",
    top: "24px",
    zIndex: "100"
  };
  const pStandardAd = {
    width: "672px",
    height: "378px",
    position: "absolute",
    left: "24px",
    top: "256px",
    zIndex: "100"
  };
  const acceptedFileTypeStringStandardAd = "video/mp4";
  const acceptedFileTypeString = "image/png, image/jpg, image/jpeg";

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className='pStandardAd' style={pStandardAd}>
        <Dropzone
          acceptedFileTypeString={acceptedFileTypeStringStandardAd} 
          isStandardAd="true"
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="standardAd"
        />
      </div>
      <div className='pBintAd' style={pBint}>
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

export default P_bint;
