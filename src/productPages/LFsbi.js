import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lfsbi.png";

const L_fsbi = (props) => {
  const lFSBILogo = {
    width: "17%",
    height: "20%",
    position: "absolute",
    right: "17px",
    top: "10px",
    zIndex: '100'
  };
  const lFullScreen = {
    width: "79.5%",
    height: "93%",
    position: "absolute",
    left: "140px",
    top: "0px",
    zIndex: "100"
}

  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div style={lFullScreen} className="lFullScreen">
        <Dropzone
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="landscape"
        />
      </div>
      <div style={lFSBILogo}>
      
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
