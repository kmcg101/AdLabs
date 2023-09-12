import React from "react";
import DATA_PRODUCTS from "./DATA_PRODUCTS";

export const ValidateDroppedFile = (w, h, productIndex) => {
  const expectedPixelsE = DATA_PRODUCTS.data[productIndex].pixels.ePixels;
  const expectedPixelsL = DATA_PRODUCTS.data[productIndex].pixels.lPixels;
  const expectedPixelsP = DATA_PRODUCTS.data[productIndex].pixels.pPixels;

  const expectedSizeE = DATA_PRODUCTS.data[productIndex].acceptedSizeText.eSizes;
  const expectedSizeL = DATA_PRODUCTS.data[productIndex].acceptedSizeText.lSizes;
  const expectedSizeP = DATA_PRODUCTS.data[productIndex].acceptedSizeText.pSizes;
  let expectedPixels;
  {
    droppedFileType === "elevator"
      ? (expectedPixels = expectedPixelsE)
      : droppedFileType === "landscape"
      ? (expectedPixels = expectedPixelsL)
      : (expectedPixels = expectedPixelsP);
  }
  let acceptedSizes;
  {
    droppedFileType === "elevator"
      ? (acceptedSizes = expectedSizeE)
      : droppedFileType === "landscape"
      ? (acceptedSizes = expectedSizeL)
      : (acceptedSizes = expectedSizeP);
  }
  const receivedPixels = w * h;
  console.log("expected = ", expectedPixels);
  console.log("received = ", receivedPixels);

  const exists = Object.values(expectedPixels).includes(receivedPixels);

  if (droppedFileType === "svg" || droppedFileType === "standardAd") {
    handleWarningMessageText("", false);
    return true;
  } else if (exists) {
    console.log("right size");
    handleWarningMessageText("", false);
    return true;
  } else {
    handleWarningMessageText(`dropped file is wrong size. Requred dimensions: ${acceptedSizes}`, true);
    console.log("wrong size");
    // setFiles([]);

    // handleDropzoneChanges("payload", null);

    return false;
  }
};
