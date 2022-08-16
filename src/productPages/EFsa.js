import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../DropzoneSimple";
import background from "../assets/efsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const E_fsa = ({
  svgFile,
  elevatorFile,
  productIndex,
  handleDropzoneChanges,
  handleWarningMessageText,
  shakeDropzoneBGImage,
}) => {
  return (
    <div className="elevatorProductContainer">
      <div className="eFullScreen">
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="elevator"
          svgFile={svgFile}
          assetFileToChange={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      </div>
      <div className="backgroundImageContainer">
        <img alt="" className="backgroundImage" src={background}></img>
      </div>
    </div>
  );
};

export default E_fsa;
