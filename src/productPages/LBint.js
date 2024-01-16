import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import DropzoneSimple from "../DropzoneSimple";
import blackTextImage from "../assets/lbintBlackText.png";
import whiteTextImage from "../assets/lbintWhiteText.png";
import lWidgetImage from "../assets/lWidgetImage.png";
import DROPZONE_DATA from "../DROPZONE_DATA";
import { OpacityContext } from "../App"

export default function L_bint({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {
  const { bintBGOpacity, isBlackText, noBintImages, bintBGColor, lfdFile } = useContext(OpacityContext);
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
    <div className="landscapeProductContainer">
      <div className="backgroundImageContainer">
        <img alt="" style={bgImage} className="backgroundImage" src={isBlackText ? blackTextImage : whiteTextImage}></img>
        <div style={bgStyle} className='backgroundColorContainer'></div>
      </div>

      <div className="lStandardAd" style={lStandardAd}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="standardAd"
        />
      </div>
      <div className={`lBintAd ${noBintImages === false ? "hide" : ""}`} style={lBint}>
        <img src={lWidgetImage} alt="back"></img>
      </div>
      <div style={lBint} className={`lBintAd ${noBintImages === true ? "hide" : ""}`}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="landscape"
          assetFileToChange={lfdFile}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};


