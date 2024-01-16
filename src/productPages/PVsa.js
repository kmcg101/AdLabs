import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import DropzoneVSA from "../DropzoneVSA";
import background from "../assets/pvsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";
import { OpacityContext } from "../App"

export default function P_vsa({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {
  const { bintBGOpacity, isBlackText, noBintImages, bintBGColor, lfdFile, pfdFile } = useContext(OpacityContext);
  const pVsaImage = {
    width: "360px",
    height: "640px",
    zIndex: "100",
    position: "absolute",
    left: "24px",
    top: "24px",
  };

  const isLFD = false;

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="pVSAImage" style={pVsaImage}>
        <DropzoneVSA
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="portrait"

          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};

