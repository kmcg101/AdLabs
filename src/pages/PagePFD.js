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

  const pfdFileError = props.pfdFileError;
  const svgFileError = props.svgFileError;
  const standardAdFileError = props.standardAdFileError;
  const svgFile = props.svgFile;

  const handleDropzoneChanges = (name, value, droppedFileType) => {
    props.handleDropzoneChanges(name, value, droppedFileType);
  };

  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <PBint
          pfdFileError={pfdFileError}
          standardAdFileError={standardAdFileError}
          isBlackText={isBlackText}
          bintBGColor={bintBGColor}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
        />
      ) : null}
      {productIndex === 1 ? (
        <PFsa
          pfdFileError={pfdFileError}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
        />
      ) : null}
      {productIndex === 2 ? (
        <PHfsp
          pfdFileError={pfdFileError}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
        />
      ) : null}
      {productIndex === 3 ? (
        <PVsa
          pfdFileError={pfdFileError}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={props.handleWarningMessageText}
          productIndex={productIndex}
        />
      ) : null}
      {productIndex === 4 ? (
        <PFsbi
          pfdFileError={pfdFileError}
          svgFileError={svgFileError}
          handleDropzoneChanges={handleDropzoneChanges}
          productIndex={productIndex}
          svgFile={svgFile}
        />
      ) : null}
    </div>
  );
};

export default PagePFD;
