import React from "react";
import EBint from "../productPages/EBint";
import EFsa from "../productPages/EFsa";
import EVsa from "../productPages/EVsa";
import EHfsp from "../productPages/EHfsp";
import EFsbi from "../productPages/EFsbi";

import "../productPages/pageAndProductStyle.css";

const PageElevator = ({
  shakeDropzoneBGImage,
  handleWarningMessageText,
  handleDropzoneChanges,
  productIndex,
  bintBGColor,
  isBlackText,
  svgFile,
  elevatorFile,
  handleContinueButtonDisabled,
}) => {
  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <EBint
          isBlackText={isBlackText}
          bintBGColor={bintBGColor}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      ) : null}
      {productIndex === 1 ? (
        <EFsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      ) : null}
      {productIndex === 2 ? (
        <EHfsp
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      ) : null}
      {productIndex === 3 ? (
        <EVsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      ) : null}
      {productIndex === 4 ? (
        <EFsbi
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          elevatorFile={elevatorFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      ) : null}
    </div>
  );
};

export default PageElevator;
