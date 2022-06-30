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
  const elevatorFileError = props.elevatorFileError;
  const svgFileError = props.svgFileError;
  const standardAdFileError = props.standardAdFileError;
  const svgFile = props.svgFile;

  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <EBint
          elevatorFileError={elevatorFileError}
          standardAdFileError={standardAdFileError}
          isBlackText={isBlackText}
          bintBGColor={bintBGColor}
          handleDropzoneChanges={handleDropzoneChanges}
          svgFile={svgFile}
        />
      ) : null}
      {productIndex === 1 ? (
        <EFsa
          elevatorFileError={elevatorFileError}
          handleDropzoneChanges={handleDropzoneChanges}
          svgFile={svgFile}
        />
      ) : null}
      {productIndex === 2 ? (
        <EHfsp
          elevatorFileError={elevatorFileError}
          handleDropzoneChanges={handleDropzoneChanges}
          svgFile={svgFile}
        />
      ) : null}
      {productIndex === 3 ? (
        <EVsa
          elevatorFileError={elevatorFileError}
          handleDropzoneChanges={handleDropzoneChanges}
          svgFile={svgFile}
        />
      ) : null}
      {productIndex === 4 ? (
        <EFsbi
          elevatorFileError={elevatorFileError}
          svgFileError={svgFileError}
          handleDropzoneChanges={handleDropzoneChanges}
          svgFile={svgFile}
        />
      ) : null}
    </div>
  );
};

export default PageElevator;
