import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lhfsp.png";

const L_hfsp = (props) => {
  
  const lHalfScreen = {
    position: "absolute",
    left: "150px",
    top: "12px",
    width: "77.5%",
    height: "241px",
    zIndex: "100"
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
    </div>
  );
};

export default L_hfsp;
