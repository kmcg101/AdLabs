import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lfsbi.png";

const L_fsbi = (props) => {
  const lFSBILogo = {
    width: "20%",
    height: "20%",
    border: "solid black 1px",
    position: "absolute",
    right: "50px",
    top: "25px",
    zIndex: '100'
  };

  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="lFullScreen">
        <Dropzone
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="landscape"
        />
      </div>
      <div style={lFSBILogo}>
        {" "}
        <Dropzone
          isSVG="true"
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="svg"
        />
      </div>
    </div>
  );
};

export default L_fsbi;
