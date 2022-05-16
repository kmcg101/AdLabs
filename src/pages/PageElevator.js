import React from "react";
import EBint from "../productPages/EBint";
import EFsa from "../productPages/EFsa";
import EVsa from "../productPages/EVsa";
import EHfsp from "../productPages/EHfsp";
import EFsbi from "../productPages/EFsbi";

import '../productPages/elevatorProductStyle.css'

const PageElevator = (props) => {
  const handleElevatorDropzoneChanges = (name, value, droppedFileType) => {
    props.handleAllDropzoneChangesParent(name, value, droppedFileType);
  }
  const productIndex = props.productIndex;
  const inputValues = props.inputValues;

  return (
    <div className='elevatorPageContainer'>
      {productIndex === 0 ? <EBint
        handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
        productIndex={productIndex}
        assetType={inputValues.mediaType}
      /> : null}
      {productIndex === 1 ? <EFsa
        handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
        productIndex={productIndex}
        assetType={inputValues.mediaType}
      /> : null}
      {productIndex === 2 ? <EHfsp
        handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
        productIndex={productIndex}
        assetType={inputValues.mediaType}
      /> : null}
      {productIndex === 3 ? <EVsa
        handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
        productIndex={productIndex}
        assetType={inputValues.mediaType}
      /> : null}
      {productIndex === 4 ? <EFsbi
        handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
        productIndex={productIndex}
        assetType={inputValues.mediaType}
      /> : null}


    </div>



  )
}

export default PageElevator;