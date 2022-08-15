import React from "react";
import PBint from "../productPages/PBint";
import PFsa from "../productPages/PFsa";
import PVsa from "../productPages/PVsa";
import PHfsp from "../productPages/PHfsp";
import PFsbi from "../productPages/PFsbi";

import "../productPages/pageAndProductStyle.css";

const PagePFD = (props) => {
  const productIndex = props.productIndex;
  const bintBGColor = props.bintBGColor;
  const isBlackText = props.isBlackText;

  const svgFile = props.svgFile;
  const lfdFile = props.lfdFile;
  const pfdFile = props.pfdFile;

  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };

  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <PBint
          isBlackText={isBlackText}
          bintBGColor={bintBGColor}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
        />
      ) : null}
      {productIndex === 1 ? (
        <PFsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
        />
      ) : null}
      {productIndex === 2 ? (
        <PHfsp
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      ) : null}
      {productIndex === 3 ? (
        <PVsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
        />
      ) : null}
      {productIndex === 4 ? (
        <PFsbi
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      ) : null}
    </div>
  );
};

export default PagePFD;
