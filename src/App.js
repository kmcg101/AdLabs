// git add . jkl
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
import Filename from "./Filename";
import WarningMessage from "./WarningMessage";
import DATA_PRODUCTS from "./DATA_PRODUCTS";
import adLabsLogo from "./assets/AdLabs.svg";

import { ThemeProvider } from "@material-ui/core";

// import { useScreenshot } from "use-screenshot-hook";
import * as htmlToImage from "html-to-image";
import { toPng } from "html-to-image";

import PopUp from "./PopUp";

import CssBaseline from "@material-ui/core/CssBaseline";

import { BlackWhiteToggleButton, ContinueButton, BackButton } from "./Buttons";
import { AppTheme } from "./MaterialTheme";

function App() {
  // for screen shots
  //const imageRef = useRef(null);
  const [screenshot, setScreenshot] = useState(); // 2

  const [continueButtonDisabled, setContinueButtonDisabled] = useState(false);
  // increases as user hits continue
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  // nav while dropping files 1 or 2 for l p.
  const [currentBuildNavNumber, setCurrentBuildNavNumber] = useState(1);

  const [productIndex, setProductIndex] = useState(4);
  const [inputsCheckButtonPressed, setInputsCheckButtonPressed] = useState(false);
  const [inputsCheckButtonPressedOnce, setInputsCheckButtonPressedOnce] = useState(false);

  const [isElevator, setIsElevator] = useState(true);
  const [requiresBlankFile, setRequiresBlankFile] = useState(false);
  const [warningMessageText, setWarningMessageText] = useState("");
  const [warningMessageTextShowIcon, setWarningMessageTextShowIcon] = useState();

  const [inputValues, setInputValues] = useState({
    client: "",
    campaign: "",
    // product: "",
    // duration: "",
    // countryCode: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("test message");

  const [bintBGColor, setBintBGColor] = useState("000000");

  const [shakeDropzoneBGImage, setShakeDropzoneBGImage] = useState(false);

  const [filename, setFilename] = useState();
  const [blankFilename, setBlankFilename] = useState();

  // dropped images and video files
  const [elevatorFile, setElevatorFile] = useState({}); // 12
  const [lfdFile, setLfdFile] = useState({}); // 13
  const [pfdFile, setPfdFile] = useState({}); // 14
  const [svgFile, setSvgFile] = useState({}); // 15
  const [standardAdFile, setStandardAdFile] = useState({}); // 16

  const [mediaExtensions, setMediaExtensions] = useState({}); // 17
  // const [lobbyAndOneAsset, setLobbyAndOneAsset] = useState(); //29
  // const [lobbyAndOneAssetIsLFD, setLobbyAndOneAssetIsLFD] = useState(); //30

  // const [elevatorFileError, setElevatorFileError] = useState(false);
  // const [lfdFileError, setLfdFileError] = useState(false);
  // const [pfdFileError, setPfdFileError] = useState(false);
  // const [svgFileError, setSvgFileError] = useState(false);
  // const [standardAdFileError, setStandardAdFileError] = useState(false);

  const [allDroppedFilenames, setAllDroppedFilenames] = useState([]);
  const [allDroppedNewFilenames, setAllDroppedNewFilenames] = useState([]);

  const [mediaExtension, setMediaExtension] = useState();

  const [noBintImages, setNoBintImages] = useState(false);
  const [isBlackText, setIsBlackText] = useState(false);

  const handleWarningMessageText = (txt, showIcon) => {
    setWarningMessageText(txt);
    setWarningMessageTextShowIcon(showIcon);
  };

  const handleBackPopUpPress = () => {
    // this only shows from Preview to Results so just set number to 2
    setCurrentPageNumber(2);
    setShowPopUp(false);
    setPopUpMessage("");
  };

  const handleContinueButtonDisabled = (bool) => {
    setContinueButtonDisabled(bool);
  };

  const handleContinuePopUpPress = () => {
    // this runs when just 1 asset dropped
    // setLobbyAndOneAsset(true);
    // handle mediaExtensions state.
    if (mediaExtensions.landscape) {
      // setLobbyAndOneAssetIsLFD(true);
      const newExtension = mediaExtensions.landscape;
      setMediaExtensions((prevState) => ({
        ...prevState,
        portrait: newExtension,
      }));
    } else {
      //  setLobbyAndOneAssetIsLFD(false);
      const newExtension = mediaExtensions.portrait;
      setMediaExtensions((prevState) => ({
        ...prevState,
        landscape: newExtension,
      }));
    }

    setShowPopUp(false);
    setPopUpMessage("");
    okToGoToPageThree();
  };

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
      setBlankFilename(`${clientName}_${duration}_${product}blank_${countryCode}${fsValue}_${eORl}-${product}`);
    } catch {
      console.log("not yet");
    }
    return `${clientName}_${duration}_${desc}_${countryCode}${fsValue}_${eORl}-${product}`;
  };

  const getNewNameForDroppedFile = (filenameString, typeString) => {
    const eORl = inputValues.platform === "elevator" ? "e" : "l";

    const baseFilename = getFilename(inputValues, eORl, DATA_PRODUCTS.data[productIndex].label);

    const nameSplit = typeof filenameString === "undefined" ? "" : filenameString.split(".");
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
    return [getNewNameForDroppedFile(elevatorFile.name, "e"), getNewNameForDroppedFile(lfdFile.name, "l"), getNewNameForDroppedFile(pfdFile.name, "p"), getNewNameForDroppedFile(svgFile.name, "svg"), getNewNameForDroppedFile(standardAdFile.name, "standardAd")];
  };
  // creates an array of all names of files that were dropped.
  const getAllDroppedFilenames = () => {
    return [elevatorFile.name, lfdFile.name, pfdFile.name, svgFile.name, standardAdFile.name];
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

  const takeScreenshot = () => {
    console.log("taking screenshot");
    // the only place that this function is called is when there are no errors
    // on page 2 and it is time to go to page 3.  Because of this it is ok
    // to have a useEffect for state value SCREENSHOT.  When it changes, go to page 3
    // but unfortunately when moving back from 3 to 2 with numubers button and then
    // not changing the image means that the screen shot will be retaken but not changed
    // because the image taken is the same as the previous one.  This is fixed by adding
    // a random number to the screenshot state so it changes with every update
    htmlToImage
      .toPng(document.getElementById("screenGrabThis"))
      .then(function(dataUrl) {
        let randomValue = Math.random();
        setScreenshot([dataUrl, randomValue]);
      })
      .catch(() => {
        console.log("there was an error");
      });
  };

  const handleContinueButtonPressed = () => {
    setInputsCheckButtonPressedOnce(true);

    if (currentPageNumber === 1) {
      // moving from inputs to Elevator or LFD
      // check if all values filled in

      if (inputValues.client && inputValues.campaign && onlyLettersAndNumbers(inputValues.client) && onlyLettersAndNumbers(inputValues.campaign) && inputValues.product !== undefined && inputValues.countryCode && inputValues.platform && inputValues.duration) {
        // setInputComplete(true);
        console.log("complete");
        //setLobbyAndOneAssetIsLFD();
        //setLobbyAndOneAsset();
        handleWarningMessageText("", false);
        setInputsCheckButtonPressed(false);

        setCurrentPageNumber(2);
        handleWarningMessageText("drag and drop or click for upload", false);
      } else {
        // setInputComplete(false);
        console.log("not complete");
        handleWarningMessageText("input not complete.", true);
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
      let missingFilesArray = [];

      // check for primary files
      if (noBintImages) {
        // no need to check for images
      } else if (isElevator) {
        if (elevatorFile.payload) {
          console.log("elevator file found");

          //setElevatorFileError(false);
        } else {
          // shake the dropzone background image
          setShakeDropzoneBGImage(true);
          setTimeout(() => {
            setShakeDropzoneBGImage(false);
          }, "2000");

          console.log("elevator file missing");
          missingFilesArray.push("elevator");
          //setElevatorFileError(true);
          checkErrors++;
        }
      } else {
        if (lfdFile.payload) {
          console.log("l file found");
          //setLfdFileError(false);
        } else {
          // shake the dropzone background image
          setShakeDropzoneBGImage(true);
          setTimeout(() => {
            setShakeDropzoneBGImage(false);
          }, "2000");
          console.log("l file missing");
          missingFilesArray.push("lfd");
          //setLfdFileError(true);
          checkErrors++;
        }

        if (pfdFile.payload) {
          console.log("p file found");

          //setPfdFileError(false);
        } else {
          // shake the dropzone background image
          setShakeDropzoneBGImage(true);
          setTimeout(() => {
            setShakeDropzoneBGImage(false);
          }, "2000");
          console.log("p file missing");
          missingFilesArray.push("pfd");
          //setPfdFileError(true);
          checkErrors++;
        }
      }

      // check for svg
      if (inputValues.product === 4) {
        if (svgFile.payload) {
          //setSvgFileError(false);
          console.log("svg file found");
        } else {
          // shake the dropzone background image
          setShakeDropzoneBGImage(true);
          setTimeout(() => {
            setShakeDropzoneBGImage(false);
          }, "2000");
          //setSvgFileError(true);
          console.log("svg file missing");
          missingFilesArray.push("svg");
          checkErrors++;
        }
      }

      console.log("errors = ", checkErrors);
      if (checkErrors === 0) {
        // if all filled in, always progress
        console.log("running ok to go to 3 = ");
        okToGoToPageThree();
      } else if (!isElevator && (inputValues.product === 1 || inputValues.product === 3) && checkErrors === 1) {
        // lfsa or lvsa and 1 error, show overlay
        setShowPopUp(true);
        setPopUpMessage("The same asset will be used for both landscape and portrait.");
      } else {
        // elevator or lobby bint, lobby hfsp, lobby fsbi and errors > 0,
        // show the error text
        handleWarningMessageText(`files missing: ${missingFilesArray}`, true);
      }
    } else if (currentPageNumber === 3) {
      // hide inputs so form will be reset.
      deliverTemplateFiles();
    } else if (currentPageNumber === 4) {
      resetStateToBeginning();
      // show inputs so form is reset
    }
  };
  const okToGoToPageThree = () => {
    handleWarningMessageText("", false);
    // this sets filename and blank filename
    setFilename(getFilename);
    const productNumber = parseInt(inputValues.product);
    setRequiresBlankFile(DATA_PRODUCTS.data[productNumber].requiresBlankFile);

    setAllDroppedFilenames(getAllDroppedFilenames);

    setAllDroppedNewFilenames(getAllDroppedNewFilenames);

    // there is a bug.  when using the number buttons to return from pg
    // 3 to 2 and then hitting continue again, user can't get to page 3
    // because you only go to page 3 after screenshot changes.  by not dropping
    // a new file, screenshot does not change.  it just takes an image of the
    // same div
    takeScreenshot();
    //
  };
  useEffect(() => {
    console.log("screenshot changed");
    if (currentPageNumber === 2) {
      setCurrentPageNumber(3);
    }
  }, [screenshot]);

  const resetStateToBeginning = () => {
    window.location.reload();
  };

  // runs when product changes to set productIndex, isElevator, isFullScreen
  const effectHandleProductChange = () => {
    setProductIndex(inputValues.product);
    // clear all files and previews
    setElevatorFile({});
    setLfdFile({});
    setPfdFile({});
    setSvgFile({});
    setStandardAdFile({});
  };

  useEffect(() => {
    effectHandleProductChange();
  }, [inputValues.product]);

  // runs when product changes to set productIndex, isElevator, isFullScreen
  const effectHandlePlattformChange = () => {
    // clear all files and previews
    setElevatorFile({});
    setLfdFile({});
    setPfdFile({});
    setSvgFile({});
    setStandardAdFile({});
  };

  useEffect(() => {
    effectHandleProductChange();
  }, [inputValues.platform]);

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
    // if svg and lobby, get reference to the other svg

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
    // const eORl = isElevator ? "e" : "l";

    //const finalStandardAdFilename = `${inputValues.client}_${inputValues.duration}_${inputValues.campaign}_${inputValues.countryCode}_${eORl}-stnd`;

    // HTML file
    // valH is the text of the html template passed from TemplateCreator
    let contentH = getHTMLFile(filename, isElevator, mediaExtensions, productIndex, bintBGColor, isBlackText, noBintImages);
    let blobH = new Blob([contentH], {
      type: "text/plain;charset=utf-8",
    });

    // manifest file
    //valM is the text of the manifest template passed from TemplateCreator
    var contentM = getManifestFile(noBintImages, filename, isElevator, mediaExtensions, noBintImages);
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
          newZip.file(`${filename}_e${mediaExtensions.elevator === "mp4" ? "video" : "image"}.${mediaExtensions.elevator}`, result);
        })
      : "";

    // if this is a lobby 1 file and the source is a pfd, pfd is the source
    // else, lfd is the source
    //const lfdSource = lobbyAndOneAsset && lobbyAndOneAssetIsLFD === false ? pfdFile : lfdFile;
    // i think this will be fine because you no longer have any situation where lfd or pfd are empty
    const loadLFD = lfdFile.payload
      ? lfdFile.payload.arrayBuffer().then((result) => {
          newZip.file(`${filename}_l${mediaExtensions.landscape === "mp4" ? "video" : "image"}.${mediaExtensions.landscape}`, result);
        })
      : "";

    //const pfdSource = lobbyAndOneAsset && lobbyAndOneAssetIsLFD ? lfdFile : pfdFile;
    const loadPFD = pfdFile.payload
      ? pfdFile.payload.arrayBuffer().then((result) => {
          newZip.file(`${filename}_p${mediaExtensions.portrait === "mp4" ? "video" : "image"}.${mediaExtensions.portrait}`, result);
        })
      : "";

    const loadSVG = svgFile.payload
      ? svgFile.payload.arrayBuffer().then((result) => {
          newZip.file(`${filename}.svg`, result);
        })
      : "";

    // const loadStandardAd = standardAdFile.payload
    //   ? standardAdFile.payload.arrayBuffer().then((result) => {
    //       newZip.file(`${finalStandardAdFilename}.mp4`, result);
    //     })
    //   : "";

    const loadObject = [
      { file: elevatorFile, fn: loadElevator },
      { file: lfdFile, fn: loadLFD },
      { file: pfdFile, fn: loadPFD },
      { file: svgFile, fn: loadSVG },
      // { file: standardAdFile, fn: loadStandardAd },
    ];
    const promiseArray = loadObject.map((obj) => {
      if (obj.file.payload) {
        return obj.fn;
      } else return null;
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
        // final screen will always say 'downloading' and no way to see when finished.
        setCurrentPageNumber(4);
      })
      .catch((e) => {
        console.log("zip error");
      });
  };
  const handleBINTColorChange = (color) => {
    setBintBGColor(color);
  };
  const handleBlackWhiteToggleChange = () => {
    setIsBlackText((prevIsBlackText) => !prevIsBlackText);
  };
  const handleNoImagesToggleChange = () => {
    setNoBintImages((prevNoBintImages) => !prevNoBintImages);
    // clear out all dropped images
    effectHandlePlattformChange();

    console.log("changed");
  };

  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <div className="bgImageContainer">
        {showPopUp ? <PopUp popUpMessage={popUpMessage} handleBackPopUpPress={handleBackPopUpPress} handleContinuePopUpPress={handleContinuePopUpPress} /> : null}
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
            {currentPageNumber !== 4 ? <Filename inputValues={inputValues} /> : null}
            {currentPageNumber !== 4 ? <WarningMessage warningMessageText={warningMessageText} warningMessageTextShowIcon={warningMessageTextShowIcon} /> : null}
            {currentPageNumber === 2 && !isElevator ? (
              <div className="elpNavigatorContainer">
                <div data-value="1" onClick={handleELPNavClick} className={`elpNavButton ${currentBuildNavNumber === 1 ? "current" : "enabled"}`}>
                  LFD
                </div>
                <div data-value="2" onClick={handleELPNavClick} className={`elpNavButton ${currentBuildNavNumber === 2 ? "current" : inputValues.product === 1 && !isElevator && Object.keys(lfdFile).length === 0 ? "disabled" : "enabled"}`}>
                  PFD
                </div>
              </div>
            ) : null}

            {currentPageNumber === 2 && inputValues.product === 0 ? (
              <BlackWhiteToggleButton handleBINTColorChange={handleBINTColorChange} bintBGColor={bintBGColor} handleBlackWhiteToggleChange={handleBlackWhiteToggleChange} handleNoImagesToggleChange={handleNoImagesToggleChange}>
                {" "}
              </BlackWhiteToggleButton>
            ) : null}

            {currentPageNumber !== 4 ? <BackButton handleBackButton={handleBackButton} /> : null}
          </div>
          <div className="contentSub">
            {/* PAGE 1 */}
            {/* {`adBuildingPageInner ${currentBuildNavNumber === 2 ? "hide" : ""}`} */}

            {currentPageNumber !== 4 ? (
              <div className={`inputsPage page ${currentPageNumber !== 1 ? "hide" : ""}`}>
                <Inputs productIndex={productIndex} inputValues={inputValues} handleAnyInputsChange={handleAnyInputsChange} inputsCheckButtonPressed={inputsCheckButtonPressed} inputsCheckButtonPressedOnce={inputsCheckButtonPressedOnce} />
              </div>
            ) : null}

            {/* PAGE 2 */}

            <div className={`adBuildingPage page ${isElevator === true ? "elevator" : isElevator === false ? "landscape" : "portrait"} ${currentPageNumber !== 2 ? "hide" : ""}`}>
              {/* when this classname is set to e l or p, that's what sets the h and w of the div which contains all building elements*/}
              <div className={`adBuildingPageContent ${currentPageNumber === 2 && isElevator === true ? "elevator" : currentPageNumber === 2 && isElevator === false && currentBuildNavNumber === 1 ? "landscape" : "portrait"}`}>
                {/* elevator */}
                <div id={isElevator ? "screenGrabThis" : null} className={`adBuildingPageInner ${currentPageNumber === 2 && isElevator ? "" : "hide"}`}>
                  <PageElevator
                    noBintImages={noBintImages}
                    isBlackText={isBlackText}
                    bintBGColor={bintBGColor}
                    productIndex={productIndex}
                    inputValues={inputValues}
                    handleDropzoneChanges={handleDropzoneChanges}
                    handleWarningMessageText={handleWarningMessageText}
                    svgFile={svgFile}
                    elevatorFile={elevatorFile}
                    shakeDropzoneBGImage={shakeDropzoneBGImage}
                    handleContinueButtonDisabled={handleContinueButtonDisabled}
                  />
                </div>
                {/* lfd */}
                <div id={isElevator ? null : "screenGrabThis"} className={`adBuildingPageInner ${currentPageNumber === 2 && isElevator === false ? "" : "hide"}`}>
                  <div className={`adBuildingPageInner ${currentBuildNavNumber === 2 ? "hide" : ""}`}>
                    <PageLFD
                      noBintImages={noBintImages}
                      isBlackText={isBlackText}
                      bintBGColor={bintBGColor}
                      productIndex={productIndex}
                      inputValues={inputValues}
                      handleDropzoneChanges={handleDropzoneChanges}
                      handleWarningMessageText={handleWarningMessageText}
                      shakeDropzoneBGImage={shakeDropzoneBGImage}
                      svgFile={svgFile}
                      lfdFile={lfdFile}
                      pfdFile={pfdFile}
                      handleContinueButtonDisabled={handleContinueButtonDisabled}
                    />
                  </div>
                  {/* pfd */}

                  <div className={`adBuildingPageInner ${currentBuildNavNumber === 1 ? "hide" : ""}`}>
                    <PagePFD
                      noBintImages={noBintImages}
                      isBlackText={isBlackText}
                      bintBGColor={bintBGColor}
                      productIndex={productIndex}
                      inputValues={inputValues}
                      handleDropzoneChanges={handleDropzoneChanges}
                      handleWarningMessageText={handleWarningMessageText}
                      svgFile={svgFile}
                      lfdFile={lfdFile}
                      pfdFile={pfdFile}
                      shakeDropzoneBGImage={shakeDropzoneBGImage}
                      handleContinueButtonDisabled={handleContinueButtonDisabled}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE 3 */}

            <div className={`resultsPage page ${currentPageNumber !== 3 ? "hide" : ""}`}>
              <Results
                allDroppedFilenames={allDroppedFilenames}
                allDroppedNewFilenames={allDroppedNewFilenames}
                filename={filename}
                blankFilename={blankFilename}
                requiresBlankFile={requiresBlankFile}
                bintBGColor={bintBGColor}
                productIndex={productIndex}
                isBlackText={isBlackText}
                inputValues={inputValues}
                screenshot={screenshot}
              />
            </div>
          </div>

          <div className="navSub">
            {currentPageNumber !== 4 ? (
              <div className="buttonsHolder">
                <div onClick={circleButtonClickHandler} dataindex={1} className={`circleButton ${currentPageNumber === 1 ? "current" : "enabled"}`}>
                  1
                </div>
                <div onClick={circleButtonClickHandler} dataindex={2} className={`circleButton ${currentPageNumber === 2 ? "current" : currentPageNumber > 2 ? "enabled" : "disabled"}`}>
                  2
                </div>
                <div onClick={circleButtonClickHandler} dataindex={4} className={`circleButton ${currentPageNumber === 3 ? "current" : "disabled"}`}>
                  3
                </div>
              </div>
            ) : null}

            <ContinueButton currentPageNumber={currentPageNumber} handleContinueButtonPressed={handleContinueButtonPressed} continueButtonDisabled={continueButtonDisabled}></ContinueButton>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
