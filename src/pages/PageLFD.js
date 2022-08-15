import React from "react";
import LBint from "../productPages/LBint";
import LFsa from "../productPages/LFsa";
import LVsa from "../productPages/LVsa";
import LHfsp from "../productPages/LHfsp";
import LFsbi from "../productPages/LFsbi";

import "../productPages/pageAndProductStyle.css";

const PageLFD = (props) => {
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
        <LBint
          isBlackText={isBlackText}
          bintBGColor={bintBGColor}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      ) : null}
      {productIndex === 1 ? (
        <LFsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
        />
      ) : null}
      {productIndex === 2 ? (
        <LHfsp
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
        />
      ) : null}
      {productIndex === 3 ? (
        <LVsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={props.shakeDropzoneBGImage}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
        />
      ) : null}
      {productIndex === 4 ? (
        <LFsbi
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

export default PageLFD;
