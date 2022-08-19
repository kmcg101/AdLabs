import React from "react";
import "./pageAndProductStyle.css";
import DropzoneSimple from "../DropzoneSimple";
import background from "../assets/phfsp.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const P_hfsp = ({
  handleDropzoneChanges,
  pfdFile,
  productIndex,
  handleWarningMessageText,
  shakeDropzoneBGImage,
  handleContinueButtonDisabled,
}) => {
  const pHalfScreen = {
    position: "absolute",
    left: "20px",
    top: "30px",
    width: "672px",
    height: "610px",
    zIndex: "100",
  };

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="pHFSPImage" style={pHalfScreen}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
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

export default P_hfsp;
