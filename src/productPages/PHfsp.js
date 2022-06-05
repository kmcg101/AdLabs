import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/phfsp.png";

const P_hfsp = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };

  const pHfspContent = {
    width: "79%",
    height: "150px",
    position: "absolute",
    left: "140px",
    top: "0px",
    border: "3px pink solid",
  };
  const pHalfScreen = {
    position: "absolute",
    left: "140px",
    top: "175px",
    width: "79%",
    height: "150px",
    border: "3px pink solid",
  };

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div style={pHalfScreen}>
        <Dropzone
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="portrait"
        />
      </div>
      <div style={pHfspContent}></div>
    </div>
  );
};

export default P_hfsp;
