import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/pfsbi.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const P_fsbi = (props) => {
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };

  const pFSBILogo = {
    width: "200px",
    height: "200px",
    position: "absolute",
    left: "460px",
    top: "50px",
    zIndex: "100",
  };

  const pFullScreen = {
    width: "720px",
    height: "960px",
    position: "absolute",
    left: "0px",
    top: "0px",
    zIndex: "100",
  };
  const svgFile = props.svgFile;
  const pfdFileError = props.pfdFileError;
  const svgFileError = props.svgFileError;
  const productIndex = props.productIndex;
  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="pFullScreen" style={pFullScreen}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          rejectDroppedFile={props.rejectDroppedFile}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={props.handleWarningMessageText}
          droppedFileType="portrait"
          svgFile={svgFile}
        />
      </div>

      <div className="pFSBISVG" style={pFSBILogo}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.svgOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={props.handleWarningMessageText}
          droppedFileType="svg"
          svgFile={svgFile}
        />
      </div>
    </div>
  );
};

export default P_fsbi;
