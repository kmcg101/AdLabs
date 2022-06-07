
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
import './nav.css'
import Data from "./data.json";
import TemplateCreator from "./templates/Template_Creator.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import PageElevator from './pages/PageElevator';
import PageLFD from './pages/PageLFD';
import PagePFD from './pages/PagePFD';
import Inputs from "./pages/Inputs";
import Results from "./pages/Results";
import DATA_PRODUCTS from "./DATA_PRODUCTS"

function App() {

  // increases as user hits continue
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  // elevator, lfd, pfd
  const [currentAdBuildingPageNumber, setCurrentAdBuildingPageNumber] = useState(1);

  const [productIndex, setProductIndex] = useState(4);
  const [inputsCheckButtonPressed, setInputsCheckButtonPressed] = useState(false)

  const [menuButtonIndex, setMenuButtonIndex] = useState(1);
  const [inputComplete, setInputComplete] = useState(false);

  const [isElevator, setIsElevator] = useState();
  const [isFullScreen, setIsFullScreen] = useState();
  const [requiresBlankFile, setRequiresBlankFile] = useState();

  // these are all the values in the current product's data file
  const [productValues, setProductValues] = useState({})
  const [inputValues, setInputValues] = useState({
    client: "",
    campaign: "",
    //mediaType: 'image'
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
  const [elevatorFile, setElevatorFile] = useState({});  //14
  const [lfdFile, setLfdFile] = useState({});
  const [pfdFile, setPfdFile] = useState({});
  const [svgFile, setSvgFile] = useState({}); // 17
  const [standardAdFile, setStandardAdFile] = useState({}); //18

  const [allDroppedFilenames, setAllDroppedFilenames] = useState([])
  const [allDroppedNewFilenames, setAllDroppedNewFilenames] = useState([])

  const [mediaExtension, setMediaExtension] = useState();

  // inputValues is passed to Input which is then passed to each select and text box
  // those children pass the data up to the handleAnyInputChange() function

  const getFilename = () => {
    //refreshtest_15_widget1_us_e-bint
    //refreshtest_15_fsastatic_us_fs_e-fsa 

    const productNumber = parseInt(inputValues.product)

    const clientName = inputValues.client;
    const duration = inputValues.duration;
    const desc = inputValues.campaign;
    const countryCode = inputValues.countryCode;
    const eORl = inputValues.platform === 'elevator' ? 'e' : 'l';
    const fsValue = DATA_PRODUCTS.data[productNumber].isFS ? "_fs" : ""
    const product = DATA_PRODUCTS.data[productNumber].label;

    return (`${clientName}_${duration}_${desc}_${countryCode}${fsValue}_${eORl}-${product}`)

  }

  const getDroppedFileName = (filenameString, typeString) => {
    /*
    heineken_15_dryjanuary22_us_fs_e-fsa_video

    filename + (elp) + videoORImage . same extension

    elevator file
    lfd file
    pfd file
    svg file
    standard ad
    */
    
    console.log("trying to split ", filenameString)
    
    const baseFilename = getFilename();
    const eORl = inputValues.platform === 'elevator' ? 'e' : 'l';
    const nameSplit = filenameString.split(".");
    const ext = nameSplit[1];
    const videoOrImageString = ext === "mp4" ? "video" : 'image'
    let returnValue = '';

    if (typeString === 'svg') {
      returnValue = (`${baseFilename}.${ext}`)
    }
    else if (typeString === 'stdandardAd') {
      returnValue = (`${baseFilename}.${ext}`)
    }
    else {
      returnValue = (`${baseFilename}_${eORl}${videoOrImageString}.${ext}`)
    }

    return returnValue

  }

  const getAllDroppedNewFilenames = () => {
    return ([
      getDroppedFileName(elevatorFile.name, "e"),
      getDroppedFileName(lfdFile.name, "l"),
      getDroppedFileName(pfdFile.name, "p"),
      getDroppedFileName(svgFile.name,'svg'),
      getDroppedFileName(standardAdFile.name, 'standardAd')
    ])
  }
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

  const circleButtonClickHandler = (e) => {
    const numberValue = parseInt(e.target.attributes.dataindex.value)
    console.log("num value = ", numberValue)
    setCurrentPageNumber(numberValue);

  }

  const handleContinueButtonPressed = () => {
    if (currentPageNumber === 1) {
      // check if all values filled in
      if (
        inputValues.client &&
        inputValues.campaign &&
        inputValues.product !== undefined &&
        inputValues.countryCode &&
        inputValues.platform &&
        inputValues.duration
      ) {
        setInputComplete(true);
        console.log("complete")
        setInputsCheckButtonPressed(false);
        setCurrentPageNumber(2);
      } else {
        setInputComplete(false);
        console.log("not complete")
        setInputsCheckButtonPressed(true);
      }
    }
    else if (currentPageNumber === 2) {
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
      // moving from ad builder to results page:
      // set file name
      // set blank file name
      // set fsValue
      // fileTypePrefixNoSlash
      // eORlORp
      // mediaExtension
      console.log('filename = ', getFilename())
      setFilename(getFilename)
      setAllDroppedFilenames(getAllDroppedFilenames)
      setAllDroppedNewFilenames(getAllDroppedNewFilenames)
      // 
      setCurrentPageNumber(3);
    }
  };

  const handleAdBuildingNavClick = (e) => {
    const numberValue = parseInt(e.target.attributes.dataindex.value)
    console.log(numberValue)
    setCurrentAdBuildingPageNumber(numberValue)
  }



  // runs when product changes to set productIndex, isElevator, isFullScreen
  const effectHandleProductChange = () => {
    setProductIndex(inputValues.product)

    // clear all files and previews
    setElevatorFile({})
    setLfdFile({})
    setPfdFile({})
    setSvgFile({})
    setStandardAdFile({})

    // now set all values in inputValues for all values in the data element of current product

    //PRODUCT_DATA[inputValues.product]
    //Object.keys(courses);
    //const keys = Object.keys(PRODUCT_DATA.data[inputValues.product]);
    //console.log('keys = ', keys);


    /*
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
    */
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
    inputValues.product,
  ]);

  ///////////////////////////////////////////////////////

  const handleTabClick = (ind) => {
    //console.log(ind)
    setMenuButtonIndex(ind);
  };

  // handler for all inputs
  const handleAnyInputsChange = (name, value) => {
    // if this is setting elevator or lobby, change currentAdBuildingPageNumber to show either elev or lfp
    if (name === 'platform') {
      if (value === 'elevator') {
        setCurrentAdBuildingPageNumber(1)
      }
      else {
        setCurrentAdBuildingPageNumber(2)
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
    <div className='bgImageContainer'>
      <div className="appContainer">
        <div className='topSub'></div>
        <div className='contentSub'>


          <div className={`inputsPage page ${currentPageNumber === 1 ? "active-page" : ""}`}>
            <Inputs
              productIndex={productIndex}
              inputValues={inputValues}
              handleAnyInputsChange={handleAnyInputsChange}
              inputsCheckButtonPressed={inputsCheckButtonPressed}
            />
          </div>
          <div className={`adBuildingPage page ${currentPageNumber === 2 ? "active-page-flex" : ""} ${currentAdBuildingPageNumber === 1 ? "elevator" : currentAdBuildingPageNumber === 2 ? "landscape" : "portrait"}`}>
            <div className='platformButtonContainer'>
              <div onClick={handleAdBuildingNavClick} dataindex={1} className={`platformButton ${currentAdBuildingPageNumber === 1 ? "platformButtonOn" : ""} ${inputValues.platform === 'elevator' ? "" : "platformButtonDisabled"}`}>EDU</div>
              <div onClick={handleAdBuildingNavClick} dataindex={2} className={`platformButton ${currentAdBuildingPageNumber === 2 ? "platformButtonOn" : ""} ${inputValues.platform === 'lobby' ? "" : "platformButtonDisabled"}`}>LFD</div>
              <div onClick={handleAdBuildingNavClick} dataindex={3} className={`platformButton ${currentAdBuildingPageNumber === 3 ? "platformButtonOn" : ""} ${inputValues.platform === 'lobby' ? "" : "platformButtonDisabled"}`}>PFD</div>
            </div>

            <div className={`adBuildingPageContent ${currentAdBuildingPageNumber === 1 ? "elevator" : currentAdBuildingPageNumber === 2 ? "landscape" : "portrait"}`}>

              <div className={`adBuildingPageInner ${currentAdBuildingPageNumber === 1 ? "adBuildingPageInnerActive" : "adBuildingPageInnerInactive"}`}>
                <PageElevator
                  productIndex={productIndex}
                  inputValues={inputValues}
                  handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
                />
              </div>

              <div className={`adBuildingPageInner ${currentAdBuildingPageNumber === 2 ? "adBuildingPageInnerActive" : "adBuildingPageInnerInactive"}`}>
                <PageLFD
                  productIndex={productIndex}
                  inputValues={inputValues}
                  handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
                />
              </div>

              <div className={`adBuildingPageInner ${currentAdBuildingPageNumber === 3 ? "adBuildingPageInnerActive" : "adBuildingPageInnerInactive"}`}>
                <PagePFD
                  productIndex={productIndex}
                  inputValues={inputValues}
                  handleAllDropzoneChangesParent={handlePFDDropzoneChanges} />
              </div>


            </div>

          </div>

          <div className={`resultsPage page ${currentPageNumber === 3 ? "active-page" : ""}`}>
            <Results allDroppedFilenames={allDroppedFilenames} allDroppedNewFilenames={allDroppedNewFilenames} filename={filename} />
          </div>
        </div>



        <div className='navSub'>
          <div className='buttonsHolder'>
            <div onClick={circleButtonClickHandler} dataindex={1} className={`circleButton ${currentPageNumber === 1 ? "current" : currentPageNumber === 2 ? "enabled" : currentPageNumber === 3 ? "enabled" : "disabled"}`} id='b1'>1</div>
            <div onClick={circleButtonClickHandler} dataindex={2} className={`circleButton ${currentPageNumber === 2 ? "current" : currentPageNumber === 3 ? "enabled" : "disabled"}`} id='b1'>2</div>
            <div onClick={circleButtonClickHandler} dataindex={3} className='circleButton disabled' id='b1'>3</div>
          </div>
          <div className='continueButton' onClick={handleContinueButtonPressed}>CONTINUE</div>
        </div>
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
