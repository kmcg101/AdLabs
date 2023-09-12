import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../DropzoneVSA";
import background from "../assets/lvsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const L_vsa = ({
  handleWarningMessageText,
  handleDropzoneChanges,
  svgFile,
  productIndex,
  lfdFile,
  pfdFile,
  shakeDropzoneBGImage,
  handleContinueButtonDisabled,
}) => {
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
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={handleWarningMessageText}
          droppedFileType="landscape"
          svgFile={svgFile}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
          isLFD={isLFD}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      </div>
    </div>
  );
};

export default L_vsa;
