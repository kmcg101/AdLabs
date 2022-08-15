import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../DropzoneFSA_LFD";
import background from "../assets/lfsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const L_fsa = ({
  handleWarningMessageText,
  handleDropzoneChanges,
  bintBGColor,
  isBlackText,
  svgFile,
  productIndex,
  lfdFile,
  pfdFile,
  shakeDropzoneBGImage,
}) => {
  const isLFD = true;

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
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="landscape"
          svgFile={svgFile}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
          isLFD={isLFD}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default L_fsa;
