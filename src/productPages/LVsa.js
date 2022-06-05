import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lvsa.png";

const L_vsa = (props) => {
  const vsaImage = {
    width: "24%",
    height: "60%",
    border: "solid black 1px",
    position: "absolute",
    left: "150px",
    top: "10px",
  };
  const vsaContent = {
    width: "36.5%",
    height: "60%",
    border: "solid pink 1px",
    position: "absolute",
    left: "370px",
    top: "85px",
    color: "white",
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
      <div style={vsaContent}>Content</div>
    </div>
  );
};

export default L_vsa;
