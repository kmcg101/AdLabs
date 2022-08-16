import React from "react";
import "./pageAndProductStyle.css";
import DropzoneSimple from "../DropzoneSimple";
import background from "../assets/lhfsp.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const L_hfsp = ({ handleWarningMessageText, handleDropzoneChanges, productIndex, lfdFile, shakeDropzoneBGImage }) => {
  const lHalfScreen = {
    position: "absolute",
    left: "279px",
    top: "22px",
    width: "982px",
    height: "433px",
    zIndex: "100",
  };

  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="lHFSPImage" style={lHalfScreen}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="landscape"
          assetFileToChange={lfdFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default L_hfsp;
