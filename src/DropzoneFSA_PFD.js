import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";
import captureVideoFrame from "capture-video-frame";
import bgImage from "./assets/dropzoneBGImage.png";
import DATA_PRODUCTS from "./DATA_PRODUCTS";
import { OpacityContext } from "./App"

const baseStyle = {
  outline: "#f5f5f5 dashed 2px",
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

export default function DropzoneFSA_PFD(props) {
  /////////////////////////////  files accepted and message on mouse over
  const { productIndex, shakeDropzoneBGImage, pfdFile, lfdFile } = useContext(OpacityContext);



  const acceptedFileTypeString = props.acceptedFileTypeString;
  const acceptedFileTypeMessageString = getHintString(acceptedFileTypeString);
  const droppedFileType = props.droppedFileType;

  const ref = useRef(null);

  const handleContinueButtonDisabled = (bool) => {
    props.handleContinueButtonDisabled(bool);
  };

  const handleWarningMessageText = (txt, useIcon) => {
    props.handleWarningMessageText(txt, useIcon);
  };
  const handleDropzoneChanges = (name, value) => {
    // this is special for VSA.  Same file always used for both so populate both
    // dropped file type = elevator, landscape, portrait, standard, svg.
    // this writes the name/value pair to the approprate dropped file in app.js

    // this is PFD so it only changes the pfdFile state.
    //props.handleDropzoneChanges(name, value, "landscape");
    props.handleDropzoneChanges(name, value, "portrait");
  };

  function getHintString(str) {
    let newString = str.split(",");
    let stringArrayMap = newString.map(function (value) {
      let split = value.split("/");
      return split[1];
    });
    return "accepted files: " + stringArrayMap.join(", ");
  }

  //////////////////////////////

  const [showHint, setShowHint] = useState(false);

  // this is where dropped files are added
  const [files, setFiles] = useState([]);

  const [pfdAcceptedString, setPfdAcceptedString] = useState("");

  useEffect(() => {
    console.log("running lfdfile.payload effect");
    if (Object.keys(lfdFile).length > 0 && lfdFile.payload !== null) {
      setPfdAcceptedString(lfdFile.payload.type);
    }
  }, [lfdFile.payload]);

  useEffect(() => {
    // you wan this to run after drop and when lfd and pfd file state has been set
    // just running after drop will not work because state will not be set yet
    // this keeps it from running on first render

    // at this point a file has been dropped in LFD and
    // both PFD and LFD files have been written to

    if (Object.keys(pfdFile).length > 0 && pfdFile.payload !== null) {
      handleContinueButtonDisabled(true);
      console.log("running PFD change step 2");
      const el = ref.current;

      // if this is a video, create a video tag
      if (pfdFile.payload.type.includes("video")) {
        console.log("running PFD change step 3 video");
        const elemV = document.createElement("video");
        elemV.style = "position: absolute; z-index: 1;";
        elemV.id = "videoToCapture";
        elemV.autoplay = true;
        elemV.loop = true;
        elemV.src = URL.createObjectURL(pfdFile.payload);
        const options = { childList: true };

        const mutationObserver = new MutationObserver((entries) => {
          elemV.addEventListener("canplay", () => {
            const capturedFrame = captureVideoFrame(elemV, "png");
            handleDropzoneChanges("videoCapture", capturedFrame);
            mutationObserver.disconnect();
          });
        });
        mutationObserver.observe(el, { childList: true });

        el.appendChild(elemV);
      } else {
        console.log("running PFD change step 3 image");
        const elemI = document.createElement("img");
        elemI.style = "position: absolute; left: 0px; z-index: 10;";
        elemI.setAttribute("src", URL.createObjectURL(pfdFile.payload));
        const el = ref.current;
        while (el.firstChild) {
          el.removeChild(el.lastChild);
        }
        setTimeout(() => {
          handleContinueButtonDisabled(false);
          el.appendChild(elemI);
        }, 100);
      }
    }
  }, [pfdFile.payload]);

  useEffect(() => {
    if (Object.keys(pfdFile).length > 0 && pfdFile.payload !== null) {
      const elemI = document.createElement("img");
      elemI.style = "position: absolute; left: 0px; z-index: 10;";
      elemI.setAttribute("src", pfdFile.videoCapture.dataUri);
      const el = ref.current;
      while (el.firstChild) {
        el.removeChild(el.lastChild);
      }

      setTimeout(() => {
        handleContinueButtonDisabled(false);
        el.appendChild(elemI);
      }, 100);
    }
  }, [pfdFile.videoCapture]);

  const validateDroppedFile = (w, h) => {
    const expectedPixelsL = DATA_PRODUCTS.data[productIndex].pixels.lPixels;
    const expectedPixelsP = DATA_PRODUCTS.data[productIndex].pixels.pPixels;

    const expectedSizeL = DATA_PRODUCTS.data[productIndex].acceptedSizeText.lSizes;
    const expectedSizeP = DATA_PRODUCTS.data[productIndex].acceptedSizeText.pSizes;
    let expectedPixels;

    droppedFileType === "landscape" ? (expectedPixels = expectedPixelsL) : (expectedPixels = expectedPixelsP);

    let acceptedSizes;

    droppedFileType === "landscape" ? (acceptedSizes = expectedSizeL) : (acceptedSizes = expectedSizeP);

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
      // handleDropzoneChanges("payload", null);
      return false;
    }
  };

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    maxFiles: 1,
    noClick: false,
    multiple: false,
    accept: pfdAcceptedString,

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
      const nameArray = newFile.name.split(".");
      const ext = nameArray[1];

      if (ext !== "mp4") {
        console.log("not mp4 and acceptFiles = ", acceptedFiles);
        // accepted files has name, type, preview blob
        console.log("not mp4 and files = ", files);
        // files is still zero
        const i = new Image();
        i.onload = () => {
          console.log("i loaded");
          let reader = new FileReader();
          reader.readAsDataURL(newFile);
          reader.onload = () => {
            console.log("reader loaded");

            const droppedFileIsCorrectSize = validateDroppedFile(i.width, i.height);
            if (droppedFileIsCorrectSize) {
              console.log("image and correct");

              handleDropzoneChanges("name", newFile.name);
              handleDropzoneChanges("payload", newFile);
              handleDropzoneChanges("width", i.width);
              handleDropzoneChanges("height", i.height);
              handleDropzoneChanges("type", newFile.type);
              handleDropzoneChanges("size", newFile.size);
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
            handleDropzoneChanges("payload", newFile);
            handleDropzoneChanges("width", video.videoWidth);
            handleDropzoneChanges("height", video.videoHeight);
            handleDropzoneChanges("type", newFile.type);
            handleDropzoneChanges("size", newFile.size);
            handleDropzoneChanges("name", newFile.name);
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

  return (
    <div>
      <div className="dropzoneImageGrandParent" onMouseEnter={() => setShowHint(true)} onMouseLeave={() => setShowHint(false)}>
        {showHint ? <div className="dropzoneHint">{acceptedFileTypeMessageString}</div> : null}
        <div {...getRootProps({ style })} className="dropZone">
          <div className="droppedImageHolder">
            {Object.keys(lfdFile).length + Object.keys(pfdFile).length === 0 ? <div style={dzBackgroundImage} className={`dzBackgroundImage ${shakeDropzoneBGImage ? "shakeIt" : ""}`}></div> : null}
            <div ref={ref} className="dropzoneImageParent"></div>
          </div>

          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
}

