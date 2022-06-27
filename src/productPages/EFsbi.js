import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/efsbi.png";
import DROPZONE_DATA from "../DROPZONE_DATA";

const E_fsbi = (props) => {
  const elevatorFileError = props.elevatorFileError;
  const svgFileError = props.svgFileError;

  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };
  const eFSBILogo = {
    width: "90px",
    height: "90px",
    position: "absolute",
    left: "500px",
    top: "10px",
    zIndex: "100",
  };
  return (
    <div className="elevatorProductContainer">
      <div className="backgroundImageContainer">
        <img alt="" className="backgroundImage" src={background}></img>
      </div>
      <div className="eFullScreen">
        {" "}
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.imageOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          droppedFileType="elevator"
        />
      </div>
      <div className="eFSBISVG" style={eFSBILogo}>
        <Dropzone
          acceptedFileTypeString={DROPZONE_DATA.data.svgOnly}
          handleDropzoneChanges={handleDropzoneChanges}
          droppedFileType="svg"
        />
      </div>
    </div>
  );
};

export default E_fsbi;
