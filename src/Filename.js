import React, { useState, useEffect, useMemo } from "react";
import DATA_PRODUCTS from "./DATA_PRODUCTS";

function Filename(props) {
  const filenameFormat = {
    fontSize: "2.2em",
    color: "white",
    fontFamily: "Avenir-Heavy",
    position: "absolute",
    top: "55px",
  };
  const productNumber = parseInt(props.inputValues.product);
  const company = props.inputValues.client ? props.inputValues.client : "client";
  const description = props.inputValues.campaign ? props.inputValues.campaign : "desc";
  const duration = props.inputValues.duration ? props.inputValues.duration : "dur";
  const countryCode = props.inputValues.countryCode ? props.inputValues.countryCode : "lang";
  const fsValue = !productNumber ? "" : DATA_PRODUCTS.data[productNumber].isFS ? "_fs" : "";
  const product = typeof props.inputValues.product === "undefined" ? "prod" : DATA_PRODUCTS.data[productNumber].label;

  const eORl = !props.inputValues.platform ? "netwk" : props.inputValues.platform === "elevator" ? "e" : "l";
  return (
    <div style={filenameFormat}>
      {/* <div>FILENAME:</div> */}
      {`${company}_${duration}_${description}_${countryCode}${fsValue}_${eORl}-${product}`}
    </div>
  );
}
export default Filename;
