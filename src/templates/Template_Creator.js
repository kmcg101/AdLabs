import React, { useEffect } from "react";




function Template_Creator(props) {

    const filename = props.filename;
    const blankFilename = props.blankFilename;
    const isElevator = props.isElevator;

    const inputComplete = props.inputComplete;
    const elevatorFile = props.elevatorFile;
    const mediaExtension = props.mediaExtension;


    const productIndex = props.productIndex;

    const videoOrImage = mediaExtension === 'mp4' ? 'video' : 'image'
    const mediaManifestEntry = { isElevator } ? `"advertising/${filename}_e${videoOrImage}.${mediaExtension}"` : `"advertising/${filename}_l${videoOrImage}.${mediaExtension}" ,"advertising/${filename}_p${videoOrImage}.${mediaExtension}"`

    const filenameString = filename ? filename.toString() : ""
    const svgManifestEntry = filenameString.includes("-fsbi") ? `advertising/${filename}.svg` : ""

    const handleDownloadButtonPress = () => {
        props.handleDownloadButtonPress();
    }

    // pressing the button sets the filename
    function deliverTemplateFiles() {

        props.deliverTemplateFiles(productArray[productIndex], E_MANIFEST, mediaExtension, BLANK_HTML, BLANK_MANIFEST)
    }

    useEffect(() => {
        if (props.inputComplete) {
            deliverTemplateFiles();
        }
    }, [props.filename]);



    const E_BINT = (`<!DOCTYPE html>
        <html>
        
        <head>
        
        <body class="adbodystyle">
            <div class="ad-sponsor ${filename}" data-widget-id="${filename}" data-version="0.1.5">
                <style>
                    /* this is the size of the entire ad, defaults to landscape lfd*/
                    .${filename} {
                        position: absolute;
                        top: 0%;
                        left: 0%;
                        z-index: 14;
                        width: 100%;
                        height: 100%;
                        animation-fill-mode: both;
                    }
        
                    .${filename} .background {
                        position: absolute;
                        top: 0%;
                        left: 0%;
                        z-index: 1;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,158,219,0.9);
                    }
                    
                    .${filename} .media_frame1 {
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        font-size: 7vw;
                        color: red;
                        top: 0%;
                        right: 0%;
                        left:unset;
                        z-index: 1;
                        width: 23.6%;
                        height: 100%;
                    }
                    
                    .${filename} .media {
                        height: 96.2%;
                        width: auto;
                        box-shadow: 0 0 2vw rgba(0, 0, 0, .3);
        
                    }
                    
                @keyframes fadeOutScale {
                    0% {
                        opacity: 1;
                        transform: scale(1);
                    }
        
                    100% {
                        opacity: 0;
                        transform: scale(.80);
                    }
                }
                
                @keyframes fadeOut {
                    0% {
                        opacity: 1;
                    }
        
                    100% {
                        opacity: 0;
                    }
                }
                    
        
                    @keyframes fadeInScale {
                    0% {
                        opacity: 0;
                        transform: scale(.80);
                    }
        
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes infobarHide {
                    0% {
                        bottom:0%;
                    }
                    100% {
                        bottom:-6.65%;
                    }
                }
                @keyframes infobarShow {
                    0% {
                        bottom:-6.65%
                    }
                    100% {
                        bottom:0%;
                    }
                }
                    
                </style>
                <div id="bint_background" class='${filename} background'>
                </div>
                
                <div id="mediaframe_1" class='${filename} media_frame1'>
                
                   <img class='media' src="/advertising/${filename}_eimage.${mediaExtension}">
                
                </div>
        
            <script>
        
                common.methods.registerAdScript('${filename}',
                    class extends baseAdTemplate {
                        constructor(parentElement) {
                            super(parentElement);
                        }
                        
                        playContent() {
                        var slotduration = this.scheduleItem.slot.duration;
                        var transitionTime = slotduration * 1000 - 350;
                        
                        let mediaframe_1 = this.scheduleItem.template.element.querySelector('#mediaframe_1');
                        let mediaframe_2 = this.scheduleItem.template.element.querySelector('#mediaframe_2');
                        let bintbackground = this.scheduleItem.template.element.querySelector('#bint_background');
                        let infobar = this.scheduleItem.template.element.querySelector('#infobar_container');
                        
                        if(common.edu700Service.isEdu700()){
                            //do nothing
                        }else{
                            mediaframe_1.style.animationName = "fadeInScale";
                            mediaframe_1.style.animationDuration = ".25s";
                            
                            bintbackground.style.animationName = "fadeInSwipeContent";
                            bintbackground.style.animationDuration = ".2s";
                        }
                        
                        infobar.style.animationName = "infobarHide";
                        infobar.style.animationDuration = ".4s";
                        
                        setTimeout(function () {
                            
                            if(common.edu700Service.isEdu700()){
                                mediaframe_1.style.animationName = "fadeOut";
                                mediaframe_1.style.animationDuration = "0s";
                                bintbackground.style.animationDelay = "0s";
                                
                                bintbackground.style.animationName = "fadeOut";
                                bintbackground.style.animationDuration = "0s";
                                bintbackground.style.animationDelay = "0s";
                            }else{
                                mediaframe_1.style.animationName = "fadeOut";
                                mediaframe_1.style.animationDuration = ".3s";
                                bintbackground.style.animationDelay = ".25s";
                                
                                bintbackground.style.animationName = "fadeOut";
                                bintbackground.style.animationDuration = ".3s";
                                bintbackground.style.animationDelay = ".2s";
                            }
                            
                            infobar.style.animationName = "infobarShow";
                            infobar.style.animationDuration = ".3s";
        
                        }, transitionTime);
        
                        }
                    });
            </script>
            </div>
        </body>
        
        </html>`)

    const E_FSA = (`<!DOCTYPE html>
        <html>
        <head>
        <body class="adbodystyle">
            <div class="ad-sponsor ${filename}" data-widget-id="${filename}" data-version="0.1.5">
                <style>
                    /* this is the size of the entire ad, defaults to landscape lfd*/
                    .${filename} {
                        position: absolute;
                        top: 0%;
                        left: 0%;
                        z-index: 14;
                        width: 100%;
                        height: 100%;
                    }
                    
                    .${filename} .media_frame1 {
                        position: absolute;
                        font-size: 7vw;
                        color: red;
                        top: 0%;
                        left: 0%;
                        z-index: 14;
                        width: 100%;
                        height: 100%;
                    }
                    .${filename} .media {
                        position: absolute;
                        width: 100%;
                    }
                    
                    .edu700 .${filename} .media {
                        position: absolute;
                        width: 640px;
                        height: 480px;
                    }
                </style>
        
                <div class='media_frame1'>
                   <img id="media_image_e" class="media" src="/advertising/${filename}_eimage.${mediaExtension}">
                </div>
            <script>
        
                common.methods.registerAdScript("${filename}",
                    class extends baseAdTemplate {
                        constructor(parentElement) {
                            super(parentElement);
                        }
                    });
            </script>
            </div>
        </body>
        </html>`)

    
    const E_HFSP = (`<!DOCTYPE html>
    <html>
    <head>
    <body class="adbodystyle">
        <div class="ad-sponsor ${filename}" data-widget-id="${filename}" data-version="0.1.5">
            <style>
                /* this is the size of the entire ad, defaults to landscape lfd*/
                .${filename} {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                }
                
                .${filename} .media_frame1 {
                    position: absolute;
                    display:flex;
                    flex-direction: row;
                    font-size: 7vw;
                    color: red;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 60%;
                    justify-content: center;
                    animation-fill-mode: both;
                    align-items: center;
                }
                
                .${filename} .media{
                    width: 96.5%;
                    height: auto;
                    box-shadow:	0vw 0vw 2vw rgba(0,0,0,.4);
                }
            </style>
    
            <div id="mediaframe_1" class='${filename} media_frame1'>
                <img class='media' src ="/advertising/${filename}_eimage.${mediaExtension}">
            </div>
        <script>
            common.methods.registerAdScript("${filename}",
                class extends baseAdTemplate {
                    constructor(parentElement) {
                        super(parentElement);
                    }
                    playContent() {
                        let mediaframe_1 = this.scheduleItem.template.element.querySelector('#mediaframe_1');
                    }
                });
        </script>
        </div>
    </body>
    </html>`)
  

   
    const E_VSA = (`<!DOCTYPE html>
    <html>
    <head>
    <body class="adbodystyle">
        <div class="ad-sponsor ${filename}" data-widget-id="${filename}" data-version="0.1.5">
            <style>
                /* this is the size of the entire ad, defaults to landscape lfd*/
                .${filename} {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                }
                .${filename} .media_frame1 {
                    position: absolute;
                    font-size: 7vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: red;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 42%;
                    height: 93%;
                }
                
                .${filename} .media {
                    width: auto;
                    height: 93%;
                    width: 86.9%;
                    box-shadow:	0vw 0vw 2vw rgba(0,0,0,.4);
                }
                .edu750 .${filename} .media_frame1 {
                    position: absolute;
                    font-size: 7vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: red;
                    top: 15px;
                    left: 15px;
                    z-index: 14;
                    width: 270px;
                    height: 480px;
                }
                
            </style>
            <div class='${filename} media_frame1'>
               <video id="media_video_e" class="media" muted src="/advertising/${filename}.${mediaExtension}" type="video/mp4"></video>
            </div>
    
        <script>
            common.methods.registerAdScript("${filename}",
                class extends baseAdTemplate {
                    constructor(parentElement) {
                        super(parentElement);
                    }
                    playContent() {
                    
                        let vid_e = this.element.querySelector('[data-slot-id="' + this._slot + '"] #media_video_e');
                        var myThis = this;
                        if (vid_e) {
                            vid_e.play();   
                        }
                    }
                });
        </script>
        </div>
    </body>
    </html>`)

    const E_FSBI = (`<!DOCTYPE html>
    <html>
    <head>
    <body class="adbodystyle">
        <div class="ad-sponsor ${filename}" data-widget-id="${filename}" data-version="0.1.5">
            <style>
                /* this is the size of the entire ad, defaults to landscape lfd*/
                .${filename} {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                }
    
                .${filename} .media_frame1 {
                    position: absolute;
                    font-size: 7vw;
                    color: red;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                    animation-fill-mode: both;
                }
    
                .${filename} .media {
                    position: absolute;
                    font-size: 7vw;
                    color: red;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                }
                .${filename} .sponsor_logo_e {
                    display: none;
                }
                @keyframes fadeOutScale {
                    0% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(.80);
                    }
                }
                @keyframes fadeInScale {
                    0% {
                        opacity: 0;
                        transform: scale(.80);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
                @keyframes fadeOut {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
                @keyframes slideOut {
                    0% {
                        top: 0%;
                    }
                    100% {
                        top: -100%;
                    }
                }
            </style>
    
            <div id="mediaframe_1" class='media_frame1'>
                <img class='media' src="/advertising/${filename}_eimage.${mediaExtension}">
            </div>
    
            <div id="sponsor_logo_e" class="sponsor_logo_e">
                <img style='max-height:7.5vh' src="/advertising/${filename}.svg">
            </div>
            <script>
    
                common.methods.registerAdScript("${filename}",
                    class extends baseAdTemplate {
                        constructor(parentElement) {
                            super(parentElement);
                        }
    
                        playContent() {
    
                            var slotduration = this.scheduleItem.slot.duration;
                            var transitionTime = (slotduration * 1000) * (1 / 3);
    
                            let logo = this.scheduleItem.template.element.querySelector('#primary_logo');
                            let logo_container = this.scheduleItem.template.element.querySelector('#primary_logo_container');
    
                            let logo_sponsor_e = this.scheduleItem.template.element.querySelector('#sponsor_logo_e');
    
                            let mediaframe_1 = this.scheduleItem.template.element.querySelector('#mediaframe_1');
    
                            logo_container.innerHTML = logo_sponsor_e.innerHTML;
    
                            if (common.edu700Service.isEdu700()) {
                                //no trans
                            } else {
                                mediaframe_1.style.animationName = "fadeInScale";
                                mediaframe_1.style.animationDuration = ".25s";
                            }
    
                            setTimeout(function () {
    
                                if (common.edu700Service.isEdu700()) {
                                    mediaframe_1.style.animationName = "slideOut";
                                    mediaframe_1.style.animationDuration = "1s";
                                } else {
                                    mediaframe_1.style.animationName = "fadeOut";
                                    mediaframe_1.style.animationDuration = ".33s";
                                }
    
                            }, transitionTime);
    
                        }
                    });
            </script>
        </div>
    </body>
    </html>`)
   



    const E_FSA_VIDEO = (`
               <video id="media_video_e" class="media" muted src="/advertising/${filename}_evideo.${mediaExtension}" type="video/mp4"></video>
                    playContent() {
                        var myThis = this;
                        let vid_e = this.element.querySelector('[data-slot-id="' + this._slot + '"] #media_video_e');
                        if (vid_e) {
                            vid_e.play();   
                        }
                    }`)

    const E_MANIFEST = (`
        {
            "html": "advertising/${filename}.html",
            "fonts": [],
            "images": [${mediaManifestEntry} ${svgManifestEntry}]
        }
        `
    )
    const BLANK_HTML = (`<!DOCTYPE html>
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
    const BLANK_MANIFEST = (`
        {
            "html": "advertising/${blankFilename}.html",
            "fonts": [],
            "images": []
        }
        `
    )

    const productArray = [E_BINT, E_FSA, E_HFSP, E_VSA, E_FSBI]


    return (
        <div>
            <button
                disabled={!inputComplete}
                disabledx={!inputComplete || Object.keys(elevatorFile).length === 0} onClick={handleDownloadButtonPress}>
                Create Files
            </button>
        </div>
    )

}

export default Template_Creator
