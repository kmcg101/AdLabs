import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import DropzoneSimple from "../DropzoneSimple";
import blackTextImage from "../assets/pbintBlackText.png";
import whiteTextImage from "../assets/pbintWhiteText.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const P_bint = ({ pfdFile, handleDropzoneChanges, noBintImages, isBlackText, productIndex, handleWarningMessageText, shakeDropzoneBGImage, bintBGColor, handleContinueButtonDisabled }) => {
  const bintBGColorPre = bintBGColor;
  const bintBGColorLocal = "#" + bintBGColorPre;

  const pBint = {
    width: "672px",
    height: "210px",
    position: "absolute",
    left: "24px",
    top: "24px",
    zIndex: "100",
  };
  const pStandardAd = {
    width: "672px",
    height: "378px",
    position: "absolute",
    left: "24px",
    top: "256px",
    zIndex: "100",
    outline: "1px #f5f5f5 solid",
  };
  const bgStyle = {
    backgroundColor: bintBGColorLocal,
  };

  return (
    <div className="portraitProductContainer">
      <div style={bgStyle} className="backgroundImageContainer">
        <img alt="" className="backgroundImageContainer" src={isBlackText ? blackTextImage : whiteTextImage}></img>
      </div>
      <div className="pStandardAd" style={pStandardAd}>
        {/* <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="standardAd"
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        /> */}
      </div>
      <div className={`pBintAd ${noBintImages === true ? "hide" : ""}`} style={pBint}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="portrait"
          assetFileToChange={pfdFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};

export default P_bint;
