import React, { useContext } from "react";
import EBint from "../productPages/EBint";
import EFsa from "../productPages/EFsa";
import EVsa from "../productPages/EVsa";
import EHfsp from "../productPages/EHfsp";
import EFsbi from "../productPages/EFsbi";

import { OpacityContext } from "../App"

import "../productPages/pageAndProductStyle.css";

export default function PageElevator({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {

  const { productIndex } = useContext(OpacityContext);


  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <EBint
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      ) : null}
      {productIndex === 1 ? (
        <EFsa handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
      {productIndex === 2 ? (
        <EHfsp handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
      {productIndex === 3 ? (
        <EVsa handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
      {productIndex === 4 ? (
        <EFsbi handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
    </div>
  );
};

