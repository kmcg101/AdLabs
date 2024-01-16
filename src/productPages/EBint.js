import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import DropzoneSimple from "../DropzoneSimple";
import blackTextImage from "../assets/ebintBlackText.png";
import whiteTextImage from "../assets/ebintWhiteText.png";
import eWidgetImage from "../assets/eWidgetImage.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

import { OpacityContext } from "../App"


export default function E_bint({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {
  const { bintBGOpacity, isBlackText, noBintImages, bintBGColor, elevatorFile } = useContext(OpacityContext);

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
    <div className="elevatorProductContainer">
      <div className="backgroundImageContainer">
        <img alt="" style={bgImage} className="backgroundImage" src={isBlackText ? blackTextImage : whiteTextImage}></img>
        <div style={bgStyle} className='backgroundColorContainer'></div>
      </div>
      <div style={eStandardAd} className="eStandardAd">
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          droppedFileType="standardAd"
          handleWarningMessageText={handleWarningMessageText}
        />

      </div>

      <div className={`ebintAd ${noBintImages === false ? "hide" : ""}`} style={eBINTImage}>
        <img src={eWidgetImage} alt="back"></img>
      </div>


      <div className={`ebintAd ${noBintImages === true ? "hide" : ""}`} style={eBINTImage}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="elevator"
          assetFileToChange={elevatorFile}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};

