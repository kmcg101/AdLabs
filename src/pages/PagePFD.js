import React, { useContext } from "react";
import PBint from "../productPages/PBint";
import PFsa from "../productPages/PFsa";
import PVsa from "../productPages/PVsa";
import PHfsp from "../productPages/PHfsp";
import PFsbi from "../productPages/PFsbi";

import { OpacityContext } from "../App"

import "../productPages/pageAndProductStyle.css";

export default function PagePFD({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {

  const { productIndex } = useContext(OpacityContext);

  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <PBint

          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      ) : null}
      {productIndex === 1 ? (
        <PFsa handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
      {productIndex === 2 ? <PHfsp handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} /> : null}
      {productIndex === 3 ? (
        <PVsa handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
      {productIndex === 4 ? (
        <PFsbi handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
    </div>
  );
};


