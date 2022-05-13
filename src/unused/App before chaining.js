
// git add .
// git commit -m 'after splitting table to bottom'
// git push origin main 
// figure out extra files like svg
// how to handle blank html, blank manifest
// accept standard ad for bint
// remove login
// table
// turn on/off tabs based on all filled out

// try not setting filename until final button push

import React, { useEffect, useState } from "react";
import "./App.css";
import Data from "./data.json";
import Template_Creator from './templates/Template_Creator.js'
import JSZip from 'jszip'
import FileSaver from 'file-saver'


// pages
import E_bint from "./productPages/E_bint";
import E_fsa from "./productPages/E_fsa";
import E_vsa from "./productPages/E_vsa";
import E_hfsp from "./productPages/E_hfsp";
import E_fsbi from "./productPages/E_fsbi";

import L_bint from "./productPages/L_bint";
import L_fsa from "./productPages/L_fsa";
import L_vsa from "./productPages/L_vsa";
import L_hfsp from "./productPages/L_hfsp";
import L_fsbi from "./productPages/L_fsbi";

import P_bint from "./productPages/P_bint";
import P_fsa from "./productPages/P_fsa";
import P_vsa from "./productPages/P_vsa";
import P_hfsp from "./productPages/P_hfsp";
import P_fsbi from "./productPages/P_fsbi";

import Inputs from "./Inputs";

