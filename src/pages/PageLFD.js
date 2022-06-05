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

  const handleLFDDropzoneChanges = (name, value, droppedFileType) => {
    props.handleAllDropzoneChangesParent(name, value, droppedFileType);
  }

  return (
    <div className='landscapePageContainer'>
    {productIndex === 0 ? <LBint
      handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
      productIndex={productIndex}
    /> : null}
    {productIndex === 1 ? <LFsa
      handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
      productIndex={productIndex}
    /> : null}
    {productIndex === 2 ? <LHfsp
      handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
      productIndex={productIndex}
    /> : null}
    {productIndex === 3 ? <LVsa
      handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
      productIndex={productIndex}
    /> : null}
    {productIndex === 4 ? <LFsbi
      handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
      productIndex={productIndex}
    /> : null}


  </div>
   
           
        
  )
}

export default PageLFD;