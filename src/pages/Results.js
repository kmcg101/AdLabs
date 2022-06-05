import React from "react";
import '../App.css'


const Results = (props) => {

    const inputValues = props.inputValues;

    return (
        <div className='inputsFullPage'>
            <div className='inputsLeftColumn'>
                <div className='resultsSegmentContainer'>
                    <div className='resultsTitleText'>AD NAME:</div>
                    <div className='resultsTextHolder'>result</div>
                </div>
                <div className='resultsSegmentContainer'>
                    <div className='resultsTitleText'>ASSET FILES FOR UPLOAD:</div>
                    <div className='resultsTextHolder'>result</div>
                </div>
               
            </div>
            <div className='inputsRightColumn'>
                <div className='resultsSegmentContainer'>
                    <div className='resultsTitleText'>AD FILES FOR DOWNLOAD:</div>
                    <div className='resultsTextHolder'>result</div>
                </div>
                <div className='resultsSegmentContainer'>
                    <div className='resultsTitleText'>ASSET FILES FOR DOWNLOAD</div>
                    <div className='resultsTextHolder'>result</div>
                </div>
               
            </div>
        </div>


    );
};

export default Results;
