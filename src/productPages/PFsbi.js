import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import DropzoneSVG from "../DropzoneSVG";
import background from "../assets/pfsbi.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const P_fsbi = ({
  lfdFile,
  handleDropzoneChanges,
  svgFile,
  productIndex,
  handleWarningMessageText,
  shakeDropzoneBGImage,
}) => {
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
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="portrait"
          svgFile={svgFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      </div>

      <div className="pFSBISVG" style={pFSBILogo}>
        <DropzoneSVG
          acceptedFileTypeString={DROPZONE_DATA.data.svgOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="svg"
          svgFile={svgFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default P_fsbi;
