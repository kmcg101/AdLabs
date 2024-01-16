import React, { useContext } from "react";
import LBint from "../productPages/LBint";
import LFsa from "../productPages/LFsa";
import LVsa from "../productPages/LVsa";
import LHfsp from "../productPages/LHfsp";
import LFsbi from "../productPages/LFsbi";

import { OpacityContext } from "../App"
import "../productPages/pageAndProductStyle.css";

export default function PageLFD({ handleWarningMessageText, handleDropzoneChanges, handleContinueButtonDisabled }) {
  const { productIndex } = useContext(OpacityContext);
  return (
    <div className="pageContainer">
      {productIndex === 0 ? (
        <LBint
          handleDropzoneChanges={handleDropzoneChanges}
          handleWarningMessageText={handleWarningMessageText}
          handleContinueButtonDisabled={handleContinueButtonDisabled}
        />
      ) : null}
      {productIndex === 1 ? (
        <LFsa handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
      {productIndex === 2 ? <LHfsp handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} /> : null}
      {productIndex === 3 ? (
        <LVsa handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
      {productIndex === 4 ? (
        <LFsbi handleDropzoneChanges={handleDropzoneChanges} handleWarningMessageText={handleWarningMessageText} handleContinueButtonDisabled={handleContinueButtonDisabled} />
      ) : null}
    </div>
  );
};


