import React from "react";
import { isNullOrUndefined } from "util";
import myPreview from "../assets/preview.png";

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

const resultsTextHolder = {
  fontFamily: "Avenir-Roman",
  paddingLeft: "10px",
  paddingRight: "30px",
  fontSize: "1.3rem",
  lineHeight: "2.1",
  color: "white",
  minHeight: "37px",
  borderRadius: "1px",
  backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)",
  boxShadow: "var(--standard-box-shadow-color)",
  marginBottom: "20px",
};

const myColumn = {
  // width: "30%",
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
  // alignItems: "center",
};
const columnLeft = {};
const columnCenter = {};
const columnRight = {};

const resultsTopLeft = {
  textAlign: "center",
};
const resultsTopCenter = { textAlign: "center" };
const resultsTopRight = { textAlign: "center" };
const resultsBottomLeft = {};
const resultsBottomCenter = {
  transform: "scale(.9)",
  transformOrigin: "top left",
};
const resultsBottomRight = {};

const Results = (props) => {
  const inputValues = props.inputValues;
  const filename = props.filename;
  const blankFilename = props.blankFilename;
  const requiresBlankFile = props.requiresBlankFile;

  const bintBGColor = props.bintBGColor;
  const productIndex = props.productIndex;
  const isBlackText = props.isBlackText;

  const allDroppedFilenames = props.allDroppedFilenames;
  const allDroppedNewFilenames = props.allDroppedNewFilenames;

  const allDroppedFilenamesFiltered = allDroppedFilenames.filter((val) => val !== undefined);
  const allDroppedNewFilenamesFiltered = allDroppedNewFilenames.filter((val) => val !== undefined);

  const ulStyle = {
    listStyleType: "none",
  };

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
        <li>{listOfDroppedFiles}</li>
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
        <div className="resultsTopLeft" style={(resultsTopLeft, resultsTitleText)}>
          INPUT
        </div>
        <div className="resultsBottomLeft" style={(resultsBottomLeft, resultsTextHolder)}>
          {listOfInput}
        </div>
        <div className="resultsTopRight" style={(resultsTopRight, resultsTitleText)}>
          OUTPUT
        </div>
        <div className="resultsBottomRight" style={(resultsBottomRight, resultsTextHolder)}>
          {listOfDroppedFilesNewFilenames}
          {listOfReturnedFiles}
        </div>
      </div>

      <div className="columnCenter" style={myColumn}>
        <div className="resultsTopCenter" style={(resultsTopCenter, resultsTitleText)}>
          PREVIEW
        </div>
        <div className="resultsBottomCenter" style={resultsBottomCenter}>
          <img src={myPreview} alt="preview"></img>
        </div>
      </div>
    </div>
  );
};

export default Results;
