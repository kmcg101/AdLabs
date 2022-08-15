import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../DropzoneVSA";
import background from "../assets/pvsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const P_vsa = (props) => {
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };
  const pVsaImage = {
    width: "360px",
    height: "640px",
    zIndex: "100",
    position: "absolute",
    left: "24px",
    top: "24px",
  };

  const svgFile = props.svgFile;
  const lfdFile = props.lfdFile;
  const pfdFile = props.pfdFile;
  const isLFD = false;
  const productIndex = props.productIndex;

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="pVSAImage" style={pVsaImage}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          handleWarningMessageText={props.handleWarningMessageText}
          droppedFileType="portrait"
          svgFile={svgFile}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
          isLFD={isLFD}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      </div>
    </div>
  );
};

export default P_vsa;
