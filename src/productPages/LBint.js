import React from "react";
import "./pageAndProductStyle.css";
import Dropzone from "../Dropzone";
import blackTextImage from "../assets/lbintBlackText.png";
import whiteTextImage from "../assets/lbintWhiteText.png";

const L_bint = (props) => {
  const handleAllDropzoneChanges = (name, value) => {
    props.handleAllDropzoneChangesParent(name, value);
  };
  const acceptedFileTypeStringStandardAd = "video/mp4";
  const acceptedFileTypeString = "image/png, image/jpg, image/jpeg";
  const  bintBGColorPre = props.bintBGColor;
  const bintBGColor = "#" + bintBGColorPre
  const isBlackText = props.isBlackText;

  const lBint = {
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
  const bgStyle = {
    backgroundColor: bintBGColor
}


  return (
    <div className="landscapeProductContainer">

      <div style={bgStyle} className='backgroundImageContainer'>
        <img alt="" className="backgroundImageContainer" src={isBlackText ? blackTextImage : whiteTextImage}></img>
      </div>


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
