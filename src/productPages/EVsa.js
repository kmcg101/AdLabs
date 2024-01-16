import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import DropzoneSimple from "../DropzoneSimple";
import background from "../assets/evsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

import { OpacityContext } from "../App"

const vsaImage = {
  width: "234px",
  height: "416px",
  position: "absolute",
  left: "18px",
  top: "19px",
  zIndex: "100",
};

export default function E_vsa({
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
      <div className="eVSAImage" style={vsaImage}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
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

