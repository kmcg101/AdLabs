import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import DropzoneSimple from "../DropzoneSimple";
import background from "../assets/phfsp.png";
import DROPZONE_DATA from "../DROPZONE_DATA";
import { OpacityContext } from "../App"

export default function P_hfsp({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {
  const { pfdFile } = useContext(OpacityContext);
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
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="portrait"
          assetFileToChange={pfdFile}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};


