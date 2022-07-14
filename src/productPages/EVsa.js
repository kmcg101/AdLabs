import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
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

const E_vsa = (props) => {
  const elevatorFileError = props.elevatorFileError;
  const svgFile = props.svgFile;
  const productIndex = props.productIndex;
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };

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
          droppedFileType="elevator"
          svgFile={svgFile}
        />
      </div>
    </div>
  );
};

export default E_vsa;
