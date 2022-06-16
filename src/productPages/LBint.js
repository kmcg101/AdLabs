import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import background from "../assets/lbint.png";

const L_bint = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  const acceptedFileTypeStringStandardAd = "video/mp4";
  const acceptedFileTypeString = "image/png, image/jpg, image/jpeg";

  const lBint =  {
    top: "22px",
    left: "1081px",
    width: "160px",
    height: "640px",
    position: "absolute",
    zIndex: "100"
}

  const lStandardAd = {
    top: "22px",
    left: "276px",
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
          acceptedFileTypeString={acceptedFileTypeStringStandardAd} 
          isStandardAd="true"
          handleAllDropzoneChanges={handleAllDropzoneChanges}
          droppedFile={props.droppedFile}
          productIndex={props.productIndex}
          droppedFileType="standardAd"
        />
      </div>
      <div style={lBint} className="lBintAd">
        
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

export default L_bint;
