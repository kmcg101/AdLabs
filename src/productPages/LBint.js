import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lbint.png";

const L_bint = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };


  const lBint =  {
    top: "10px",
    left: "597px",
    width: "89px",
    height: "360px",
    position: "absolute",
    zIndex: "100"
}

  const lStandardAd = {
    top: "12px",
    left: "151px",
    width: "427px",
    height: "238px",
    position: "absolute",
    zIndex: "100"
}


  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>

      <div style={lStandardAd} className="lStandardAd">
       
        <Dropzone
          isStandardAd="true"
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="standardAd"
        />
      </div>
      <div style={lBint} className="lBint">
        
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

export default L_bint;
