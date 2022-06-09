import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";
import bgImage from "./assets/dropzoneBGImage.png";

const baseStyle = {
  borderRadius: 2,
  border: "white dashed 2px",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  backgroundImage: "linear-gradient( 0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)",
  
  
};
const acceptStyle = {
  borderColor: "#00e676",
  borderWidth: 4,
};

const rejectStyle = {
  borderColor: "#ff1744",
  borderWidth: 4,
};
const dzBackgroundImage = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${bgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}


function Dropzone(props) {

  const [mediaType, setMediaType] = useState("image")
  const [files, setFiles] = useState([]);
  const handleDropzoneChange = (name, value) => {
    props.handleAllDropzoneChanges(name, value, props.droppedFileType);
  };

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      accept: ['image/jpeg', 'image/png', 'video/mp4', "image/svg+xml"],

      onDrop: (acceptedFiles) => {
        

        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        // get width and height of preview
        const newFile = acceptedFiles[0];
        handleDropzoneChange("payload", newFile);

        console.log("dropped and name is ", newFile.name)
        const nameArray = newFile.name.split(".");
        const ext = nameArray[1];
        console.log('ext = ', ext)
        
        if(ext === 'mp4'){
          console.log("setting mediaType to video")
          setMediaType("video");
        }

        /// this is always set to image even when dropping video
        if (ext !== "mp4") {
          console.log("dropped and image")
          const i = new Image();
          i.onload = () => {
            let reader = new FileReader();
            reader.readAsDataURL(newFile);
            reader.onload = () => {
              //setExpectedWidth(Data.products[props.productIndex].eWidth);
              //setExpectedHeight(Data.products[props.productIndex].eHeight);

              // const expectedFileTypeInner = `${Data.products[props.productIndex].isVideo
              //   ? "video"
              //   : "image/png"
              //   }`;
              //setExpectedType(expectedFileTypeInner);

              //setExpectedSize(Data.products[props.productIndex].maxFileSize);

              handleDropzoneChange("width", i.width);
              handleDropzoneChange("height", i.height);
              handleDropzoneChange("type", newFile.type);
              handleDropzoneChange("size", newFile.size);
              handleDropzoneChange("name", newFile.name);
              handleDropzoneChange("productIndex", props.productIndex);
            };
          };
          if (acceptedFiles.length > 0) {
            i.src = newFile.preview;
          }
        } else {
          console.log("dropped and video")
          // need to interrogate video for its secrets
          const video = document.createElement("video");
          video.addEventListener("canplay", (event) => {
            console.log("video loaded")
            handleDropzoneChange("width", video.videoWidth);
            handleDropzoneChange("height", video.videoHeight);
            handleDropzoneChange("type", newFile.type);
            handleDropzoneChange("size", newFile.size);
            handleDropzoneChange("name", newFile.name);
            handleDropzoneChange("productIndex", props.productIndex);
          });
          video.src = URL.createObjectURL(newFile);

        }

      },
    });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  }),
    [isDragAccept, isDragReject]
  );



  const imagePreview = files.map((file) => (
    <div key={file.name}>
      <div className="dropzoneImageParent">
        <img src={file.preview} style={{ width: "100%" }} alt="preview" />
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
      <div className="dropzoneImageGrandParent">
        <div {...getRootProps({ style })} className="dropZone">
          <div style={dzBackgroundImage} className='dzBackgroundImage'></div>
          <input {...getInputProps()} />
        </div>
        <div className="droppedImageHolder">{mediaType === 'image' ? imagePreview : videoPreview}</div>

      </div>
    </div>
  );
}
export default Dropzone;
