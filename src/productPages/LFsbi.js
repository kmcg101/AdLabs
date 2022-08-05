import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import DropzoneSVG from "../DropzoneSVG";
import background from "../assets/lfsbi.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const L_fsbi = (props) => {
  const lFSBILogo = {
    width: "160px",
    height: "160px",
    position: "absolute",
    left: "1070px",
    top: "30px",
    zIndex: "100",
  };
  const lFullScreen = {
    width: "1024px",
    height: "680px",
    position: "absolute",
    left: "256px",
    top: "0px",
    zIndex: "100",
  };
  const svgFile = props.svgFile;
  const lfdFileError = props.lfdFileError;
  const svgFileError = props.svgFileError;
  const productIndex = props.productIndex;

  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };

  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div style={lFullScreen} className="lFullScreen">
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={props.handleWarningMessageText}
          droppedFileType="landscape"
          svgFile={svgFile}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      </div>
      <div className="lFSBISVG" style={lFSBILogo}>
        <DropzoneSVG
          acceptedFileTypeString={DROPZONE_DATA.data.svgOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={props.handleWarningMessageText}
          droppedFileType="svg"
          svgFile={svgFile}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default L_fsbi;
