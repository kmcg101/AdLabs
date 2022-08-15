import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import blackTextImage from "../assets/lbintBlackText.png";
import whiteTextImage from "../assets/lbintWhiteText.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const L_bint = ({
  handleWarningMessageText,
  handleDropzoneChanges,
  bintBGColor,
  isBlackText,
  svgFile,
  productIndex,
  lfdFile,
  shakeDropzoneBGImage,
}) => {
  const bintBGColorPre = bintBGColor;
  const bintBGColorLocal = "#" + bintBGColorPre;

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
    backgroundColor: bintBGColorLocal,
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
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="standardAd"
          svgFile={svgFile}
        />
      </div>
      <div style={lBint} className="lBintAd">
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="landscape"
          svgFile={svgFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default L_bint;