function App() {
  const [productIndex, setProductIndex] = useState();
  const [menuButtonIndex, setMenuButtonIndex] = useState(1);
  const [inputComplete, setInputComplete] = useState(false);

  const [isElevator, setIsElevator] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState();
  const [requiresBlankFile, setRequiresBlankFile] = useState();

  const [inputValues, setInputValues] = useState({
    client: "ca",
    campaign: "new",
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
          setProductIndex(i);
          // determine if FS or not
          setIsFullScreen(Data.products[i].isFullScreen);
          // determine if Elevator or not
          setIsElevator(Data.products[i].isElevator);
          // determine if requires blank file or not
          setRequiresBlankFile(Data.products[i].requiresBlankFile);
        }
      });
    } else {
      // this is the case where selection is set to -Select-, not found in search
      setProductIndex(undefined);
      setIsFullScreen(undefined);
      setIsElevator(undefined);
      setRequiresBlankFile(undefined);
    }
  };

  useEffect(() => {
    effectHandleProductChange();
  }, [inputValues.product]);

  ////////////////////////////////////////////////////////


  // any time input values changes, set filename
  const setReturnFilename = () => {
    const fsValue = isFullScreen ? `_fs` : ``
    console.log("")
    //heineken_15_dryjanuary22_us_fs_l-fsa
    setFilename(`${inputValues.client}_${inputValues.duration}_${inputValues.campaign}_${inputValues.countryCode}${fsValue}_${inputValues.product}`)

    //refreshtest_15_fsbiblank_us_fs_e-fsbi
    try {
      setBlankFilename(`${inputValues.client}_${inputValues.duration}_${Data.products[productIndex].productShortName}blank_${inputValues.countryCode}${fsValue}_${inputValues.product}`)
    }
    catch {
      console.log("not yet")
    }



    // check if all inputs entered
    if (inputValues.client && inputValues.campaign && inputValues.product && inputValues.countryCode && inputValues.mediaType && inputValues.duration) {
      setInputComplete(true);
    }
    else {
      setInputComplete(false);
    }
  }

  useEffect(() => {
    setReturnFilename();
  }, [inputValues]);
  useEffect(() => {
    setReturnFilename();
  }, [inputValues.isFullScreen]);

  ///////////////////////////////////////////////////////

  const handleTabClick = (ind) => {
    //console.log(ind)
    setMenuButtonIndex(ind);
  };

  const handleAnyInputsChange = (e) => {

    if (e.target.value === " Select ") {
      setInputValues((prevState) => ({
        ...prevState,
        [e.target.name]: undefined,
      }));
    } else {
      setInputValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }


  };

  /////////////////////////////////////////////////

  const handleElevatorDropzoneChanges = (name, value) => {
    setElevatorFile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // get extension
    if (name === 'name') {
      const splitValue = value.split('.')
      setMediaExtension(splitValue[1])
    }

  };
  const handleLFDDropzoneChanges = (name, value) => {
    setLfdFile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // get extension
    if (name === 'name') {
      const splitValue = value.split('.')
      setMediaExtension(splitValue[1])
    }
  };
  const handlePFDDropzoneChanges = (name, value) => {
    setPfdFile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // get extension
    if (name === 'name') {
      const splitValue = value.split('.')
      setMediaExtension(splitValue[1])
    }
  };

  ///////////////////////////////////////////////

  // * zip 'em up
  function deliverTemplateFiles(valH, valM, ext) {
    // HTML file
    let contentH = valH;
    let blobH = new Blob([contentH], {
      type: "text/plain;charset=utf-8"
    });

    // manifest file
    var contentM = valM;
    var blobM = new Blob([contentM], {
      type: "text/plain;charset=utf-8"
    });


    var fileReader = new FileReader();
    fileReader.onload = (e) => {

      const arrayBuffer = e.target.result;
      // * figure out how to make this type correct as well e or l in name
      const fileType = 'image/png';

      const blobI = new Blob([arrayBuffer], {
        type: fileType
      });
      let newZip = new JSZip()
      newZip.file(`${filename}.html`, blobH)
      newZip.file(`${filename}.manifest`, blobM)
      newZip.file(`${filename}_eimage.${mediaExtension}`, blobI);

      newZip.generateAsync({ type: "blob" }).
        then(function (content) {
          saveAs(content, `${filename}.zip`)
        })
    }
    fileReader.readAsArrayBuffer(elevatorFile.payload);
  }


  return (
    <div className="appContainer">
      <div className="appTitle">Captivate Ad Creator 3600x</div>
      <Template_Creator isElevator={isElevator} deliverTemplateFiles={deliverTemplateFiles} productIndex={productIndex} filename={filename} mediaExtension={mediaExtension} />
      <div className="pageAndMenuContainer">
        <div className="pageContainer">
          <div className={`page ${menuButtonIndex === 0 ? "active-page" : ""}`}>
            Login
          </div>
          <div className={`page ${menuButtonIndex === 1 ? "active-page" : ""}`}>
            <Inputs
              inputValues={inputValues}
              handleAnyInputsChange={handleAnyInputsChange}
            />
          </div>
          <div
            className={`elevatorPage page ${menuButtonIndex === 2 ? "active-page" : ""
              }`}
          >
            <div
              className={`productPage ${inputValues.product === "e-bint" ? "productPageActive" : ""
                }`}
            >
              <E_bint
                handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "e-fsa" ? "productPageActive" : ""
                }`}
            >
              <E_fsa
                handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "e-hfsp" ? "productPageActive" : ""
                }`}
            >
              <E_hfsp
                handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "e-vsa" ? "productPageActive" : ""
                }`}
            >
              <E_vsa
                handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "e-fsbi" ? "productPageActive" : ""
                }`}
            >
              <E_fsbi
                handleAllDropzoneChangesParent={handleElevatorDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
          </div>
          <div className={`page ${menuButtonIndex === 3 ? "active-page" : ""}`}>
            LFD
            <div
              className={`productPage ${inputValues.product === "L-bint" ? "productPageActive" : ""
                }`}
            >
              <L_bint
                handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "L-fsa" ? "productPageActive" : ""
                }`}
            >
              <L_fsa
                handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "L-hfsp" ? "productPageActive" : ""
                }`}
            >
              <L_hfsp
                handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "L-vsa" ? "productPageActive" : ""
                }`}
            >
              <L_vsa
                handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "L-fsbi" ? "productPageActive" : ""
                }`}
            >
              <L_fsbi
                handleAllDropzoneChangesParent={handleLFDDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
          </div>
          <div className={`page ${menuButtonIndex === 4 ? "active-page" : ""}`}>
            PFD
            <div
              className={`productPage ${inputValues.product === "L-bint" ? "productPageActive" : ""
                }`}
            >
              <P_bint
                handleAllDropzoneChangesParent={handlePFDDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "L-fsa" ? "productPageActive" : ""
                }`}
            >
              <P_fsa
                handleAllDropzoneChangesParent={handlePFDDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "L-hfsp" ? "productPageActive" : ""
                }`}
            >
              <P_hfsp
                handleAllDropzoneChangesParent={handlePFDDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "L-vsa" ? "productPageActive" : ""
                }`}
            >
              <P_vsa
                handleAllDropzoneChangesParent={handlePFDDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
            <div
              className={`productPage ${inputValues.product === "L-fsbi" ? "productPageActive" : ""
                }`}
            >
              <P_fsbi
                handleAllDropzoneChangesParent={handlePFDDropzoneChanges}
                productIndex={productIndex}
                assetType={inputValues.mediaType}
              />
            </div>
          </div>
        </div>
        <div className="tableContainer">Table</div>
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
