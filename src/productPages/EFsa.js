import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../DropzoneSimple";
import background from "../assets/efsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

import { OpacityContext } from "../App"

export default function E_fsa({
  handleDropzoneChanges,
  handleWarningMessageText,
  handleContinueButtonDisabled,
}) {
  const { elevatorFile } = useContext(OpacityContext);
  return (
    <div className="elevatorProductContainer">
      <div className="eFullScreen">
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="elevator"
          assetFileToChange={elevatorFile}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
      <div className="backgroundImageContainer">
        <img alt="" className="backgroundImage" src={background}></img>
      </div>
    </div>
  );
};


