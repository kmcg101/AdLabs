import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../DropzoneFSA_PFD";
import background from "../assets/pfsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const P_fsa = (props) => {
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };
  const svgFile = props.svgFile;
  const pFullScreen = {
    width: "720px",
    height: "960px",
    position: "absolute",
    left: "0px",
    top: "0px",
    zIndex: "100",
  };

  const pfdFileError = props.pfdFileError;
  const productIndex = props.productIndex;
  const lfdFile = props.lfdFile;
  const pfdFile = props.pfdFile;
  const isLFD = false;

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="pFullScreen" style={pFullScreen}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={props.handleWarningMessageText}
          droppedFileType="portrait"
          svgFile={svgFile}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
          isLFD={isLFD}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default P_fsa;
