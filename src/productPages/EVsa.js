import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../DropzoneElevator";
import background from "../assets/evsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const vsaImage = {
  width: "234px",
  height: "416px",
  position: "absolute",
  left: "18px",
  top: "19px",
  zIndex: "100",
};

const E_vsa = ({
  elevatorFile,
  svgFile,
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
      <div className="eVSAImage" style={vsaImage}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
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

export default E_vsa;
