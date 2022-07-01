import React, { useState, useEffect, useMemo } from "react";
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
  const svgFile = props.svgFile;
  const droppedFileType = props.droppedFileType;

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
  }, [files]);

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
    noClick: true,
    multiple: false,
    accept: acceptedFileTypeString,

    onDropAccepted: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      // get width and height of preview
      // this value is 0 when a file out of the accepted list is dropped

      console.log("trying and not zero");
      const newFile = acceptedFiles[0];
      handleDropzoneChanges("payload", newFile);

      console.log("dropped and name is ", newFile.name);
      const nameArray = newFile.name.split(".");
      const ext = nameArray[1];
      console.log("ext = ", ext);

      if (ext === "mp4") {
        setMediaType("video");
      } else {
        setMediaType("image");
      }

      if (ext !== "mp4") {
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

        i.src = newFile.preview;
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

  //console.log("app svgFileType = ", typeof svgFile);
  //console.log("app svgFile = ", svgFile);
  const svgImagePreview = (
    <div className="help"></div>
    // <img
    //   src={URL.createObjectURL(svgFile[0].payload)}
    //   style={{ width: "100%" }}
    //   alt="preview"
    // />
  );

  const imagePreview = files.map((file) => (
    <img
      key={file.name}
      src={URL.createObjectURL(files[0])}
      style={{ width: "100%" }}
      alt="preview"
    />
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
        {showHint ? (
          <div className="dropzoneHint">{acceptedFileTypeMessageString}</div>
        ) : null}

        <div {...getRootProps({ style })} className="dropZone">
          <div className="droppedImageHolder">
            <div style={dzBackgroundImage} className="dzBackgroundImage"></div>
            <div className="dropzoneImageParent">
              {mediaType === "video"
                ? videoPreview
                : droppedFileType === "svg" &&
                  files.length === 0 &&
                  svgFile.length > 0
                ? svgImagePreview
                : imagePreview}
              {/* {mediaType === "video" ? videoPreview : imagePreview} */}
            </div>
          </div>

          {/* when does this refresh and check if the conditions are met? */}

          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
}
export default Dropzone;
