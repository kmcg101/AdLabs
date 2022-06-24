import React from "react";

import Confetti from 'react-confetti'

const ConfirmationScreen = (props) => {
  const fullScreenBG = {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "green",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, .6)',
    color: 'white',
    backdropFilter: "blur(10px)",
    fontFamily: 'Avenir-Heavy'
  }

  const successMessage = {
    fontSize: "22px",
  }

  const downloadStartedMessage = {
    fontSize: "16px",
    borderRadius: "1px",
    backgroundImage: "linear-gradient( 90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.50196) 100%)",
    boxShadow: "0px 4px 9.4px 0.6px rgba(0, 0, 0, 0.33)",
    width: "231px",
    height: "72px",
    marginTop: "20px",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }

  const confettiStyle = {
    position: "fixed",
    width: "1280px"
  }
 

  return (

    <div style={fullScreenBG} className='fullScreenBG'>
      <Confetti style={confettiStyle}
      
    />
      <div style={successMessage} className='successMessage'>SUCCESS</div>
      <div style={downloadStartedMessage} className='downloadStartedMessage'>YOUR DOWNLOAD HAS STARTED</div>
    </div>


  )
}

export default ConfirmationScreen;