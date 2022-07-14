import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lvsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const L_vsa = (props) => {
  const vsaImage = {
    width: "360px",
    height: "640px",
    position: "absolute",
    left: "306px",
    top: "20px",
    zIndex: "100",
  };

  const lfdFileError = props.lfdFileError;
  const svgFile = props.svgFile;
  const productIndex = props.productIndex;
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };
  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="lVSAImage" style={vsaImage}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.videoOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          droppedFileType="landscape"
          svgFile={svgFile}
        />
      </div>
    </div>
  );
};

export default L_vsa;
