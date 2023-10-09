import React from "react";
import LBint from "../productPages/LBint";
import LFsa from "../productPages/LFsa";
import LVsa from "../productPages/LVsa";
import LHfsp from "../productPages/LHfsp";
import LFsbi from "../productPages/LFsbi";

import "../productPages/pageAndProductStyle.css";

const PageLFD = ({ productIndex, bintBGColor, noBintImages, isBlackText, svgFile, lfdFile, pfdFile, handleDropzoneChanges, handleWarningMessageText, shakeDropzoneBGImage, handleContinueButtonDisabled }) => {
  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <LBint
          noBintImages={noBintImages}
          isBlackText={isBlackText}
          bintBGColor={bintBGColor}
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          productIndex={productIndex}
          shakeDropzoneBGImage={shakeDropzoneBGImage}
          lfdFile={lfdFile}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      ) : null}
      {productIndex === 1 ? (
        <LFsa handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} productIndex={productIndex} shakeDropzoneBGImage={shakeDropzoneBGImage} lfdFile={lfdFile} pfdFile={pfdFile} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
      {productIndex === 2 ? <LHfsp handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} productIndex={productIndex} shakeDropzoneBGImage={shakeDropzoneBGImage} lfdFile={lfdFile} handleContinueButtonDisabled={handleContinueButtonDisabled} /> : null}
      {productIndex === 3 ? (
        <LVsa handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} productIndex={productIndex} shakeDropzoneBGImage={shakeDropzoneBGImage} lfdFile={lfdFile} pfdFile={pfdFile} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
      {productIndex === 4 ? (
        <LFsbi handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} productIndex={productIndex} svgFile={svgFile} shakeDropzoneBGImage={shakeDropzoneBGImage} lfdFile={lfdFile} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
    </div>
  );
};

export default PageLFD;
