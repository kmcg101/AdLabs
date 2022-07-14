import React, { useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";
import bgImage from "./assets/dropzoneBGImage.png";
import DATA_PRODUCTS from "./DATA_PRODUCTS";

const baseStyle = {
  border: "white dashed 2px",
};

const acceptStyle = {
  // border: "#00e676 dashed 2px",
  boxShadow: "0px 0px 8px 1px #00e676",
};

const rejectStyle = {
  // border: "#ff1744 dashed 2px",
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

function Dropzone(props) {
  /////////////////////////////  files accepted and message on mouse over

  const acceptedFileTypeString = props.acceptedFileTypeString;
  const acceptedFileTypeMessageString = getHintString(acceptedFileTypeString);
  const svgFile = props.svgFile;
  const droppedFileType = props.droppedFileType;
  const productIndex = props.productIndex;

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

  // all this does is determine which preview div to display, image or video
  const [mediaType, setMediaType] = useState("image");

  // this is where dropped files are added
  // only used for preview
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log("files change ", files);
    console.log("svgFile = ", svgFile);
  }, [svgFile]);

  const rejectDroppedFile = (val) => {
    props.rejectDroppedFile(val);
  };
  const validateDroppedFile = (w, h) => {
    const expectedPixelsE = DATA_PRODUCTS.data[productIndex].pixels.ePixels;
    const expectedPixelsL = DATA_PRODUCTS.data[productIndex].pixels.lPixels;
    const expectedPixelsP = DATA_PRODUCTS.data[productIndex].pixels.pPixels;
    let expectedPixels;
    {
      droppedFileType === "elevator"
        ? (expectedPixels = expectedPixelsE)
        : droppedFileType === "landscape"
        ? (expectedPixels = expectedPixelsL)
        : (expectedPixels = expectedPixelsP);
    }
    const receivedPixels = w * h;
    console.log("expected = ", expectedPixels);
    console.log("received = ", receivedPixels);

    const exists = Object.values(expectedPixels).includes(receivedPixels);

    if (droppedFileType === "svg" || droppedFileType === "standardAd") {
      return true;
    } else if (exists) {
      console.log("right size");
      return true;
    } else {
      console.log("wrong size");
      setFiles([]);
      return false;
    }
  };

  const handleDropzoneChanges = (name, value) => {
    // dropped file type = elevator, landscape, portrait, standard, svg.
    // this writes the name/value pair to the approprate dropped file in app.js
    props.handleDropzoneChanges(name, value, props.droppedFileType);
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

    onDropAccepted: (acceptedFiles) => {
      console.log("dropped");
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      // get width and height of preview
      // this value is 0 when a file out of the accepted list is dropped
      const newFile = acceptedFiles[0];
      const nameArray = newFile.name.split(".");
      const ext = nameArray[1];

      if (ext === "mp4") {
        setMediaType("video");
      } else {
        setMediaType("image");
      }
      console.log("checking if mp4 ", newFile);
      if (ext !== "mp4") {
        console.log("not mp4, time to load image");
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
              // setFiles(
              //   acceptedFiles.map((file) =>
              //     Object.assign(file, {
              //       preview: URL.createObjectURL(file),
              //     })
              //   )
              // );
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
            // setFiles(
            //   acceptedFiles.map((file) =>
            //     Object.assign(file, {
            //       preview: URL.createObjectURL(file),
            //     })
            //   )
            // );
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

  const svgImagePreview = (
    <div>
      <img
        src={svgFile !== undefined && Object.keys(svgFile).length > 0 ? URL.createObjectURL(svgFile.payload) : null}
        style={svgFile !== undefined && Object.keys(svgFile).length > 0 ? { width: "100%" } : { display: "none" }}
        alt="preview"
      />
    </div>
  );

  const imagePreview = files.map((file) => (
    <img key={file.name} src={URL.createObjectURL(files[0])} style={{ width: "100%" }} alt="preview" />
  ));
  const videoPreview = files.map((file) => (
    <video key={file.name} autoPlay loop style={{ width: "100%" }}>
      <source src={URL.createObjectURL(files[0])} />
    </video>
  ));

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
            {Object.keys(files).length === 0 ? (
              <div style={dzBackgroundImage} className="dzBackgroundImage"></div>
            ) : null}
            <div className="dropzoneImageParent">
              {mediaType === "video"
                ? videoPreview
                : droppedFileType === "svg" && Object.keys(svgFile).length > 0 && Object.keys(files).length === 0
                ? svgImagePreview
                : imagePreview}
              {/* {mediaType === "video" ? videoPreview : imagePreview} */}
            </div>
          </div>

          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
}
export default Dropzone;
