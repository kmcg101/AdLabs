import React from "react";
import LBint from "../productPages/LBint";
import LFsa from "../productPages/LFsa";
import LVsa from "../productPages/LVsa";
import LHfsp from "../productPages/LHfsp";
import LFsbi from "../productPages/LFsbi";

import "../productPages/pageAndProductStyle.css";

const PageLFD = ({
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
        <LBint
          isBlackText={isBlackText}
          bintBGColor={bintBGColor}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          lfdFile={lfdFile}
        />
      ) : null}
      {productIndex === 1 ? (
        <LFsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
        />
      ) : null}
      {productIndex === 2 ? (
        <LHfsp
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          lfdFile={lfdFile}
        />
      ) : null}
      {productIndex === 3 ? (
        <LVsa
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          lfdFile={lfdFile}
          pfdFile={pfdFile}
        />
      ) : null}
      {productIndex === 4 ? (
        <LFsbi
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          svgFile={svgFile}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          lfdFile={lfdFile}
        />
      ) : null}
    </div>
  );
};

export default PageLFD;
