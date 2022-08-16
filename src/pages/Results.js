import React from "react";
// import { isNullOrUndefined } from "util";

const screenshotImage = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "top left",
};
const resultsFullPage = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
};

const resultsTitleText = {
  fontFamily: "Avenir-Heavy",
  fontSize: "1rem",
  color: "white",
  marginBottom: "7px",
  fontWeight: "700",
};
const resultsTitleTextRight = {
  fontFamily: "Avenir-Heavy",
  fontSize: "1rem",
  color: "white",
  marginBottom: "7px",
  fontWeight: "700",
  height: "5%",
};

const myColumn = {
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
};

const resultsBottomCenter = {
  width: "100%",
  height: "89.5%",
};
const resultsTextHolderScroll = {
  fontFamily: "Avenir-Roman",
  paddingLeft: "10px",
  paddingRight: "30px",
  fontSize: "1.3rem",
  lineHeight: "2.1",
  color: "white",
  maxHeight: "250px",
  minHeight: "100px",
  borderRadius: "1px",
  backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)",
  boxShadow: "var(--standard-box-shadow-color)",
  marginBottom: "20px",
  overflowY: "auto",
  scrollbarColor: "green",
  scrollbarWidth: "thin",
};
const ulStyle = {
  listStyleType: "none",
};

const Results = ({
  inputValues,
  filename,
  blankFilename,
  requiresBlankFile,
  screenshot,
  bintBGColor,
  productIndex,
  isBlackText,
  allDroppedFilenames,
  allDroppedNewFilenames,
}) => {
  const allDroppedFilenamesFiltered = allDroppedFilenames.filter((val) => val !== undefined);
  const allDroppedNewFilenamesFiltered = allDroppedNewFilenames.filter((val) => val !== undefined);

  const listOfDroppedFiles = allDroppedFilenamesFiltered.map((items) => (
    <li key={items} style={ulStyle}>
      {items}
    </li>
  ));
  // this will probably include svg, elp, and svg
  const listOfDroppedFilesNewFilenames = allDroppedNewFilenamesFiltered.map((items) => (
    <li key={items} style={ulStyle}>
      {items}
    </li>
  ));

  const listOfInput = (
    <div>
      <ul style={ulStyle}>
        {listOfDroppedFiles}
        {productIndex === 0 ? <li>#{bintBGColor}</li> : null}
        {productIndex === 0 && isBlackText === true ? <li>Black</li> : null}
        {productIndex === 0 && isBlackText === false ? <li>White</li> : null}
      </ul>
    </div>
  );

  const listOfReturnedFiles = (
    <div>
      <ul style={ulStyle}>
        <li>{filename}.html</li>
        <li>{filename}.manifest</li>
        {requiresBlankFile ? <li>{blankFilename}.html</li> : null}
        {requiresBlankFile ? <li>{blankFilename}.manifest</li> : null}
      </ul>
    </div>
  );

  return (
    <div className="resultsFullPage" style={resultsFullPage}>
      <div className="columnLeft" style={myColumn}>
        <div className="resultsTitleText" style={resultsTitleText}>
          INPUT
        </div>
        <div className="listOutput" style={resultsTextHolderScroll}>
          {listOfInput}
        </div>
        <div className="resultsTitleText" style={resultsTitleText}>
          OUTPUT
        </div>
        <div className="listOutput" style={resultsTextHolderScroll}>
          {listOfDroppedFilesNewFilenames}
          {listOfReturnedFiles}
        </div>
      </div>

      <div className="columnCenter" style={myColumn}>
        <div className="resultsTopCenter" style={resultsTitleTextRight}>
          PREVIEW
        </div>
        <div className="resultsBottomCenter" style={resultsBottomCenter}>
          {screenshot ? <img style={screenshotImage} src={screenshot[0]} alt="preview"></img> : null}
        </div>
      </div>
    </div>
  );
};

export default Results;
