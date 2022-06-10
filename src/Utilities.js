


export function getManifestFile(filename, isElevator, mediaExtension){
    
    const filenameString = filename ? filename.toString() : ""
    const videoOrImage = mediaExtension === 'mp4' ? "video" : "image";


    const svgManifestEntry = filenameString.includes("-fsbi") ? `advertising/${filename}.svg` : ""

    const mediaManifestEntry = isElevator ? `"advertising/${filename}_e${videoOrImage}.${mediaExtension}"` : `"advertising/${filename}_l${videoOrImage}.${mediaExtension}" ,"advertising/${filename}_p${videoOrImage}.${mediaExtension}"`

    return (`
    {
        "html": "advertising/${filename}.html",
        "fonts": [],
        "images": [${mediaManifestEntry} ${svgManifestEntry}]
    }
    `
)

}

export function getBlankHTML(blankFilename){
    return (`<!DOCTYPE html>
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
    `)

}



export function getBlankManifest(blankFilename) {

    return (`
{
    "html": "advertising/${blankFilename}.html",
    "fonts": [],
    "images": []
}
`
    )
}



