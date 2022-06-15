
// git add .
// git remote add origin git@github.com:kmcg101/app4.git
// git commit -m 'after splitting table to bottom'
// git push origin master
// git remote set-url origin git@github.com:kmcg101/app4.git

// remove last commit for when you put unwanted files in it:  git reset --hard HEAD~1

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

import { getManifestFile, getBlankManifest, getBlankHTML } from './Utilities'
import { getHTMLFile } from './TemplateFactory'

import React, { useEffect, useState } from "react";
import "./App.css";
import './nav.css'
// import Data from "./data.json";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import PageElevator from './pages/PageElevator';
import PageLFD from './pages/PageLFD';
import PagePFD from './pages/PagePFD';
import Inputs from "./pages/Inputs";
import Results from "./pages/Results";
import DATA_PRODUCTS from "./DATA_PRODUCTS"
import adLabsLogo from './assets/AdLabs.svg'

function App() {

  // increases as user hits continue
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  // nav while dropping files 1 or 2 for l p.
  const [currentBuildNavNumber, setCurrentBuildNavNumber] = useState(1)

  const [productIndex, setProductIndex] = useState(4);
  const [inputsCheckButtonPressed, setInputsCheckButtonPressed] = useState(false)

  const [isElevator, setIsElevator] = useState(true);
  const [requiresBlankFile, setRequiresBlankFile] = useState(false);

  const [inputValues, setInputValues] = useState({
    client: "",
    campaign: "",

  });

  const [filename, setFilename] = useState();
  const [blankFilename, setBlankFilename] = useState();

  // dropped images and video files
  const [elevatorFile, setElevatorFile] = useState({});  //14
  const [lfdFile, setLfdFile] = useState({});
  const [pfdFile, setPfdFile] = useState({});
  const [svgFile, setSvgFile] = useState({}); // 17
  const [standardAdFile, setStandardAdFile] = useState({}); //18

  const [allDroppedFilenames, setAllDroppedFilenames] = useState([])
  const [allDroppedNewFilenames, setAllDroppedNewFilenames] = useState([])

  const [mediaExtension, setMediaExtension] = useState();

  // this is called when arriving at Results page (4).  Sets filename and blank filename
  // also used when compiling list of input files and their new names
  const getFilename = () => {
    const productNumber = parseInt(inputValues.product)
    const clientName = inputValues.client;
    const duration = inputValues.duration;
    const desc = inputValues.campaign;
    const countryCode = inputValues.countryCode;
    const eORl = inputValues.platform === 'elevator' ? 'e' : 'l';
    const fsValue = DATA_PRODUCTS.data[productNumber].isFS ? "_fs" : ""
    const product = DATA_PRODUCTS.data[productNumber].label;

    try {
      setBlankFilename(
        `${clientName}_${duration}_${product}blank_${countryCode}${fsValue}_${eORl}-${product}`
      );
    } catch {
      console.log("not yet");
    }
    return (`${clientName}_${duration}_${desc}_${countryCode}${fsValue}_${eORl}-${product}`)
  }

  const getNewNameForDroppedFile = (filenameString, typeString) => {
    const eORl = inputValues.platform === 'elevator' ? 'e' : 'l';

    const baseFilename = getFilename(inputValues, eORl, DATA_PRODUCTS.data[productIndex].label);

    const nameSplit = typeof (filenameString) === "undefined" ? "" : filenameString.split(".");
    const ext = nameSplit[1];
    const videoOrImageString = ext === "mp4" ? "video" : 'image'
    let returnValue = '';

    if (typeof (filenameString) === "undefined") {
      returnValue = undefined;
    }
    else if (typeString === 'svg') {
      returnValue = (`${baseFilename}.${ext}`)
    }
    else if (typeString === 'standardAd') {
      returnValue = (`${baseFilename}.${ext}`)
    }
    else if (typeString === 'p') {
      returnValue = (`${baseFilename}_p${videoOrImageString}.${ext}`)
    }
    else {
      returnValue = (`${baseFilename}_${eORl}${videoOrImageString}.${ext}`)
    }

    return returnValue

  }

  // these functions are called when landing on the Results page.
  // they make the arrays that display in the text areas that show filed received and to be delivered
  // Keep in mind, these are not the same file names that are used to create the files put in the zip file.
  // these are just for display.
  // creates an array of all the new file names of files that were dropped


  const getAllDroppedNewFilenames = () => {
    return ([
      getNewNameForDroppedFile(elevatorFile.name, "e"),
      getNewNameForDroppedFile(lfdFile.name, "l"),
      getNewNameForDroppedFile(pfdFile.name, "p"),
      getNewNameForDroppedFile(svgFile.name, 'svg'),
      getNewNameForDroppedFile(standardAdFile.name, 'standardAd')
    ])
  }
  // creates an array of all names of files that were dropped.
  const getAllDroppedFilenames = () => {
    return ([
      elevatorFile.name,
      lfdFile.name,
      pfdFile.name,
      svgFile.name,
      standardAdFile.name
    ])
  }
  ////////////////////////////////////////////////////////

  const handleBackButton = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1)
    }

  }

  const circleButtonClickHandler = (e) => {
    const numberValue = parseInt(e.target.attributes.dataindex.value)
    setCurrentPageNumber(numberValue);

  }

  const handleELPNavClick = (e) => {
    const val = parseInt(e.target.dataset.value)
    setCurrentBuildNavNumber(val)

  }
  function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9-]*$/.test(str);
  }

  const handleContinueButtonPressed = () => {
    if (currentPageNumber === 1) {
      // moving from inputs to Elevator or LFD
      // check if all values filled in
      if (
        
        inputValues.client &&
        inputValues.campaign &&
        onlyLettersAndNumbers(inputValues.client) &&
        onlyLettersAndNumbers(inputValues.campaign) &&
        inputValues.product !== undefined &&
        inputValues.countryCode &&
        inputValues.platform &&
        inputValues.duration
      ) {
        // setInputComplete(true);
        console.log("complete")
        setInputsCheckButtonPressed(false);
        setCurrentPageNumber(2);
      } else {
        // setInputComplete(false);
        console.log("not complete")
        setInputsCheckButtonPressed(true);
      }
    }
    else if (currentPageNumber === 2) {

      // this runs when landing on the RESULTS  page.



      // check if all dropboxes have been filled
      /*
      HOLD WHEN MISSING:
        elevator bint
          bint image
        lobby bint
          l and p image
        
        elevator fsa
          1 image or video
        lobby fsa
          1 L image or video

        elevator vsa
          1 video
        lobby vsa
          1 video (used in 2 places.  require it dropped in both l and p?)

        elevator HFSP
          1 image or video?
        lobby HFSP
          l and p image or video

        elevator FSBI
          image file and SVG
        lobby FSBI
          l image, p image, 1 svg

      */

      // this sets filename and blank filename
      setFilename(getFilename)
      const productNumber = parseInt(inputValues.product)
      setRequiresBlankFile(DATA_PRODUCTS.data[productNumber].requiresBlankFile)

      setAllDroppedFilenames(getAllDroppedFilenames)

      setAllDroppedNewFilenames(getAllDroppedNewFilenames)
      // 
      setCurrentPageNumber(3);
    }
    else if (currentPageNumber === 3) {

      deliverTemplateFiles();
    }
  };

  // runs when product changes to set productIndex, isElevator, isFullScreen
  const effectHandleProductChange = () => {
    setProductIndex(inputValues.product)

    // clear all files and previews
    setElevatorFile({})
    setLfdFile({})
    setPfdFile({})
    setSvgFile({})
    setStandardAdFile({})
  };

  useEffect(() => {
    effectHandleProductChange();
  }, [inputValues.product]);


  // handler for all inputs
  const handleAnyInputsChange = (name, value) => {
    // if this is setting elevator or lobby, change currentAdBuildingPageNumber to show either elev or lfp
    if (name === 'platform') {
      if (value === 'elevator') {
        setIsElevator(true)
      }
      else {
        setIsElevator(false)
      }
    }
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
  const handleLFDDropzoneChanges = (name, value, droppedFileType) => {
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
      setLfdFile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // get extension
      if (name === "name") {
        const splitValue = value.split(".");
        setMediaExtension(splitValue[1]);
      }
    }
  }

  const handlePFDDropzoneChanges = (name, value, droppedFileType) => {
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
  }

  ///////////////////////////////////////////////
  // * zip 'em up

  const deliverTemplateFiles = () => {
    const fileTypePrefixNoSlash = mediaExtension === "mp4" ? "video" : "image";

    const eORl = isElevator ? "e" : "l";

    const finalStandardAdFilename = `${inputValues.client}_${inputValues.duration}_${inputValues.campaign}_${inputValues.countryCode}_${eORl}-stnd`;


    // HTML file
    // valH is the text of the html template passed from TemplateCreator
    let contentH = getHTMLFile(filename, isElevator, mediaExtension, productIndex);
    let blobH = new Blob([contentH], {
      type: "text/plain;charset=utf-8",
    });

    // manifest file
    //valM is the text of the manifest template passed from TemplateCreator
    var contentM = getManifestFile(filename, isElevator, mediaExtension);
    var blobM = new Blob([contentM], {
      type: "text/plain;charset=utf-8",
    });

    ///////////////////////////////////////
    // if blank file
    let blobBH;
    let blobBM;

    if (requiresBlankFile) {
      // blank HTML file
      let contentBH = getBlankHTML(blankFilename);
      blobBH = new Blob([contentBH], {
        type: "text/plain;charset=utf-8",
      });

      // blank manifest file
      var contentBM = getBlankManifest(blankFilename);
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
          `${filename}_e${fileTypePrefixNoSlash}.${mediaExtension}`,
          result
        );
      })
      : ""

    const loadLFD = lfdFile.payload ? lfdFile.payload.arrayBuffer()
      .then((result) => {
        newZip.file(
          `${filename}_l${fileTypePrefixNoSlash}.${mediaExtension}`,
          result
        );
      })
      : ""

    const loadPFD = pfdFile.payload ? pfdFile.payload.arrayBuffer()
      .then((result) => {
        newZip.file(
          `${filename}_p${fileTypePrefixNoSlash}.${mediaExtension}`,
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
      { file: lfdFile, fn: loadLFD },
      { file: pfdFile, fn: loadPFD },
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
  }


  return (

    <div className='bgImageContainer'>
      <div className='logoContainer'>
        <img src={adLabsLogo} alt='logo'></img>
      </div>
      <div className="appContainer">
        <div className='topSub'>
          <div className={`elpNavigatorContainer ${currentPageNumber === 2 ? 'enabled' : "disabled"} `}>
            <div data-value="1" onClick={handleELPNavClick} className={`elpNavButton ${isElevator ? 'disabled' : currentBuildNavNumber === 1 ? 'current' : 'enabled'}`}>LFD</div>
            <div data-value="2" onClick={handleELPNavClick} className={`elpNavButton ${isElevator ? 'disabled' : currentBuildNavNumber === 2 ? 'current' : 'enabled'}`}>PFD</div>
          </div>

          <button className='backButton' onClick={handleBackButton}>
            BACK
          </button>
        </div>
        <div className='contentSub'>


          <div className={`inputsPage page ${currentPageNumber === 1 ? "active-page" : ""}`}>
            <Inputs
              productIndex={productIndex}
              inputValues={inputValues}
              handleAnyInputsChange={handleAnyInputsChange}
              inputsCheckButtonPressed={inputsCheckButtonPressed}
            />
          </div>
          {/* this is the building page that gets turned on for steps 2 3 adn 4 */}
          <div className={`adBuildingPage page ${currentPageNumber === 2 ? "active-page-flex" : ""} ${currentPageNumber === 2 && isElevator === true ? "elevator" : currentPageNumber === 2 && isElevator === false ? "landscape" : "portrait"}`}>

            {/* when this classname is set to e l or p, that's what sets the h and w of the div which contains all building elements*/}
            <div className={`adBuildingPageContent ${currentPageNumber === 2 && isElevator === true ? "elevator" : currentPageNumber === 2 && isElevator === false && currentBuildNavNumber === 1 ? "landscape" : "portrait"}`}>

              {/* elevator */}
              {/* this is what gets turned active/inactive to show/hide */}
              <div className={`adBuildingPageInner ${currentPageNumber === 2 && isElevator === true ? "adBuildingPageInnerActive" : "adBuildingPageInnerInactive"}`}>
                <PageElevator
                  productIndex={productIndex}
                  inputValues={inputValues}
                  handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
                />
              </div>

              {/* lfd */}
              <div className={`adBuildingPageInner ${currentPageNumber === 2 && isElevator === false && currentBuildNavNumber === 1 ? "adBuildingPageInnerActive" : "adBuildingPageInnerInactive"}`}>
                <PageLFD
                  productIndex={productIndex}
                  inputValues={inputValues}
                  handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
                />
              </div>

              {/* pfd */}
              <div className={`adBuildingPageInner ${currentPageNumber === 2 && isElevator === false && currentBuildNavNumber === 2 ? "adBuildingPageInnerActive" : "adBuildingPageInnerInactive"}`}>
                <PagePFD
                  productIndex={productIndex}
                  inputValues={inputValues}
                  handleAllDropzoneChangesParent={handlePFDDropzoneChanges} />
              </div>
            </div>
          </div>

          <div className={`resultsPage page ${currentPageNumber === 3 ? "active-page-flex" : ""}`}>
            <Results allDroppedFilenames={allDroppedFilenames} allDroppedNewFilenames={allDroppedNewFilenames} filename={filename} />
          </div>
        </div>

        <div className='navSub'>
          <div className='buttonsHolder'>
            <div onClick={circleButtonClickHandler} dataindex={1} className={`circleButton ${currentPageNumber === 1 ? "current" : "enabled"}`}>1</div>
            <div onClick={circleButtonClickHandler} dataindex={2} className={`circleButton ${currentPageNumber === 2 ? "current" : currentPageNumber > 2 ? "enabled" : "disabled"}`}>2</div>
            <div onClick={circleButtonClickHandler} dataindex={4} className={`circleButton ${currentPageNumber === 3 ? "current" : "disabled"}`}>3</div>
          </div>
          <div className='continueButton' onClick={handleContinueButtonPressed}>{currentPageNumber === 3 ? "CREATE AD FILES" : "CONTINUE"}</div>
        </div>
      </div>

    </div>


  );
}

export default App;
