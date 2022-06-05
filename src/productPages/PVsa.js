import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/pvsa.png";

const P_vsa = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  const pVsaImage = {
    width: "24%",
    height: "60%",
    border: "solid black 1px",
    position: "absolute",
    left: "150px",
    top: "10px",
  };
  const pVsaContent = {
    width: "36.5%",
    height: "60%",
    border: "solid pink 1px",
    position: "absolute",
    left: "370px",
    top: "85px",
    color: "white",
  };
  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div style={pVsaImage}>
        <Dropzone
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="portrait"
        />
      </div>
      <div style={pVsaContent}>Content</div>
    </div>
  );
};

export default P_vsa;
