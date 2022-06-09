import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lvsa.png";

const L_vsa = (props) => {
  const vsaImage = {
    width: "28%",
    height: "88%",
    position: "absolute",
    left: "166px",
    top: "11px",
    zIndex: "100"
  };
 

  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div style={vsaImage}>
        <Dropzone
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="landscape"
        />
      </div>
    </div>
  );
};

export default L_vsa;
