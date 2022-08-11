import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";
import bgImage from "./assets/dropzoneBGImage.png";
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
const dzGradientDiv = {
  width: "100%",
  height: "100%",
  backgroundImage: "linear-gradient( 180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
  position: "absolute",
  zIndex: "50",
};

function DropzoneVSA(props) {
  /////////////////////////////  files accepted and message on mouse over

  const acceptedFileTypeString = props.acceptedFileTypeString;
  const acceptedFileTypeMessageString = getHintString(acceptedFileTypeString);
  const lfdFile = props.lfdFile;
  const pfdFile = props.pfdFile;
  const droppedFileType = props.droppedFileType;
  const productIndex = props.productIndex;
  const shakeDropzoneBGImage = props.shakeDropzoneBGImage;

  const ref = useRef(null);

  const handleWarningMessageText = (txt, useIcon) => {
    props.handleWarningMessageText(txt, useIcon);
  };

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

  // this is where dropped files are added
  // only used for preview
  const [files, setFiles] = useState([]);

  const createVSAVideo = () => {
    ///return <img src={URL.createObjectURL(svgFile.payload[0])} style={{ width: "100%" }} alt="preview" />;
  };

  useEffect(() => {
    if (Object.keys(pfdFile).length > 0) {
      const el = ref.current;
      const elem = document.createElement("video");

      elem.autoplay = true;
      elem.style = `position: absolute;`;
      elem.src = URL.createObjectURL(pfdFile.payload);

      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
      el.appendChild(elem);
    }
  }, [pfdFile.payload]);

  const validateDroppedFile = (w, h) => {
    const expectedPixelsE = DATA_PRODUCTS.data[productIndex].pixels.ePixels;
    const expectedPixelsL = DATA_PRODUCTS.data[productIndex].pixels.lPixels;
    const expectedPixelsP = DATA_PRODUCTS.data[productIndex].pixels.pPixels;

    const expectedSizeE = DATA_PRODUCTS.data[productIndex].acceptedSizeText.eSizes;
    const expectedSizeL = DATA_PRODUCTS.data[productIndex].acceptedSizeText.lSizes;
    const expectedSizeP = DATA_PRODUCTS.data[productIndex].acceptedSizeText.pSizes;
    let expectedPixels;
    {
      droppedFileType === "landscape" ? (expectedPixels = expectedPixelsL) : (expectedPixels = expectedPixelsP);
    }
    let acceptedSizes;
    {
      droppedFileType === "landscape" ? (acceptedSizes = expectedSizeL) : (acceptedSizes = expectedSizeP);
    }
    const receivedPixels = w * h;

    const exists = Object.values(expectedPixels).includes(receivedPixels);

    if (exists) {
      console.log("right size");
      handleWarningMessageText("", false);
      return true;
    } else {
      handleWarningMessageText(`dropped file is wrong size. Requred dimensions: ${acceptedSizes}`, true);
      console.log("wrong size");
      setFiles([]);
      handleDropzoneChanges("payload", null);
      return false;
    }
  };

  const handleDropzoneChanges = (name, value) => {
    // this is special for VSA.  Same file always used for both so populate both
    // dropped file type = elevator, landscape, portrait, standard, svg.
    // this writes the name/value pair to the approprate dropped file in app.js

    props.handleDropzoneChanges(name, value, "landscape");
    props.handleDropzoneChanges(name, value, "portrait");
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
      console.log("rejected");
      handleWarningMessageText("wrong file type dropped.", true);
    },

    // accepted files are ones that are the correct file type.  File size is checked later
    onDropAccepted: (acceptedFiles) => {
      // clear out any populated videos

      setFiles(
        acceptedFiles.map((myfile) =>
          Object.assign(myfile, {
            preview: URL.createObjectURL(myfile),
          })
        )
      );

      const newFile = acceptedFiles[0];

      // need to interrogate video for its secrets
      const video = document.createElement("video");
      video.addEventListener("canplay", (event) => {
        const droppedFileIsCorrectSize = validateDroppedFile(video.videoWidth, video.videoHeight);
        if (droppedFileIsCorrectSize) {
          handleDropzoneChanges("payload", newFile);
          handleDropzoneChanges("width", video.videoWidth);
          handleDropzoneChanges("height", video.videoHeight);
          handleDropzoneChanges("type", newFile.type);
          handleDropzoneChanges("size", newFile.size);
          handleDropzoneChanges("name", newFile.name);
        }
      });
      video.src = URL.createObjectURL(newFile);
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
            {Object.keys(lfdFile).length + Object.keys(pfdFile).length === 0 ? (
              <div
                style={dzBackgroundImage}
                className={`dzBackgroundImage ${shakeDropzoneBGImage ? "shakeIt" : ""}`}
              ></div>
            ) : null}
            <div ref={ref} className="dropzoneImageParent">
              {/* {videoPreview} */}
            </div>
          </div>

          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
}
export default DropzoneVSA;
