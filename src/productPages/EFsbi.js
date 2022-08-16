import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import DropzoneSimple from "../DropzoneSimple";
import background from "../assets/efsbi.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const E_fsbi = ({
  svgFile,
  elevatorFile,
  productIndex,
  handleDropzoneChanges,
  handleWarningMessageText,
  shakeDropzoneBGImage,
}) => {
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
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="elevator"
          assetFileToChange={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      </div>
      <div className="eFSBISVG" style={eFSBILogo}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.svgOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="svg"
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default E_fsbi;
