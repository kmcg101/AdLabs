import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import blackTextImage from "../assets/pbintBlackText.png";
import whiteTextImage from "../assets/pbintWhiteText.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const P_bint = (props) => {
  const bintBGColorPre = props.bintBGColor;
  const bintBGColor = "#" + bintBGColorPre;
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };

  const isBlackText = props.isBlackText;
  const svgFile = props.svgFile;
  const productIndex = props.productIndex;

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
  };
  const bgStyle = {
    backgroundColor: bintBGColor,
  };

  return (
    <div className="portraitProductContainer">
      <div style={bgStyle} className="backgroundImageContainer">
        <img alt="" className="backgroundImageContainer" src={isBlackText ? blackTextImage : whiteTextImage}></img>
      </div>
      <div className="pStandardAd" style={pStandardAd}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={props.handleWarningMessageText}
          droppedFileType="standardAd"
          svgFile={svgFile}
        />
      </div>
      <div className="pBintAd" style={pBint}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={props.handleWarningMessageText}
          droppedFileType="portrait"
          svgFile={svgFile}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default P_bint;
