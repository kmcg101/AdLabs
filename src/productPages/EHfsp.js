import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../DropzoneElevator";
import background from "../assets/ehfsp.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const hfspMedia = {
  position: "absolute",
  width: "620px",
  height: "278px",
  top: "10px",
  left: "10px",
  zIndex: "100",
};

const E_hfsp = ({
  svgFile,
  elevatorFile,
  productIndex,
  handleDropzoneChanges,
  handleWarningMessageText,
  shakeDropzoneBGImage,
}) => {
  return (
    <div className="elevatorProductContainer">
      <div className="backgroundImageContainer">
        <img alt="" className="backgroundImage" src={background}></img>
      </div>
      <div className="eHFSPImage" style={hfspMedia}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="elevator"
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default E_hfsp;
