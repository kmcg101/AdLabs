
// git add .
// git remote add origin git@github.com:kmcg101/app3.git
// git commit -m 'after splitting table to bottom'
// git push origin main


// TO DO
// 
// why is red outline always showing on dropzone drag over?
// conditional file type accepted dropzone


import React, { useEffect, useState } from "react";
import "./App.css";
import Data from "./data.json";
import TemplateCreator from "./templates/Template_Creator.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import PageLogin from './pages/PageLogin';
import PageElevator from './pages/PageElevator';
import PageLFD from './pages/PageLFD';
import PagePFD from './pages/PagePFD';
import Inputs from "./Inputs";

function App() {

  const [productIndex, setProductIndex] = useState();

  const [menuButtonIndex, setMenuButtonIndex] = useState(1);
  const [inputComplete, setInputComplete] = useState(false);

  const [isElevator, setIsElevator] = useState();
  const [isFullScreen, setIsFullScreen] = useState();
  const [requiresBlankFile, setRequiresBlankFile] = useState();


  const [inputValues, setInputValues] = useState({
    client: "ca",
    campaign: "new",
    //product: 'e-bint'
    //duration: 15,
    //country: 'us'
    // isElevator: null,
    // isFullScreen: null,
    // requiresBlankFile:

  });

  const [filename, setFilename] = useState();
  const [blankFilename, setBlankFilename] = useState();
  const [elevatorFile, setElevatorFile] = useState({});
  const [lfdFile, setLfdFile] = useState({});
  const [pfdFile, setPfdFile] = useState({});

  const [svgFile, setSvgFile] = useState({});
  const [standardAdFile, setStandardAdFile] = useState({});

  const [mediaExtension, setMediaExtension] = useState();

  // inputValues is passed to Input which is then passed to each select and text box
  // those children pass the data up to the handleAnyInputChange() function

  ////////////////////////////////////////////////////////
  // runs when product changes to set productIndex, isElevator, isFullScreen
  const effectHandleProductChange = () => {
    if (inputValues.product) {
      const searchValue = `${inputValues.product}`;
      var filteredObj = Data.products.find(function (item, i) {
        if (item.product === searchValue) {
          console.log("found, index = " + i);
          setProductIndex(i);

          // determine if FS or not
          setIsFullScreen(Data.products[i].isFullScreen);
          // determine if Elevator or not
          setIsElevator(Data.products[i].isElevator);
          // determine if requires blank file or not
          setRequiresBlankFile(Data.products[i].requiresBlankFile);
        }
      });
    }
   
  };

  useEffect(() => {
    effectHandleProductChange();
  }, [inputValues.product]);



  ////////////////////////////////////////////////////////
 

  // this sets the filename.  On filename change (useEffect) the file creation starts
  const handleDownloadButtonPress = () => {
   
    const fsValue = isFullScreen ? `_fs` : ``;
    console.log("returning filename and FS = " , isFullScreen)

    //heineken_15_dryjanuary22_us_fs_l-fsa
    setFilename(
      `${inputValues.client}_${inputValues.duration}_${inputValues.campaign}_${inputValues.countryCode}${fsValue}_${inputValues.product}`
    );

    //refreshtest_15_fsbiblank_us_fs_e-fsbi
    try {
      setBlankFilename(
        `${inputValues.client}_${inputValues.duration}_${Data.products[productIndex].productShortName}blank_${inputValues.countryCode}${fsValue}_${inputValues.product}`
      );
    } catch {
      console.log("not yet");
    }
  }

////////////////////////////////////////////////////////
// check if all inputs entered. this runs when any input changes

  const checkIfInputComplete = () => {
    
    if (
      inputValues.client &&
      inputValues.campaign &&
      inputValues.product &&
      inputValues.countryCode &&
      inputValues.mediaType &&
      inputValues.duration
    ) {
      setInputComplete(true);
    } else {
      setInputComplete(false);
    }
  };

  useEffect(() => {
    checkIfInputComplete();
  }, [
    inputValues.client,
    inputValues.campaign,
    inputValues.countryCode,
    inputValues.duration,
    inputValues.mediaType,
    inputValues.product,
  ]);

  ///////////////////////////////////////////////////////

  const handleTabClick = (ind) => {
    //console.log(ind)
    setMenuButtonIndex(ind);
  };

  const handleAnyInputsChange = (name, value) => {

    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /////////////////////////////////////////////////

  const handleElevatorDropzoneChanges = (name, value, droppedFileType) => {
    if (droppedFileType === 'svg') {
      setSvgFile((prevState) => ({
        ...prevState,
        [name]: value,
      }));

    }
    else {
      setElevatorFile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // get extension
      if (name === "name") {
        const splitValue = value.split(".");
        setMediaExtension(splitValue[1]);
      }
    }
  };
  const handleLFDDropzoneChanges = (name, value) => {
    setLfdFile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // get extension
    if (name === "name") {
      const splitValue = value.split(".");
      setMediaExtension(splitValue[1]);
    }
  };
  const handlePFDDropzoneChanges = (name, value) => {
    setPfdFile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // get extension
    if (name === "name") {
      const splitValue = value.split(".");
      setMediaExtension(splitValue[1]);
    }
  };

  ///////////////////////////////////////////////


  // * zip 'em up
  const deliverTemplateFiles = ((valH, valM, ext, blankHTML, blankManifest) => {
    const fsValue = isFullScreen ? `_fs` : ``;
    const finalFilename = `${inputValues.client}_${inputValues.duration}_${inputValues.campaign}_${inputValues.countryCode}${fsValue}_${inputValues.product}`;
    const finalBlankFileName = `${inputValues.client}_${inputValues.duration}_${Data.products[productIndex].productShortName}blank_${inputValues.countryCode}${fsValue}_${inputValues.product}`;
    //const fileTypePrefix = ext === "mp4" ? "video/" : "image/";
    const fileTypePrefixNoSlash = ext === "mp4" ? "video" : "image";
    //const fileTypeSuffix = ext;
    //const finalFileType = fileTypePrefix + fileTypeSuffix;

    // will eventually need a variable for e l or p.
    const eORl = isElevator ? "e" : "l";

    // HTML file
    // valH is the text of the html template passed from TemplateCreator
    let contentH = valH;
    let blobH = new Blob([contentH], {
      type: "text/plain;charset=utf-8",
    });

    // manifest file
    //valM is the text of the manifest template passed from TemplateCreator
    var contentM = valM;
    var blobM = new Blob([contentM], {
      type: "text/plain;charset=utf-8",
    });

    ///////////////////////////////////////
    // if blank file
    let blobBH;
    let blobBM;

    if (requiresBlankFile) {
      // blank HTML file
      let contentBH = blankHTML;
      blobBH = new Blob([contentBH], {
        type: "text/plain;charset=utf-8",
      });

      // blank manifest file
      var contentBM = blankManifest;
      blobBM = new Blob([contentBM], {
        type: "text/plain;charset=utf-8",
      });
    }
    ///////////////////////////////////////
    // at this point all the manifests are done. Now you need to 
    // do the async stuff like loading images and videos

    let newZip = new JSZip();
    newZip.file(`${finalFilename}.html`, blobH);
    newZip.file(`${finalFilename}.manifest`, blobM);

    const loadElevator = elevatorFile.payload ? elevatorFile.payload.arrayBuffer()
      .then((result) => {
        newZip.file(
          `${finalFilename}_${eORl}${fileTypePrefixNoSlash}.${mediaExtension}`,
          result
        );
      })
      : ""

    const loadSVG = svgFile.payload ? svgFile.payload.arrayBuffer()
      .then((result) => {
        newZip.file(
          `${finalFilename}.svg`,
          result
        );
      })
      : "";

    const loadObject = [
      { file: elevatorFile, fn: loadElevator },
      { file: svgFile, fn: loadSVG }
    ]
    const promiseArray = loadObject.map(obj => {
      if (obj.file.payload) {
        return obj.fn
      }
      

    })

    Promise.all(promiseArray).then((e) => {

      if (requiresBlankFile) {
        newZip.file(`${finalBlankFileName}.html`, blobBH);
        newZip.file(`${finalBlankFileName}.manifest`, blobBM);
      }

      newZip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, `${finalFilename}.zip`)
      });
    })
  })


  return (

      <div className="appContainer">
        <div className="appTitle">Captivate Ad Creator 3600x</div>
        
        <TemplateCreator
        elevatorFile={elevatorFile}
        inputComplete={inputComplete}
        isElevator={isElevator}
        deliverTemplateFiles={deliverTemplateFiles}
        productIndex={productIndex}
        filename={filename}
        blankFilename={blankFilename}
        mediaExtension={mediaExtension}
        handleDownloadButtonPress={handleDownloadButtonPress}
      />


        <div className="pageAndMenuContainer">
          <div className="pageContainer">
            <div className={`page ${menuButtonIndex === 0 ? "active-page" : ""}`}>
              <PageLogin />
            </div>
            <div className={`page ${menuButtonIndex === 1 ? "active-page" : ""}`}>
              <Inputs
                productIndex={productIndex}
                inputValues={inputValues}
                handleAnyInputsChange={handleAnyInputsChange}
              />
            </div>
            <div className={`elevatorPage page ${menuButtonIndex === 2 ? "active-page" : ""}`}>
              <PageElevator
                productIndex={productIndex}
                inputValues={inputValues}
                handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
              />
            </div>
            <div className={`page ${menuButtonIndex === 3 ? "active-page" : ""}`}>
              <PageLFD />
            </div>
            <div className={`page ${menuButtonIndex === 4 ? "active-page" : ""}`}>
              <PagePFD />
            </div>

          </div>
          <div className="menuConainer">

            <div
              onClick={() => handleTabClick()}
              className={`menuButton ${menuButtonIndex === 0 ? "menuButtonActive" : ""
                } } ${inputComplete && isElevator ? "" : "menuButtonDisabled"}`}
            >
              Login
            </div>
            <div
              onClick={() => handleTabClick(1)}
              className={`menuButton ${menuButtonIndex === 1 ? "menuButtonActive" : ""
                }`}
            >
              Input
            </div>
            <div
              onClick={() => handleTabClick(2)}
              className={`menuButton ${menuButtonIndex === 2 ? "menuButtonActive" : ""
                } ${inputComplete && isElevator ? "" : "menuButtonDisabled"}`}
            >
              Elevator
            </div>
            <div
              onClick={() => handleTabClick(3)}
              className={`menuButton ${menuButtonIndex === 3 ? "menuButtonActive" : ""
                } ${inputComplete && isElevator === false ? "" : "menuButtonDisabled"
                }`}
            >
              LFD
            </div>
            <div
              onClick={() => handleTabClick(4)}
              className={`menuButton ${menuButtonIndex === 4 ? "menuButtonActive" : ""
                } ${inputComplete && isElevator === false ? "" : "menuButtonDisabled"
                }`}
            >
              PFD
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default App;
