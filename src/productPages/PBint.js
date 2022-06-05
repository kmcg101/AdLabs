import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/pbint.png";

const P_bint = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };

  const pHSContent = {
    width: "24%",
    height: "60%",
    border: "solid black 1px",
    position: "absolute",
    left: "150px",
    top: "10px",
  };
  const pBint = {
    width: "24%",
    height: "60%",
    border: "solid black 1px",
    position: "absolute",
    left: "150px",
    top: "10px",
  };
  const pStandardAd = {
    width: "24%",
    height: "60%",
    border: "solid black 1px",
    position: "absolute",
    left: "150px",
    top: "10px",
  };

  return (
    <div className="portraitProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>
      <div className={pStandardAd}>
        Standard
        <Dropzone
          isStandardAd="true"
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="standardAd"
        />
      </div>
      <div className={pBint}>
        BINT
        <Dropzone
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="portrait"
        />
      </div>
      <div className={pHSContent}>Content0</div>
    </div>
  );
};

export default P_bint;
