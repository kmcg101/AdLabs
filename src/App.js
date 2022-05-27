
// git add .
// git remote add origin git@github.com:kmcg101/app4.git
// git commit -m 'after splitting table to bottom'
// git push origin master
// git remote set-url origin git@github.com:kmcg101/app4.git

// video or image contain
// vid or image 100% x 100%, object fit contain or scale down
// container w and h needs to be set pixels.


// TO DO
// notes:
// should I directly reference the data file or set a variable to its value?
// in zip function, is ext the same as mediaExtension?
// dropzone is currently using a passed down inputValues.mediaType to determine
//    how to render the preview.  If it is a video or image.  Should use the actual
//    file's file type for this.
// dropzone: why is red outline always showing on dropzone drag over?
// dropzone: conditional file type accepted and reflext in dotted outline
//
// 
// include lobby files

import './assets/fonts/Avenir-Roman-12.ttf';


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
  const [inputsCheckButtonPressed, setInputsCheckButtonPressed] = useState(false)

  const [menuButtonIndex, setMenuButtonIndex] = useState(1);
  const [inputComplete, setInputComplete] = useState(false);

  const [isElevator, setIsElevator] = useState();
  const [isFullScreen, setIsFullScreen] = useState();
  const [requiresBlankFile, setRequiresBlankFile] = useState();


  const [inputValues, setInputValues] = useState({
     client: "",
     campaign: "",
    //product: 'e-bint'
    //duration: 15,
    //country: 'us'
    // isElevator: null,
    // isFullScreen: null,
    // requiresBlankFile:

  });

  const [filename, setFilename] = useState();
  const [blankFilename, setBlankFilename] = useState();

  // dropped images and video files
  const [elevatorFile, setElevatorFile] = useState({});
  const [lfdFile, setLfdFile] = useState({});
  const [pfdFile, setPfdFile] = useState({});
  const [svgFile, setSvgFile] = useState({});
  const [standardAdFile, setStandardAdFile] = useState({});

  const [mediaExtension, setMediaExtension] = useState();

  // inputValues is passed to Input which is then passed to each select and text box
  // those children pass the data up to the handleAnyInputChange() function

  ////////////////////////////////////////////////////////

  const continueFromStepOne = () => {
    // check if all values filled in
    if (
      inputValues.client &&
      inputValues.campaign &&
      inputValues.product &&
      inputValues.countryCode &&
      inputValues.platform &&
      inputValues.duration
    ) {
      setInputComplete(true);
      console.log("complete")
      setInputsCheckButtonPressed(false);
    } else {
      setInputComplete(false);
      console.log("not complete")
      setInputsCheckButtonPressed(true);
    }
  };



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

  // handler for all inputs
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
    else if (droppedFileType === 'standardAd') {
      console.log("setting standard ad")
      setStandardAdFile((prevState) => ({
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

  // is ext the same as mediaExtension?
  const deliverTemplateFiles = ((valH, valM, ext, blankHTML, blankManifest) => {
    const fsValue = isFullScreen ? `_fs` : ``;
    // const finalFilename = `${inputValues.client}_${inputValues.duration}_${inputValues.campaign}_${inputValues.countryCode}${fsValue}_${inputValues.product}`;
    const finalStandardAdFilename = `${inputValues.client}_${inputValues.duration}_${inputValues.campaign}_${inputValues.countryCode}`;
    // const finalBlankFileName = `${inputValues.client}_${inputValues.duration}_${Data.products[productIndex].productShortName}blank_${inputValues.countryCode}${fsValue}_${inputValues.product}`;
    // const fileTypePrefix = ext === "mp4" ? "video/" : "image/";
    const fileTypePrefixNoSlash = ext === "mp4" ? "video" : "image";
    // const fileTypeSuffix = ext;
    // const finalFileType = fileTypePrefix + fileTypeSuffix;

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
    newZip.file(`${filename}.html`, blobH);
    newZip.file(`${filename}.manifest`, blobM);

    const loadElevator = elevatorFile.payload ? elevatorFile.payload.arrayBuffer()
      .then((result) => {
        newZip.file(
          `${filename}_${eORl}${fileTypePrefixNoSlash}.${mediaExtension}`,
          result
        );
      })
      : ""

    const loadSVG = svgFile.payload ? svgFile.payload.arrayBuffer()
      .then((result) => {
        newZip.file(
          `${filename}.svg`,
          result
        );
      })
      : "";

    const loadStandardAd = standardAdFile.payload ? standardAdFile.payload.arrayBuffer()
      .then((result) => {
        newZip.file(
          `${finalStandardAdFilename}.mp4`,
          result
        );
      })
      : "";

    const loadObject = [
      { file: elevatorFile, fn: loadElevator },
      { file: svgFile, fn: loadSVG },
      { file: standardAdFile, fn: loadStandardAd }
    ]
    const promiseArray = loadObject.map(obj => {
      if (obj.file.payload) {
        return obj.fn
      }


    })

    Promise.all(promiseArray).then((e) => {

      if (requiresBlankFile) {
        newZip.file(`${blankFilename}.html`, blobBH);
        newZip.file(`${blankFilename}.manifest`, blobBM);
      }

      newZip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, `${filename}.zip`)
      });
    })
  })


  return (

    <div className="appContainer">
      <div className='topSub'></div>
      <div className='contentSub'>


        <div className={`page ${menuButtonIndex === 1 ? "active-page" : ""}`}>
          <Inputs
            productIndex={productIndex}
            inputValues={inputValues}
            handleAnyInputsChange={handleAnyInputsChange}
            inputsCheckButtonPressed = {inputsCheckButtonPressed}
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
      <div className='navSub'>
        <div className='buttonsHolder'>
          <div className='circleButton circleButtonEnabled' id='b1'>1</div>
          <div className='circleButton' id='b1'>2</div>
          <div className='circleButton' id='b1'>3</div>
        </div>
        <div className='continueButton' onClick={continueFromStepOne}>CONTINUE</div>
      </div>
      {/* <div className="appTitle">Captivate Ad Creator 3600x</div> */}

      {/* <TemplateCreator
        elevatorFile={elevatorFile}
        inputComplete={inputComplete}
        isElevator={isElevator}
        deliverTemplateFiles={deliverTemplateFiles}
        productIndex={productIndex}
        filename={filename}
        blankFilename={blankFilename}
        mediaExtension={mediaExtension}
        handleDownloadButtonPress={handleDownloadButtonPress}
      /> */}



    </div>


  );
}

export default App;
