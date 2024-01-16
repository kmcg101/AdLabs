import React, { useContext } from "react";
import "./pageAndProductStyle.css";
import DropzoneSimple from "../DropzoneSimple";
import DropzoneSVG from "../DropzoneSVG";
import background from "../assets/pfsbi.png";
import DROPZONE_DATA from "../DROPZONE_DATA";
import { OpacityContext } from "../App"

export default function P_fsbi({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {
  const { pfdFile } = useContext(OpacityContext);
  const pFSBILogo = {
    width: "200px",
    height: "200px",
    position: "absolute",
    left: "460px",
    top: "50px",
    zIndex: "100",
  };

  const pFullScreen = {
    width: "720px",
    height: "960px",
    position: "absolute",
    left: "0px",
    top: "0px",
    zIndex: "100",
  };

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="pFullScreen" style={pFullScreen}>
        <DropzoneSimple
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="portrait"
          assetFileToChange={pfdFile}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>

      <div className="pFSBISVG" style={pFSBILogo}>
        <DropzoneSVG
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


