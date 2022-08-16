import React, { useState } from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import DropzoneSimple from "../DropzoneSimple";
import blackTextImage from "../assets/ebintBlackText.png";
import whiteTextImage from "../assets/ebintWhiteText.png";

import DROPZONE_DATA from "../DROPZONE_DATA";

const E_bint = ({
  isBlackText,
  bintBGColor,
  svgFile,
  elevatorFile,
  productIndex,
  handleWarningMessageText,
  shakeDropzoneBGImage,
  handleDropzoneChanges,
}) => {
  const bintBGColorPre = bintBGColor;
  const bintBGColorLocal = "#" + bintBGColorPre;

  const eBINTImage = {
    width: "130px",
    height: "457px",
    position: "absolute",
    left: "500px",
    top: "10px",
    zIndex: 100,
  };
  const eStandardAd = {
    width: "480px",
    height: "270px",
    left: "10px",
    top: "10px",
    position: "absolute",
    overflow: "hidden",
    zIndex: "100",
  };

  const bgStyle = {
    backgroundColor: bintBGColorLocal,
  };

  return (
    <div className="elevatorProductContainer">
      <div style={bgStyle} className="backgroundImageContainer">
        <img alt="" className="backgroundImage" src={isBlackText ? blackTextImage : whiteTextImage}></img>
      </div>

      <div style={eStandardAd} className="eStandardAd">
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          droppedFileType="standardAd"
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          svgFile={svgFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          elevatorFile={elevatorFile}
        />
      </div>

      <div className="eBintAd" style={eBINTImage}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="elevator"
          assetFileToChange={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default E_bint;
