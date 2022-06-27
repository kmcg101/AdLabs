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

  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <EBint
          elevatorFileError={elevatorFileError}
          standardAdFileError={standardAdFileError}
          isBlackText={isBlackText}
          bintBGColor={bintBGColor}
          handleDropzoneChanges={handleDropzoneChanges}
        />
      ) : null}
      {productIndex === 1 ? (
        <EFsa
          elevatorFileError={elevatorFileError}
          handleDropzoneChanges={handleDropzoneChanges}
        />
      ) : null}
      {productIndex === 2 ? (
        <EHfsp
          elevatorFileError={elevatorFileError}
          handleDropzoneChanges={handleDropzoneChanges}
        />
      ) : null}
      {productIndex === 3 ? (
        <EVsa
          elevatorFileError={elevatorFileError}
          handleDropzoneChanges={handleDropzoneChanges}
        />
      ) : null}
      {productIndex === 4 ? (
        <EFsbi
          elevatorFileError={elevatorFileError}
          svgFileError={svgFileError}
          handleDropzoneChanges={handleDropzoneChanges}
        />
      ) : null}
    </div>
  );
};

export default PageElevator;
