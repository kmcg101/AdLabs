import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";
import bgImage from "./assets/dropzoneBGImage.png";
import captureVideoFrame from "capture-video-frame";
import DATA_PRODUCTS from "./DATA_PRODUCTS";

const baseStyle = {
  outline: "white dashed 2px",
};

const acceptStyle = {
  boxShadow: "0px 0px 8px 1px #00e676",
};

const rejectStyle = {
  boxShadow: "0px 0px 8px 1px #ff1744",
};
const dzBackgroundImage = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${bgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: "absolute",
  zIndex: "100",
};

function DropzoneSimple({
  acceptedFileTypeString,
  assetFileToChange,
  droppedFileType,
  productIndex,
  shakeDropzoneBGImage,
  handleWarningMessageText,
  handleDropzoneChanges,
  handleContinueButtonDisabled,
}) {
  /////////////////////////////  files accepted and message on mouse over

  const acceptedFileTypeMessageString = getHintString(acceptedFileTypeString);
  const ref = useRef(null);

  function getHintString(str) {
    let newString = str.split(",");
    let stringArrayMap = newString.map(function(value) {
      let split = value.split("/");
      return split[1];
    });
    return "accepted files: " + stringArrayMap.join(", ");
  }

  //////////////////////////////

  const [showHint, setShowHint] = useState(false);
  const [files, setFiles] = useState([]);

  const validateDroppedFile = (w, h) => {
    const expectedPixelsE = DATA_PRODUCTS.data[productIndex].pixels.ePixels;
    const expectedPixelsL = DATA_PRODUCTS.data[productIndex].pixels.lPixels;
    const expectedPixelsP = DATA_PRODUCTS.data[productIndex].pixels.pPixels;

    const expectedSizeE = DATA_PRODUCTS.data[productIndex].acceptedSizeText.eSizes;
    const expectedSizeL = DATA_PRODUCTS.data[productIndex].acceptedSizeText.lSizes;
    const expectedSizeP = DATA_PRODUCTS.data[productIndex].acceptedSizeText.pSizes;
    let expectedPixels;

    droppedFileType === "elevator"
      ? (expectedPixels = expectedPixelsE)
      : droppedFileType === "landscape"
      ? (expectedPixels = expectedPixelsL)
      : (expectedPixels = expectedPixelsP);

    let acceptedSizes;

    droppedFileType === "elevator"
      ? (acceptedSizes = expectedSizeE)
      : droppedFileType === "landscape"
      ? (acceptedSizes = expectedSizeL)
      : (acceptedSizes = expectedSizeP);

    const receivedPixels = w * h;
    console.log("expected = ", expectedPixels);
    console.log("received = ", receivedPixels);

    const exists = Object.values(expectedPixels).includes(receivedPixels);

    if (droppedFileType === "svg" || droppedFileType === "standardAd") {
      handleWarningMessageText("", false);
      return true;
    } else if (exists) {
      handleWarningMessageText("", false);
      return true;
    } else {
      handleWarningMessageText(`dropped file is wrong size. Requred dimensions: ${acceptedSizes}`, true);
      return false;
    }
  };

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    noClick: false,
    multiple: false,
    accept: acceptedFileTypeString,

    onDropRejected: (rejectedFiles) => {
      handleWarningMessageText("wrong file type dropped.", true);
    },
    onDropAccepted: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((myfile) =>
          Object.assign(myfile, {
            preview: URL.createObjectURL(myfile),
          })
        )
      );
      const newFile = acceptedFiles[0];
      const nameArray = newFile.name.split(".");
      const ext = nameArray[1];

      if (ext !== "mp4") {
        const i = new Image();
        i.onload = () => {
          let reader = new FileReader();
          reader.readAsDataURL(newFile);
          reader.onload = () => {
            const droppedFileIsCorrectSize = validateDroppedFile(i.width, i.height);
            if (droppedFileIsCorrectSize) {
              handleDropzoneChanges("name", newFile.name, droppedFileType);
              handleDropzoneChanges("payload", newFile, droppedFileType);
              handleDropzoneChanges("width", i.width, droppedFileType);
              handleDropzoneChanges("height", i.height, droppedFileType);
              handleDropzoneChanges("type", newFile.type, droppedFileType);
              handleDropzoneChanges("size", newFile.size, droppedFileType);
            }
          };
        };

        i.src = newFile.preview;
      } else {
        // need to interrogate video for its secrets
        const video = document.createElement("video");
        video.addEventListener("canplay", (event) => {
          const droppedFileIsCorrectSize = validateDroppedFile(video.videoWidth, video.videoHeight);
          if (droppedFileIsCorrectSize) {
            handleDropzoneChanges("payload", newFile, droppedFileType);
            handleDropzoneChanges("width", video.videoWidth, droppedFileType);
            handleDropzoneChanges("height", video.videoHeight, droppedFileType);
            handleDropzoneChanges("type", newFile.type, droppedFileType);
            handleDropzoneChanges("size", newFile.size, droppedFileType);
            handleDropzoneChanges("name", newFile.name, droppedFileType);
          }
        });
        video.src = URL.createObjectURL(newFile);
      }
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragAccept, isDragReject]
  );

  useEffect(() => {
    // disable continue button
    if (Object.keys(assetFileToChange).length > 0 && assetFileToChange.payload !== null) {
      handleContinueButtonDisabled(true);
      const el = ref.current;

      // if this is a video, create a video tag
      if (assetFileToChange.payload.type.includes("video")) {
        const elemV = document.createElement("video");
        elemV.style = "position: absolute; z-index: 1;";
        elemV.id = "videoToCapture";

        elemV.src = URL.createObjectURL(assetFileToChange.payload);

        el.appendChild(elemV);

        setTimeout(() => {
          const capturedFrame = captureVideoFrame(elemV, "png");
          handleDropzoneChanges("videoCapture", capturedFrame, droppedFileType);
        }, 200);

        // const mutationObserver = new MutationObserver((entries) => {
        //   console.log("step 4: video mutation obsesrver");
        //   elemV.addEventListener("canplay", () => {
        //     console.log("step 5: can play");
        //     const capturedFrame = captureVideoFrame(elemV, "png");
        //     handleDropzoneChanges("videoCapture", capturedFrame);
        //     mutationObserver.disconnect();
        //   });
        // });
        // mutationObserver.observe(el, { childList: true });
      } else {
        const elemI = document.createElement("img");
        elemI.style = "position: absolute; left: 0px; z-index: 10;";
        elemI.setAttribute("src", URL.createObjectURL(assetFileToChange.payload));
        const el = ref.current;
        while (el.firstChild) {
          el.removeChild(el.lastChild);
        }
        setTimeout(() => {
          // enable continue button
          handleContinueButtonDisabled(false);
          el.appendChild(elemI);
        }, 100);
      }
    }
  }, [assetFileToChange.payload]);

  useEffect(() => {
    if (Object.keys(assetFileToChange).length > 0 && assetFileToChange.payload !== null) {
      const elemI = document.createElement("img");
      elemI.style = "position: absolute; left: 0px; z-index: 10;";
      elemI.setAttribute("src", assetFileToChange.videoCapture.dataUri);
      const el = ref.current;
      while (el.firstChild) {
        el.removeChild(el.lastChild);
      }

      setTimeout(() => {
        // enable continue button.
        handleContinueButtonDisabled(false);
        el.appendChild(elemI);
      }, 100);
    }
  }, [assetFileToChange.videoCapture]);

  return (
    <div>
      <div
        className="dropzoneImageGrandParent"
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
      >
        {showHint ? <div className="dropzoneHint">{acceptedFileTypeMessageString}</div> : null}
        <div {...getRootProps({ style })} className="dropZone">
          <div className="droppedImageHolder">
            {Object.keys(assetFileToChange).length === 0 ? (
              <div
                style={dzBackgroundImage}
                className={`dzBackgroundImage ${shakeDropzoneBGImage ? "shakeIt" : ""}`}
              ></div>
            ) : null}
            <div ref={ref} className="dropzoneImageParent"></div>
          </div>

          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
}
export default DropzoneSimple;
