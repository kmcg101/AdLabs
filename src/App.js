// git add .
// git remote add origin git@github.com:kmcg101/app4.git
// git commit -m 'after splitting table to bottom'
// git push origin master
// git remote set-url origin git@github.com:kmcg101/app4.git

// remove last commit for when you put unwanted files in it:  git reset --hard HEAD~1

import "./assets/fonts/Avenir-Roman-12.ttf";

import { getManifestFile, getBlankManifest, getBlankHTML } from "./Utilities";
import { getHTMLFile } from "./TemplateFactory";
import ConfirmationScreen from "./ConfirmationScreen";

import React, { useEffect, useState } from "react";
import "./App.css";
import "./nav.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import PageElevator from "./pages/PageElevator";
import PageLFD from "./pages/PageLFD";
import PagePFD from "./pages/PagePFD";
import Inputs from "./pages/Inputs";
import Results from "./pages/Results";
import DATA_PRODUCTS from "./DATA_PRODUCTS";
import adLabsLogo from "./assets/AdLabs.svg";

import { ThemeProvider } from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";

import { BlackWhiteToggleButton, ContinueButton, BackButton } from "./Buttons";
import { AppTheme } from "./MaterialTheme";

function App() {
  // increases as user hits continue
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  // nav while dropping files 1 or 2 for l p.
  const [currentBuildNavNumber, setCurrentBuildNavNumber] = useState(1);

  const [productIndex, setProductIndex] = useState(4);
  const [inputsCheckButtonPressed, setInputsCheckButtonPressed] = useState(
    false
  );
  const [
    inputsCheckButtonPressedOnce,
    setInputsCheckButtonPressedOnce,
  ] = useState(false);

  const [isElevator, setIsElevator] = useState(true);
  const [requiresBlankFile, setRequiresBlankFile] = useState(false);

  const [inputValues, setInputValues] = useState({
    client: "",
    campaign: "",
    // product: "",
    // duration: "",
    // countryCode: "",
  });

  const [bintBGColor, setBintBGColor] = useState("FFFFFF");

  const [filename, setFilename] = useState();
  const [blankFilename, setBlankFilename] = useState();

  // dropped images and video files
  const [elevatorFile, setElevatorFile] = useState({}); //14
  const [lfdFile, setLfdFile] = useState({});
  const [pfdFile, setPfdFile] = useState({});
  const [svgFile, setSvgFile] = useState({}); // 17
  const [standardAdFile, setStandardAdFile] = useState({}); //18

  const [mediaExtensions, setMediaExtensions] = useState({});

  const [elevatorFileError, setElevatorFileError] = useState(false);
  const [lfdFileError, setLfdFileError] = useState(false);
  const [pfdFileError, setPfdFileError] = useState(false);
  const [svgFileError, setSvgFileError] = useState(false);
  const [standardAdFileError, setStandardAdFileError] = useState(false);

  const [allDroppedFilenames, setAllDroppedFilenames] = useState([]);
  const [allDroppedNewFilenames, setAllDroppedNewFilenames] = useState([]);

  const [mediaExtension, setMediaExtension] = useState();

  const [isBlackText, setIsBlackText] = useState(true);

  // this is called when arriving at Results page (4).  Sets filename and blank filename
  // also used when compiling list of input files and their new names
  const getFilename = () => {
    const productNumber = parseInt(inputValues.product);
    const clientName = inputValues.client;
    const duration = inputValues.duration;
    const desc = inputValues.campaign;
    const countryCode = inputValues.countryCode;
    const eORl = inputValues.platform === "elevator" ? "e" : "l";
    const fsValue = DATA_PRODUCTS.data[productNumber].isFS ? "_fs" : "";
    const product = DATA_PRODUCTS.data[productNumber].label;

    try {
      setBlankFilename(
        `${clientName}_${duration}_${product}blank_${countryCode}${fsValue}_${eORl}-${product}`
      );
    } catch {
      console.log("not yet");
    }
    return `${clientName}_${duration}_${desc}_${countryCode}${fsValue}_${eORl}-${product}`;
  };

  const getNewNameForDroppedFile = (filenameString, typeString) => {
    const eORl = inputValues.platform === "elevator" ? "e" : "l";

    const baseFilename = getFilename(
      inputValues,
      eORl,
      DATA_PRODUCTS.data[productIndex].label
    );

    const nameSplit =
      typeof filenameString === "undefined" ? "" : filenameString.split(".");
    const ext = nameSplit[1];
    const videoOrImageString = ext === "mp4" ? "video" : "image";
    let returnValue = "";

    if (typeof filenameString === "undefined") {
      returnValue = undefined;
    } else if (typeString === "svg") {
      returnValue = `${baseFilename}.${ext}`;
    } else if (typeString === "standardAd") {
      returnValue = `${baseFilename}.${ext}`;
    } else if (typeString === "p") {
      returnValue = `${baseFilename}_p${videoOrImageString}.${ext}`;
    } else {
      returnValue = `${baseFilename}_${eORl}${videoOrImageString}.${ext}`;
    }

    return returnValue;
  };

  // these functions are called when landing on the Results page.
  // they make the arrays that display in the text areas that show filed received and to be delivered
  // Keep in mind, these are not the same file names that are used to create the files put in the zip file.
  // these are just for display.
  // creates an array of all the new file names of files that were dropped

  const getAllDroppedNewFilenames = () => {
    return [
      getNewNameForDroppedFile(elevatorFile.name, "e"),
      getNewNameForDroppedFile(lfdFile.name, "l"),
      getNewNameForDroppedFile(pfdFile.name, "p"),
      getNewNameForDroppedFile(svgFile.name, "svg"),
      getNewNameForDroppedFile(standardAdFile.name, "standardAd"),
    ];
  };
  // creates an array of all names of files that were dropped.
  const getAllDroppedFilenames = () => {
    return [
      elevatorFile.name,
      lfdFile.name,
      pfdFile.name,
      svgFile.name,
      standardAdFile.name,
    ];
  };
  ////////////////////////////////////////////////////////

  const handleBackButton = () => {
    if (currentPageNumber > 1 && currentPageNumber < 4) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  const circleButtonClickHandler = (e) => {
    const numberValue = parseInt(e.target.attributes.dataindex.value);
    setCurrentPageNumber(numberValue);
  };

  const handleELPNavClick = (e) => {
    const val = parseInt(e.target.dataset.value);
    setCurrentBuildNavNumber(val);
  };
  function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9-]*$/.test(str);
  }

  const handleContinueButtonPressed = () => {
    setInputsCheckButtonPressedOnce(true);

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
        console.log("complete");
        setInputsCheckButtonPressed(false);

        setCurrentPageNumber(2);
      } else {
        // setInputComplete(false);
        console.log("not complete");
        setInputsCheckButtonPressed(true);
        // set back to false so that error animations will play again
        setTimeout(() => {
          setInputsCheckButtonPressed(false);
        }, "2000");
      }
    } else if (currentPageNumber === 2) {
      // this runs when landing on the RESULTS  page.

      // check if all dropboxes have been filled

      // check if proper files dropped
      let checkErrors = 0;

      // check for primary files
      if (isElevator) {
        if (elevatorFile.payload) {
          console.log("elevator file found");
          setElevatorFileError(false);
        } else {
          console.log("elevator file missing");
          setElevatorFileError(true);
          checkErrors++;
        }
      } else {
        if (lfdFile.payload) {
          console.log("l file found");
          setLfdFileError(false);
        } else {
          console.log("l file missing");
          setLfdFileError(true);
          checkErrors++;
        }
        if (pfdFile.payload) {
          console.log("p file found");
          setPfdFileError(false);
        } else {
          console.log("p file missing");
          setPfdFileError(true);
          checkErrors++;
        }
      }

      // check for svg
      if (inputValues.product === 4) {
        if (svgFile.payload) {
          setSvgFileError(false);
          console.log("svg file found");
        } else {
          setSvgFileError(true);
          console.log("svg file missing");
          checkErrors++;
        }
      }
      // check for standard ad
      if (inputValues.product === 0) {
        if (standardAdFile.payload) {
          setStandardAdFileError(false);
          console.log("standard ad file found");
        } else {
          setStandardAdFileError(true);
          console.log("standard ad file missing");
          checkErrors++;
        }
      }
      setTimeout(() => {
        setElevatorFileError(false);
        setLfdFileError(false);
        setPfdFileError(false);
        setSvgFileError(false);
        setStandardAdFileError(false);
      }, "2000");

      if (checkErrors === 0) {
        // this sets filename and blank filename
        setFilename(getFilename);
        const productNumber = parseInt(inputValues.product);
        setRequiresBlankFile(
          DATA_PRODUCTS.data[productNumber].requiresBlankFile
        );

        setAllDroppedFilenames(getAllDroppedFilenames);

        setAllDroppedNewFilenames(getAllDroppedNewFilenames);
        //
        setCurrentPageNumber(3);
      }
    } else if (currentPageNumber === 3) {
      // hide inputs so form will be reset.
      deliverTemplateFiles();
    } else if (currentPageNumber === 4) {
      resetStateToBeginning();
      // show inputs so form is reset
    }
  };
  const resetStateToBeginning = () => {
    setCurrentPageNumber(1);

    // remove all images and videos
    setProductIndex(0);
    setInputsCheckButtonPressed(false);
    setInputsCheckButtonPressedOnce(false);

    setIsElevator(true);
    setRequiresBlankFile(false);

    setInputValues({
      client: "",
      campaign: "",
    });

    setBintBGColor("FFFFFF");

    setFilename();
    setBlankFilename();

    // dropped images and video files
    setElevatorFile({});
    setLfdFile({});
    setPfdFile({});
    setSvgFile({}); // 17
    setStandardAdFile({}); //18

    setElevatorFileError(false);
    setLfdFileError(false);
    setPfdFileError(false);
    setSvgFileError(false);
    setStandardAdFileError(false);

    setAllDroppedFilenames([]);
    setAllDroppedNewFilenames([]);

    setMediaExtension();
    setIsBlackText(true);
  };

  // runs when product changes to set productIndex, isElevator, isFullScreen
  const effectHandleProductChange = () => {
    setProductIndex(inputValues.product);

    // clear all files and previews
    setElevatorFile({});
    setLfdFile({});
    setPfdFile({});
    setSvgFile([]);
    setStandardAdFile({});
  };

  useEffect(() => {
    effectHandleProductChange();
  }, [inputValues.product]);

  // handler for all inputs
  const handleAnyInputsChange = (name, value) => {
    // if this is setting elevator or lobby, change currentAdBuildingPageNumber to show either elev or lfp
    if (name === "platform") {
      if (value === "elevator") {
        setIsElevator(true);
      } else {
        setIsElevator(false);
      }
    }
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /////////////////////////////////////////////////
  const handleDropzoneChanges = (name, value, droppedFileType) => {
    // droppedFileType = elevator, landscape, portrait, svg, standardAd
    if (droppedFileType === "svg") {
      setSvgFile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (droppedFileType === "standardAd") {
      console.log("setting standard ad");
      setStandardAdFile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (droppedFileType === "elevator") {
      setElevatorFile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (droppedFileType === "landscape") {
      setLfdFile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (droppedFileType === "portrait") {
      setPfdFile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    // svg, standardAd, elevator, landscape, portrait
    if (name === "name") {
      const splitValue = value.split(".");
      setMediaExtensions((prevState) => ({
        ...prevState,
        [droppedFileType]: splitValue[1],
      }));
    }
  };

  ///////////////////////////////////////////////
  // * zip 'em up

  const deliverTemplateFiles = () => {
    const eORl = isElevator ? "e" : "l";

    const finalStandardAdFilename = `${inputValues.client}_${inputValues.duration}_${inputValues.campaign}_${inputValues.countryCode}_${eORl}-stnd`;

    // HTML file
    // valH is the text of the html template passed from TemplateCreator
    let contentH = getHTMLFile(
      filename,
      isElevator,
      mediaExtensions,
      productIndex,
      bintBGColor
    );
    let blobH = new Blob([contentH], {
      type: "text/plain;charset=utf-8",
    });

    // manifest file
    //valM is the text of the manifest template passed from TemplateCreator
    var contentM = getManifestFile(filename, isElevator, mediaExtensions);
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

    const loadElevator = elevatorFile.payload
      ? elevatorFile.payload.arrayBuffer().then((result) => {
          newZip.file(
            `${filename}_e${
              mediaExtensions.elevator === "mp4" ? "video" : "image"
            }.${mediaExtensions.elevator}`,
            result
          );
        })
      : "";

    const loadLFD = lfdFile.payload
      ? lfdFile.payload.arrayBuffer().then((result) => {
          newZip.file(
            `${filename}_l${
              mediaExtensions.elevator === "mp4" ? "video" : "image"
            }.${mediaExtensions.landscape}`,
            result
          );
        })
      : "";

    const loadPFD = pfdFile.payload
      ? pfdFile.payload.arrayBuffer().then((result) => {
          newZip.file(
            `${filename}_p${
              mediaExtensions.elevator === "mp4" ? "video" : "image"
            }.${mediaExtensions.portrait}`,
            result
          );
        })
      : "";

    const loadSVG = svgFile.payload
      ? svgFile.payload.arrayBuffer().then((result) => {
          newZip.file(`${filename}.svg`, result);
        })
      : "";

    const loadStandardAd = standardAdFile.payload
      ? standardAdFile.payload.arrayBuffer().then((result) => {
          newZip.file(`${finalStandardAdFilename}.mp4`, result);
        })
      : "";

    const loadObject = [
      { file: elevatorFile, fn: loadElevator },
      { file: lfdFile, fn: loadLFD },
      { file: pfdFile, fn: loadPFD },
      { file: svgFile, fn: loadSVG },
      { file: standardAdFile, fn: loadStandardAd },
    ];
    const promiseArray = loadObject.map((obj) => {
      if (obj.file.payload) {
        return obj.fn;
      }
    });

    Promise.all(promiseArray)
      .then((e) => {
        if (requiresBlankFile) {
          newZip.file(`${blankFilename}.html`, blobBH);
          newZip.file(`${blankFilename}.manifest`, blobBM);
        }

        newZip.generateAsync({ type: "blob" }).then(function(content) {
          saveAs(content, `${filename}.zip`);
        });
      })
      .then((e) => {
        console.log("finished");
        // if success, show final screen
        setCurrentPageNumber(4);
      })
      .catch((e) => {
        console.log("zip errro");
      });
  };
  const handleBINTColorChange = (color) => {
    console.log("color is type ", typeof color);
    setBintBGColor(color);
  };
  const handleBlackWhiteToggleChange = () => {
    setIsBlackText((prevIsBlackText) => !prevIsBlackText);
  };
  const config = {
    angle: "142",
    spread: "360",
    startVelocity: "58",
    elementCount: "113",
    dragFriction: "0.15",
    duration: "8270",
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "590px",
    colors: ["#f00", "#0f0", "#00f"],
  };

  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <div className="bgImageContainer">
        {currentPageNumber === 4 ? (
          <>
            <ConfirmationScreen />
          </>
        ) : null}
        <div className="logoContainer">
          <img src={adLabsLogo} alt="logo"></img>
        </div>
        <div className="appContainer">
          <div className="topSub">
            {currentPageNumber === 2 && !isElevator ? (
              <div className="elpNavigatorContainer">
                <div
                  data-value="1"
                  onClick={handleELPNavClick}
                  className={`elpNavButton ${
                    currentBuildNavNumber === 1 ? "current" : "enabled"
                  }`}
                >
                  LFD
                </div>
                <div
                  data-value="2"
                  onClick={handleELPNavClick}
                  className={`elpNavButton ${
                    currentBuildNavNumber === 2 ? "current" : "enabled"
                  }`}
                >
                  PFD
                </div>
              </div>
            ) : null}

            {currentPageNumber === 2 && inputValues.product === 0 ? (
              <BlackWhiteToggleButton
                handleBINTColorChange={handleBINTColorChange}
                bintBGColor={bintBGColor}
                handleBlackWhiteToggleChange={handleBlackWhiteToggleChange}
              >
                {" "}
              </BlackWhiteToggleButton>
            ) : null}

            {currentPageNumber !== 4 ? (
              <BackButton handleBackButton={handleBackButton} />
            ) : null}
          </div>
          <div className="contentSub">
            {/* PAGE 1 */}
            {/* {`adBuildingPageInner ${currentBuildNavNumber === 2 ? "hide" : ""}`} */}

            {currentPageNumber !== 4 ? (
              <div
                className={`inputsPage page ${
                  currentPageNumber !== 1 ? "hide" : ""
                }`}
              >
                <Inputs
                  productIndex={productIndex}
                  inputValues={inputValues}
                  handleAnyInputsChange={handleAnyInputsChange}
                  inputsCheckButtonPressed={inputsCheckButtonPressed}
                  inputsCheckButtonPressedOnce={inputsCheckButtonPressedOnce}
                />
              </div>
            ) : null}

            {/* PAGE 2 */}

            <div
              className={`adBuildingPage page ${
                isElevator === true
                  ? "elevator"
                  : isElevator === false
                  ? "landscape"
                  : "portrait"
              } ${currentPageNumber !== 2 ? "hide" : ""}`}
            >
              {/* when this classname is set to e l or p, that's what sets the h and w of the div which contains all building elements*/}
              <div
                className={`adBuildingPageContent ${
                  currentPageNumber === 2 && isElevator === true
                    ? "elevator"
                    : currentPageNumber === 2 &&
                      isElevator === false &&
                      currentBuildNavNumber === 1
                    ? "landscape"
                    : "portrait"
                }`}
              >
                {/* elevator */}
                <div
                  className={`adBuildingPageInner ${
                    currentPageNumber === 2 && isElevator ? "" : "hide"
                  }`}
                >
                  <PageElevator
                    elevatorFileError={elevatorFileError}
                    svgFileError={svgFileError}
                    standardAdFileError={standardAdFileError}
                    isBlackText={isBlackText}
                    bintBGColor={bintBGColor}
                    productIndex={productIndex}
                    inputValues={inputValues}
                    handleDropzoneChanges={handleDropzoneChanges}
                    svgFile={svgFile}
                  />
                </div>
                {/* lfd */}
                <div
                  className={`adBuildingPageInner ${
                    currentPageNumber === 2 && isElevator === false
                      ? ""
                      : "hide"
                  }`}
                >
                  <div
                    className={`adBuildingPageInner ${
                      currentBuildNavNumber === 2 ? "hide" : ""
                    }`}
                  >
                    <PageLFD
                      lfdFileError={lfdFileError}
                      svgFileError={svgFileError}
                      standardAdFileError={standardAdFileError}
                      isBlackText={isBlackText}
                      bintBGColor={bintBGColor}
                      productIndex={productIndex}
                      inputValues={inputValues}
                      handleDropzoneChanges={handleDropzoneChanges}
                      svgFile={svgFile}
                    />
                  </div>
                  {/* pfd */}

                  <div
                    className={`adBuildingPageInner ${
                      currentBuildNavNumber === 1 ? "hide" : ""
                    }`}
                  >
                    <PagePFD
                      pfdFileError={pfdFileError}
                      svgFileError={svgFileError}
                      standardAdFileError={standardAdFileError}
                      isBlackText={isBlackText}
                      bintBGColor={bintBGColor}
                      productIndex={productIndex}
                      inputValues={inputValues}
                      handleDropzoneChanges={handleDropzoneChanges}
                      svgFile={svgFile}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE 3 */}

            <div
              className={`resultsPage page ${
                currentPageNumber !== 3 ? "hide" : ""
              }`}
            >
              <Results
                allDroppedFilenames={allDroppedFilenames}
                allDroppedNewFilenames={allDroppedNewFilenames}
                filename={filename}
                blankFilename={blankFilename}
                requiresBlankFile={requiresBlankFile}
                bintBGColor={bintBGColor}
                inputValues={inputValues}
              />
            </div>
          </div>

          <div className="navSub">
            {currentPageNumber !== 4 ? (
              <div className="buttonsHolder">
                <div
                  onClick={circleButtonClickHandler}
                  dataindex={1}
                  className={`circleButton ${
                    currentPageNumber === 1 ? "current" : "enabled"
                  }`}
                >
                  1
                </div>
                <div
                  onClick={circleButtonClickHandler}
                  dataindex={2}
                  className={`circleButton ${
                    currentPageNumber === 2
                      ? "current"
                      : currentPageNumber > 2
                      ? "enabled"
                      : "disabled"
                  }`}
                >
                  2
                </div>
                <div
                  onClick={circleButtonClickHandler}
                  dataindex={4}
                  className={`circleButton ${
                    currentPageNumber === 3 ? "current" : "disabled"
                  }`}
                >
                  3
                </div>
              </div>
            ) : null}

            <ContinueButton
              currentPageNumber={currentPageNumber}
              handleContinueButtonPressed={handleContinueButtonPressed}
            ></ContinueButton>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
