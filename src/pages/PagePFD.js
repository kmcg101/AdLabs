import React from "react";
import PBint from "../productPages/PBint";
import PFsa from "../productPages/PFsa";
import PVsa from "../productPages/PVsa";
import PHfsp from "../productPages/PHfsp";
import PFsbi from "../productPages/PFsbi";

import "../productPages/pageAndProductStyle.css";

const PagePFD = ({
  productIndex,
  bintBGColor,
  isBlackText,
  svgFile,
  lfdFile,
  pfdFile,
  handleDropzoneChanges,
  handleWarningMessageText,
  shakeDropzoneBGImage,
}) => {
  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <PBint
          isBlackText={isBlackText}
          bintBGColor={bintBGColor}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
        />
      ) : null}
      {productIndex === 1 ? (
        <PFsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
        />
      ) : null}
      {productIndex === 2 ? (
        <PHfsp
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      ) : null}
      {productIndex === 3 ? (
        <PVsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
        />
      ) : null}
      {productIndex === 4 ? (
        <PFsbi
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
        />
      ) : null}
    </div>
  );
};

export default PagePFD;
