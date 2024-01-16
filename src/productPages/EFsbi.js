import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import DropzoneSimple from "../DropzoneSimple";
import background from "../assets/efsbi.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

import { OpacityContext } from "../App"

export default function E_fsbi({

  handleDropzoneChanges,
  handleWarningMessageText,
  handleContinueButtonDisabled,
}) {
  const { elevatorFile } = useContext(OpacityContext);
  const eFSBILogo = {
    width: "90px",
    height: "90px",
    position: "absolute",
    left: "500px",
    top: "10px",
    zIndex: "100",
  };
  return (
    <div className="elevatorProductContainer">
      <div className="backgroundImageContainer">
        <img alt="" className="backgroundImage" src={background}></img>
      </div>
      <div className="eFullScreen">
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="elevator"
          assetFileToChange={elevatorFile}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
      <div className="eFSBISVG" style={eFSBILogo}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.svgOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="svg"
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};


