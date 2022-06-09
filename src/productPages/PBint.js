import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/pbint.png";

const P_bint = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  const pBint = {
    width: "95%",
    height: "16%",
    position: "absolute",
    left: "5px",
    top: "7px",
    zIndex: "100"
  };
  const pStandardAd = {
    width: "95%",
    height: "29%",
    position: "absolute",
    left: "5px",
    top: "80px",
    zIndex: "100"
  };

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div style={pStandardAd}>
        <Dropzone
          isStandardAd="true"
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="standardAd"
        />
      </div>
      <div style={pBint}>
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

export default P_bint;
