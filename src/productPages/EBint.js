import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import DropzoneSimple from "../DropzoneSimple";
import blackTextImage from "../assets/ebintBlackText.png";
import whiteTextImage from "../assets/ebintWhiteText.png";
import eWidgetImage from "../assets/eWidgetImage.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const E_bint = ({ bintBGOpacity, noBintImages, isBlackText, bintBGColor, svgFile, elevatorFile, productIndex, handleWarningMessageText, shakeDropzoneBGImage, handleDropzoneChanges, handleContinueButtonDisabled }) => {
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
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          svgFile={svgFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          elevatorFile={elevatorFile}
        />

      </div>

      <div className={`ebintAd ${noBintImages === false ? "hide" : ""}`} style={eBINTImage}>
        <img src={eWidgetImage} alt="back"></img>
      </div>


      <div className={`ebintAd ${noBintImages === true ? "hide" : ""}`} style={eBINTImage}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="elevator"
          assetFileToChange={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};

export default E_bint;
