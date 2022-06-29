import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";
import bgImage from "./assets/dropzoneBGImage.png";

const baseStyle = {
  border: "white dashed 2px",
};

const acceptStyle = {
  border: "#00e676 dashed 4px",
};

const rejectStyle = {
  border: "#ff1744 dashed 4px",
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
  backgroundImage:
    "linear-gradient( 180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
  position: "absolute",
  zIndex: "50",
};

function Dropzone(props) {
  /////////////////////////////  files accepted and message on mouse over

  const acceptedFileTypeString = props.acceptedFileTypeString;
  const acceptedFileTypeMessageString = getHintString(acceptedFileTypeString);

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

  const handleDropzoneChanges = (name, value) => {
    // dropped file type = elevator, landscape, portrait, standard, svg.
    // this writes the name/value pair to the approprate dropped file in app.js
    props.handleDropzoneChanges(name, value, props.droppedFileType);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: acceptedFileTypeString,

    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      // get width and height of preview

      // this value is 0 when a file out of the accepted list is dropped
      console.log("number of files dropped = ", acceptedFiles.length);
      if (acceptedFiles.length > 0) {
        const newFile = acceptedFiles[0];
        handleDropzoneChanges("payload", newFile);

        console.log("dropped and name is ", newFile.name);
        const nameArray = newFile.name.split(".");
        const ext = nameArray[1];
        console.log("ext = ", ext);

        if (ext === "mp4") {
          console.log("setting mediaType to video");
          setMediaType("video");
        } else {
          setMediaType("image");
        }

        if (ext !== "mp4") {
          console.log("dropped and image");
          const i = new Image();
          i.onload = () => {
            let reader = new FileReader();
            reader.readAsDataURL(newFile);
            reader.onload = () => {
              handleDropzoneChanges("width", i.width);
              handleDropzoneChanges("height", i.height);
              handleDropzoneChanges("type", newFile.type);
              handleDropzoneChanges("size", newFile.size);
              handleDropzoneChanges("name", newFile.name);
            };
          };
          if (acceptedFiles.length > 0) {
            i.src = newFile.preview;
          }
        } else {
          console.log("dropped and video");
          // need to interrogate video for its secrets
          const video = document.createElement("video");
          video.addEventListener("canplay", (event) => {
            console.log("video loaded");
            handleDropzoneChanges("width", video.videoWidth);
            handleDropzoneChanges("height", video.videoHeight);
            handleDropzoneChanges("type", newFile.type);
            handleDropzoneChanges("size", newFile.size);
            handleDropzoneChanges("name", newFile.name);
          });
          video.src = URL.createObjectURL(newFile);
        }
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

  function imagePreviewNEW() {
    return (
      <div className="dropzoneImageParent">
        <img src={files[0].preview} style={{ width: "100%" }} alt="preview" />
      </div>
    );
  }

  const imagePreview = files.map((file) => (
    <div key={file.name}>
      <div className="dropzoneImageParent">
        <img src={files[0].preview} style={{ width: "100%" }} alt="preview" />
      </div>
    </div>
  ));
  const videoPreview = files.map((file) => (
    <div key={file.name}>
      <div className="dropzoneImageParent">
        <video autoPlay loop style={{ width: "100%" }}>
          <source src={URL.createObjectURL(file)} />
        </video>
      </div>
    </div>
  ));

  return (
    <div>
      <div
        className="dropzoneImageGrandParent"
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
      >
        {showHint ? (
          <div className="dropzoneHint">{acceptedFileTypeMessageString}</div>
        ) : null}

        <div {...getRootProps({ style })} className="dropZone">
          <div className="droppedImageHolder">
            <div style={dzBackgroundImage} className="dzBackgroundImage"></div>
            {mediaType === "image" ? imagePreview : videoPreview}
          </div>

          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
}
export default Dropzone;
