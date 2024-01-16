import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import DropzoneVSA from "../DropzoneVSA";
import background from "../assets/lvsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";
import { OpacityContext } from "../App"

export default function L_vsa({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {
  const vsaImage = {
    width: "360px",
    height: "640px",
    position: "absolute",
    left: "306px",
    top: "20px",
    zIndex: "100",
  };

  const isLFD = true;

  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="lVSAImage" style={vsaImage}>
        <DropzoneVSA
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="landscape"

          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};


