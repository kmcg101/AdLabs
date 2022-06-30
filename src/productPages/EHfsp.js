import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/ehfsp.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const hfspMedia = {
  position: "absolute",
  width: "620px",
  height: "278px",
  top: "10px",
  left: "10px",
  zIndex: "100",
};

const E_hfsp = (props) => {
  const elevatorFileError = props.elevatorFileError;
  const svgFile = props.svgFile;

  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };
  return (
    <div className="elevatorProductContainer">
      <div className="backgroundImageContainer">
        <img alt="" className="backgroundImage" src={background}></img>
      </div>
      <div className="eHFSPImage" style={hfspMedia}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          droppedFileType="elevator"
          svgFile={svgFile}
        />
      </div>
    </div>
  );
};

export default E_hfsp;
