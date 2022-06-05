import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lhfsp.png";

const L_hfsp = (props) => {
  const lHfspContent = {
    width: "79%",
    height: "150px",
    position: "absolute",
    left: "140px",
    top: "0px",
    border: "3px pink solid",
  };
  const lHalfScreen = {
    position: "absolute",
    left: "140px",
    top: "175px",
    width: "79%",
    height: "150px",
    border: "3px pink solid",
  };

  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div style={lHalfScreen}>
        <Dropzone
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="landscape"
        />
      </div>
      <div style={lHfspContent}></div>
    </div>
  );
};

export default L_hfsp;
