import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import DropzoneSimple from "../DropzoneSimple";
import blackTextImage from "../assets/pbintBlackText.png";
import whiteTextImage from "../assets/pbintWhiteText.png";
import pWidgetImage from "../assets/pWidgetImage.png";
import DROPZONE_DATA from "../DROPZONE_DATA";
import { OpacityContext } from "../App"

export default function P_bint({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {
  const { bintBGOpacity, isBlackText, noBintImages, bintBGColor, pfdFile } = useContext(OpacityContext);
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
    opacity: bintBGOpacity,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0
  };
  const bgImage = {
    position: "relative",
    zIndex: 100
  }

  return (
    <div className="portraitProductContainer">
      <div className="backgroundImageContainer">
        <img style={bgImage} alt="" className="backgroundImage" src={isBlackText ? blackTextImage : whiteTextImage}></img>
        <div style={bgStyle} className='backgroundColorContainer'></div>
      </div>
      <div className="pStandardAd" style={pStandardAd}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="standardAd"
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>

      <div className={`pBintAd ${noBintImages === false ? "hide" : ""}`} style={pBint}>
        <img src={pWidgetImage} alt="back"></img>
      </div>

      <div className={`pBintAd ${noBintImages === true ? "hide" : ""}`} style={pBint}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="portrait"
          assetFileToChange={pfdFile}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>

    </div>
  );
};


