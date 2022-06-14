import React from "react";
import PBint from "../productPages/PBint";
import PFsa from "../productPages/PFsa";
import PVsa from "../productPages/PVsa";
import PHfsp from "../productPages/PHfsp";
import PFsbi from "../productPages/PFsbi";

import '../productPages/pageAndProductStyle.css'

const PagePFD = (props) => { 
  const productIndex = props.productIndex;
  const inputValues = props.inputValues;

  const handlePFDDropzoneChanges = (name, value, droppedFileType) => {
    props.handleAllDropzoneChangesParent(name, value, droppedFileType);
  }

  return (
    <div className='pageContainer'>
    {productIndex === 0 ? <PBint
      handleAllDropzoneChangesParent={handlePFDDropzoneChanges}
      productIndex={productIndex}
    /> : null}
    {productIndex === 1 ? <PFsa
      handleAllDropzoneChangesParent={handlePFDDropzoneChanges}
      productIndex={productIndex}
    /> : null}
    {productIndex === 2 ? <PHfsp
      handleAllDropzoneChangesParent={handlePFDDropzoneChanges}
      productIndex={productIndex}
    /> : null}
    {productIndex === 3 ? <PVsa
      handleAllDropzoneChangesParent={handlePFDDropzoneChanges}
      productIndex={productIndex}
    /> : null}
    {productIndex === 4 ? <PFsbi
      handleAllDropzoneChangesParent={handlePFDDropzoneChanges}
      productIndex={productIndex}
    /> : null}


  </div>
   
           
        
  )
}

export default PagePFD;