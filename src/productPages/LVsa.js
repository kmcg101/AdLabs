import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lvsa.png";

const L_vsa = (props) => {
  const vsaImage = {
    width: "360px",
    height: "640px",
    position: "absolute",
    left: "306px",
    top: "20px",
    zIndex: "100"
  };
 
  const acceptedFileTypeString = "video/mp4";

  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className='lVSAImage' style={vsaImage}>
        <Dropzone
          acceptedFileTypeString={acceptedFileTypeString}
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
