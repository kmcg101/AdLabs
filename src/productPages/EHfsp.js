import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import DropzoneSimple from "../DropzoneSimple";
import background from "../assets/ehfsp.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

import { OpacityContext } from "../App"

const hfspMedia = {
  position: "absolute",
  width: "620px",
  height: "278px",
  top: "10px",
  left: "10px",
  zIndex: "100",
};

export default function E_hfsp({

  handleDropzoneChanges,
  handleWarningMessageText,

  handleContinueButtonDisabled,
}) {
  const { elevatorFile } = useContext(OpacityContext);
  return (
    <div className="elevatorProductContainer">
      <div className="backgroundImageContainer">
        <img alt="" className="backgroundImage" src={background}></img>
      </div>
      <div className="eHFSPImage" style={hfspMedia}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
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

