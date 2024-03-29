export const getFilename = (inputValues, isFS, product) => {
  console.log("inputValues = ", inputValues);
  const clientName = inputValues.client;
  const duration = inputValues.duration;
  const desc = inputValues.campaign;
  const countryCode = inputValues.countryCode;
  const eORl = inputValues.platform === "elevator" ? "e" : "l";
  const fsValue = isFS ? "_fs" : "";

  // try {
  //   setBlankFilename(
  //     `${clientName}_${duration}_${product}blank_${countryCode}${fsValue}_${eORl}-${product}`
  //   );
  // } catch {
  //   console.log("not yet");
  // }
  return `${clientName}_${duration}_${desc}_${countryCode}${fsValue}_${eORl}-${product}`;
};

export function getManifestFile(noBintImages, filename, isElevator, mediaExtensions) {
  const filenameString = filename ? filename.toString() : "";
  const videoOrImageE = mediaExtensions.elevator === "mp4" ? "video" : "image";
  const videoOrImageL = mediaExtensions.landscape === "mp4" ? "video" : "image";
  const videoOrImageP = mediaExtensions.portrait === "mp4" ? "video" : "image";

  const svgManifestEntry = filenameString.includes("-fsbi") ? `,"advertising/${filename}.svg"` : "";

  let mediaManifestEntry = "";
  if (!noBintImages) {
    mediaManifestEntry = isElevator ? `"advertising/${filename}_e${videoOrImageE}.${mediaExtensions.elevator}"` : `"advertising/${filename}_l${videoOrImageL}.${mediaExtensions.landscape}" ,"advertising/${filename}_p${videoOrImageP}.${mediaExtensions.portrait}"`;
  }

  return `
    {
        "html": "advertising/${filename}.html",
        "fonts": [],
        "images": [${mediaManifestEntry} ${svgManifestEntry}]
    }
    `;
}

export function getBlankHTML(blankFilename) {
  return `<!DOCTYPE html>
    <html>
    <head>
    <body class="adbodystyle">
        <div class="ad-sponsor ${blankFilename}" data-widget-id="${blankFilename}" data-version="0.1.5">
            <style>
                
                .${blankFilename} {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    display:none;
                }
            </style>
        <script>
            common.methods.registerAdScript("${blankFilename}",
                class extends baseAdTemplate {
                    constructor(parentElement) {
                        super(parentElement);
                    }
                    playContent() {
                    }
                });
        </script>
        </div>
    </body>
    </html>
    `;
}

export function getBlankManifest(blankFilename) {
  return `
{
    "html": "advertising/${blankFilename}.html",
    "fonts": [],
    "images": []
}
`;
}
