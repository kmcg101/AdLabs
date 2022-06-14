import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lfsbi.png";

const L_fsbi = (props) => {
  const lFSBILogo = {
    width: "160px",
    height: "160px",
    position: "absolute",
    left: "1070px",
    top: "10px",
    zIndex: '100'
  };
  const lFullScreen = {
    width: "1024px",
    height: "680px",
    position: "absolute",
    left: "256px",
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
      <div className='lFSBISVG' style={lFSBILogo}>
      
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
