import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/pfsbi.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const P_fsbi = (props) => {
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };

  const pFullScreen = {
    width: "720px",
    height: "960px",
    position: "absolute",
    left: "0px",
    top: "0px",
    zIndex: "100",
  };

  const pfdFileError = props.pfdFileError;
  const svgFileError = props.svgFileError;

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className="pFullScreen" style={pFullScreen}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          droppedFileType="portrait"
        />
      </div>
    </div>
  );
};

export default P_fsbi;
