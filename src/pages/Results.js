import React from "react";
import { isNullOrUndefined } from "util";
import "../App.css";

const Results = (props) => {
  const resultsFullPage = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const resultsTopRow = {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
  };

  const resultsBottomRow = {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
  };
  const halfWidth = {
    width: "40%",
  };

  const inputValues = props.inputValues;
  const filename = props.filename;
  const blankFilename = props.blankFilename;
  const requiresBlankFile = props.requiresBlankFile;

  const bintBGColor = props.bintBGColor;

  const allDroppedFilenames = props.allDroppedFilenames;
  const allDroppedNewFilenames = props.allDroppedNewFilenames;

  const allDroppedFilenamesFiltered = allDroppedFilenames.filter(
    (val) => val !== undefined
  );
  const allDroppedNewFilenamesFiltered = allDroppedNewFilenames.filter(
    (val) => val !== undefined
  );

  const ulStyle = {
    listStyleType: "none",
  };

  const listOfDroppedFiles = allDroppedFilenamesFiltered.map((items) => (
    <li key={items} style={ulStyle}>
      {items}
    </li>
  ));

  const listOfDroppedFilesNewFilenames = allDroppedNewFilenamesFiltered.map(
    (items) => (
      <li key={items} style={ulStyle}>
        {items}
      </li>
    )
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
      <div className="resultsTopRow" style={resultsTopRow}>
        <div className="resultsTopLeft" style={halfWidth}>
          <div className="resultsSegmentContainer">
            <div className="resultsTitleText">AD NAME:</div>
            <div className="resultsTextHolder">{filename}</div>
            {inputValues.product === 0 ? (
              <div className="resultsTitleText">Custom Color:</div>
            ) : (
              isNullOrUndefined
            )}
            {inputValues.product === 0 ? (
              <div className="resultsTextHolder">#{bintBGColor}</div>
            ) : null}
          </div>
        </div>
        <div className="resultsTopRight" style={halfWidth}>
          <div className="resultsSegmentContainer">
            <div className="resultsTitleText">AD FILES FOR DOWNLOAD:</div>
            <div className="resultsTextHolder">{listOfReturnedFiles}</div>
          </div>
        </div>
      </div>
      <div className="resultsBottomRow" style={resultsBottomRow}>
        <div className="resultsBottomLeft" style={halfWidth}>
          <div className="resultsSegmentContainer">
            <div className="resultsTitleText">ASSET FILES FOR UPLOAD:</div>
            <div className="resultsTextHolder">{listOfDroppedFiles}</div>
          </div>
        </div>

        <div className="resultsBottomRight" style={halfWidth}>
          <div className="resultsSegmentContainer">
            <div className="resultsTitleText">ASSET FILES FOR DOWNLOAD</div>
            <div className="resultsTextHolder">
              {listOfDroppedFilesNewFilenames}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
