import React from "react";
import '../App.css'


const Results = (props) => {


  const resultsFullPage = {
    width: '100%',
    height: '100%',
    display: 'flex'
  }
  
  const resultsLeftColumn = {
    marginRight: "50px"
  }

  const resultsRightColumn = {
   
  }
  

    const inputValues = props.inputValues;
    const filename = props.filename
    const allDroppedFilenames = props.allDroppedFilenames;
    const allDroppedNewFilenames = props.allDroppedNewFilenames;

    //const allDroppedFilenames = ["a", "b", undefined]
    console.log("before crash, allDroppedFilenames = ", allDroppedFilenames)
    const allDroppedFilenamesFiltered = allDroppedFilenames.filter(val => val !== undefined)
    const allDroppedNewFilenamesFiltered = allDroppedNewFilenames.filter(val => val !== undefined)

    const ulStyle = {
        listStyleType: "none"
    }

    const listOfDroppedFiles = allDroppedFilenamesFiltered.map((items) =>
        <li style={ulStyle}>{items}</li>
    );

    const listOfDroppedFilesNewFilenames = allDroppedNewFilenamesFiltered.map((items) =>
        <li style={ulStyle}>{items}</li>
    );


    const listOfReturnedFiles = () => {
        return (
            <div>
                <ul style={ulStyle}>
                    <li>{filename}.html</li>
                    <li>{filename}.manifest</li>
                </ul>
            </div>

        )
    }

    return (
        <div style={resultsFullPage}>
            <div style={resultsLeftColumn}>
                <div className='resultsSegmentContainer'>
                    <div className='resultsTitleText'>AD NAME:</div>
                    <div className='resultsTextHolder'>{filename}</div>
                </div>
                <div className='resultsSegmentContainer'>
                    <div className='resultsTitleText'>ASSET FILES FOR UPLOAD:</div>
                    <div className='resultsTextHolder'>{listOfDroppedFiles}</div>
                </div>

            </div>
            <div style={resultsRightColumn}>
                <div className='resultsSegmentContainer'>
                    <div className='resultsTitleText'>AD FILES FOR DOWNLOAD:</div>
                    <div className='resultsTextHolder'>{listOfReturnedFiles()}</div>
                </div>
                <div className='resultsSegmentContainer'>
                    <div className='resultsTitleText'>ASSET FILES FOR DOWNLOAD</div>
                    <div className='resultsTextHolder'>{listOfDroppedFilesNewFilenames}</div>
                </div>

            </div>
        </div>


    );
};

export default Results;
