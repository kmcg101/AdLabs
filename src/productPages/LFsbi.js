import React from "react";
import "./pageAndProductStyle.css";
import DropzoneSimple from "../DropzoneSimple";
import DropzoneSVG from "../DropzoneSVG";
import background from "../assets/lfsbi.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const L_fsbi = ({
  handleWarningMessageText,
  handleDropzoneChanges,
  svgFile,
  productIndex,
  lfdFile,
  shakeDropzoneBGImage,
  handleContinueButtonDisabled,
}) => {
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

  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div style={lFullScreen} className="lFullScreen">
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="landscape"
          assetFileToChange={lfdFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
      <div className="lFSBISVG" style={lFSBILogo}>
        <DropzoneSVG
          acceptedFileTypeString={DROPZONE_DATA.data.svgOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="svg"
          svgFile={svgFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};

export default L_fsbi;
