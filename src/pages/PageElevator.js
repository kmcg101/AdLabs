import React from "react";
import EBint from "../productPages/EBint";
import EFsa from "../productPages/EFsa";
import EVsa from "../productPages/EVsa";
import EHfsp from "../productPages/EHfsp";
import EFsbi from "../productPages/EFsbi";

import "../productPages/pageAndProductStyle.css";

const PageElevator = (props) => {
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };
  const productIndex = props.productIndex;
  const bintBGColor = props.bintBGColor;
  const isBlackText = props.isBlackText;
  const svgFile = props.svgFile;
  const elevatorFile = props.elevatorFile;

  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <EBint
          isBlackText={isBlackText}
          bintBGColor={bintBGColor}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      ) : null}
      {productIndex === 1 ? (
        <EFsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      ) : null}
      {productIndex === 2 ? (
        <EHfsp
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      ) : null}
      {productIndex === 3 ? (
        <EVsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      ) : null}
      {productIndex === 4 ? (
        <EFsbi
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      ) : null}
    </div>
  );
};

export default PageElevator;
