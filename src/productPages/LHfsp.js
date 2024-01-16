import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import DropzoneSimple from "../DropzoneSimple";
import background from "../assets/lhfsp.png";
import DROPZONE_DATA from "../DROPZONE_DATA";
import { OpacityContext } from "../App"

export default function L_hfsp({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {
  const { lfdFile } = useContext(OpacityContext);
  const lHalfScreen = {
    position: "absolute",
    left: "279px",
    top: "22px",
    width: "982px",
    height: "432px",
    zIndex: "100",
  };

  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="lHFSPImage" style={lHalfScreen}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
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


