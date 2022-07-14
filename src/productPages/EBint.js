import React, { useState } from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import blackTextImage from "../assets/ebintBlackText.png";
import whiteTextImage from "../assets/ebintWhiteText.png";

import DROPZONE_DATA from "../DROPZONE_DATA";

const E_bint = (props) => {
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };
  const isBlackText = props.isBlackText;
  const bintBGColorPre = props.bintBGColor;
  const bintBGColor = "#" + bintBGColorPre;
  //console.log("bintBGColor = " , bintBGColor)
  const elevatorFileError = props.elevatorFileError;
  const standardAdFileError = props.standardAdFileError;
  const svgFile = props.svgFile;
  const productIndex = props.productIndex;

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
    backgroundColor: bintBGColor,
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
          svgFile={svgFile}
        />
      </div>

      <div className="eBintAd" style={eBINTImage}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          droppedFileType="elevator"
          svgFile={svgFile}
        />
      </div>
    </div>
  );
};

export default E_bint;
