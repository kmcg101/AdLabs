import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/efsa.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const E_fsa = (props) => {
  const elevatorFileError = props.elevatorFileError;
  const svgFile = props.svgFile;

  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };
  return (
    <div className="elevatorProductContainer">
      <div className="eFullScreen">
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageAndVideo}
          handleDropzoneChanges={handleDropzoneChanges}
          droppedFileType="elevator"
          svgFile={svgFile}
        />
      </div>
      <div className="backgroundImageContainer">
        <img alt="" className="backgroundImage" src={background}></img>
      </div>
    </div>
  );
};

export default E_fsa;
