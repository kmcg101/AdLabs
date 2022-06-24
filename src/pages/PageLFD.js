import React from "react";
import LBint from "../productPages/LBint";
import LFsa from "../productPages/LFsa";
import LVsa from "../productPages/LVsa";
import LHfsp from "../productPages/LHfsp";
import LFsbi from "../productPages/LFsbi";

import '../productPages/pageAndProductStyle.css'

const PageLFD = (props) => {
  const productIndex = props.productIndex;
  const inputValues = props.inputValues;
  const bintBGColor = props.bintBGColor;
  const isBlackText = props.isBlackText;

  const lfdFileError = props.lfdFileError
  const svgFileError = props.svgFileError
  const standardAdFileError = props.standardAdFileError

  const handleLFDDropzoneChanges = (name, value, droppedFileType) => {
    props.handleAllDropzoneChangesParent(name, value, droppedFileType);
  }

  return (
    <div className='pageContainer'>
      {productIndex === 0 ? <LBint
        lfdFileError={lfdFileError}
        standardAdFileError={standardAdFileError}
        isBlackText={isBlackText}
        bintBGColor={bintBGColor}
        handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
        productIndex={productIndex}
      /> : null}
      {productIndex === 1 ? <LFsa
        lfdFileError={lfdFileError}
        handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
        productIndex={productIndex}
      /> : null}
      {productIndex === 2 ? <LHfsp
        lfdFileError={lfdFileError}
        handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
        productIndex={productIndex}
      /> : null}
      {productIndex === 3 ? <LVsa
        lfdFileError={lfdFileError}
        handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
        productIndex={productIndex}
      /> : null}
      {productIndex === 4 ? <LFsbi
        lfdFileError={lfdFileError}
        svgFileError={svgFileError}
        handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
        productIndex={productIndex}
      /> : null}


    </div>



  )
}

export default PageLFD;