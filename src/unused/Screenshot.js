import React, { useRef, useState } from "react";
import { useScreenshot } from "use-screenshot-hook";

function Screenshot() {
  const imageRef = useRef(null);
  const { image, takeScreenshot } = useScreenshot({ ref: imageRef });
  return (
    <div ref={imageRef}>
      <h1>Hello World!</h1>
      <button onClick={() => takeScreenshot()}>screenshot</button>
      {image && <img src={image} />}
    </div>
  );
}

export default Screenshot;
