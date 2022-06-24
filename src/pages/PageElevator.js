import React from "react";
import EBint from "../productPages/EBint";
import EFsa from "../productPages/EFsa";
import EVsa from "../productPages/EVsa";
import EHfsp from "../productPages/EHfsp";
import EFsbi from "../productPages/EFsbi";

import '../productPages/pageAndProductStyle.css'

const PageElevator = (props) => {
  const handleElevatorDropzoneChanges = (name, value, droppedFileType) => {
    props.handleAllDropzoneChangesParent(name, value, droppedFileType);
  }
  const productIndex = props.productIndex;
  const inputValues = props.inputValues;
  const bintBGColor = props.bintBGColor;
  const isBlackText = props.isBlackText;
  const elevatorFileError = props.elevatorFileError
  const svgFileError = props.svgFileError
  const standardAdFileError = props.standardAdFileError

  return (
    <div className='pageContainer'>
      {productIndex === 0 ? <EBint
        elevatorFileError={elevatorFileError}
        standardAdFileError={standardAdFileError}
        isBlackText={isBlackText}
        bintBGColor={bintBGColor}
        handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
        productIndex={productIndex}
        assetType={inputValues.mediaType}
      /> : null}
      {productIndex === 1 ? <EFsa
        elevatorFileError={elevatorFileError}
        handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
        productIndex={productIndex}
        assetType={inputValues.mediaType}
      /> : null}
      {productIndex === 2 ? <EHfsp
        elevatorFileError={elevatorFileError}
        handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
        productIndex={productIndex}
        assetType={inputValues.mediaType}
      /> : null}
      {productIndex === 3 ? <EVsa
        elevatorFileError={elevatorFileError}
        handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
        productIndex={productIndex}
        assetType={inputValues.mediaType}
      /> : null}
      {productIndex === 4 ? <EFsbi
        elevatorFileError={elevatorFileError}
        svgFileError={svgFileError}
        handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
        productIndex={productIndex}
        assetType={inputValues.mediaType}
      /> : null}


    </div>



  )
}

export default PageElevator;