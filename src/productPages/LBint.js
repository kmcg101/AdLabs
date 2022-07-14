import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import blackTextImage from "../assets/lbintBlackText.png";
import whiteTextImage from "../assets/lbintWhiteText.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const L_bint = (props) => {
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };

  const bintBGColorPre = props.bintBGColor;
  const bintBGColor = "#" + bintBGColorPre;
  const isBlackText = props.isBlackText;
  const lfdFileError = props.lfdFileError;
  const standardAdFileError = props.standardAdFileError;
  const svgFile = props.svgFile;
  const productIndex = props.productIndex;

  const lBint = {
    top: "22px",
    left: "1081px",
    width: "160px",
    height: "640px",
    position: "absolute",
    zIndex: "100",
  };

  const lStandardAd = {
    top: "22px",
    left: "276px",
    width: "768px",
    height: "432px",
    position: "absolute",
    zIndex: "100",
  };
  const bgStyle = {
    backgroundColor: bintBGColor,
  };

  return (
    <div className="landscapeProductContainer">
      <div style={bgStyle} className="backgroundImageContainer">
        <img alt="" className="backgroundImageContainer" src={isBlackText ? blackTextImage : whiteTextImage}></img>
      </div>

      <div className="lStandardAd" style={lStandardAd}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          droppedFileType="standardAd"
          svgFile={svgFile}
        />
      </div>
      <div style={lBint} className="lBintAd">
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          droppedFileType="landscape"
          svgFile={svgFile}
        />
      </div>
    </div>
  );
};

export default L_bint;
