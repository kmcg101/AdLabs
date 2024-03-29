import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import DropzoneFSA_LFD from "../DropzoneFSA_LFD";
import background from "../assets/lfsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";


export default function L_fsa({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {
  const isLFD = true;

  const lFullScreen = {
    width: "1024px",
    height: "680px",
    position: "absolute",
    left: "256px",
    top: "0px",
    zIndex: "100",
  };
  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div style={lFullScreen} className="lFullScreen">
        <DropzoneFSA_LFD
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="landscape"

          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};

