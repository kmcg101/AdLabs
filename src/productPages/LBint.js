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
    left: "1086px",
    width: "160px",
    height: "640px",
    position: "absolute",
    zIndex: "100"
}

  const lStandardAd = {
    top: "10px",
    left: "271px",
    width: "768px",
    height: "432px",
    position: "absolute",
    zIndex: "100"
}


  return (
    <div className="landscapeProductContainer">
      <img alt="" className="backgroundImageContainer" src={background}></img>

      <div className='lStandardAd' style={lStandardAd} >
       
        <Dropzone
          isStandardAd="true"
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="standardAd"
        />
      </div>
      <div style={lBint} className="lBintAd">
        
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
