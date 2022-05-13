import React, { useEffect, useState } from "react";




function Template_Creator(props) {

    const filename = props.filename;
    const isElevator = props.isElevator;
    const productIndex = props.productIndex;

    const mediaExtension = props.mediaExtension;

    const videoOrImage = mediaExtension === 'mp4' ? 'video' : 'image'
    //"advertising/${fFilename}_e${videoOrImage}.${mediaExtension}"
    const mediaManifestEntry = { isElevator } ? `"advertising/${filename}_e${videoOrImage}.${mediaExtension}"` : `"advertising/${filename}_l${videoOrImage}.${mediaExtension}" ,"advertising/${filename}_p${videoOrImage}.${mediaExtension}"`

    function deliverTemplateFiles(e, val) {
        props.deliverTemplateFiles(productArray[productIndex](), E_MANIFEST, mediaExtension)
    }


    function E_BINT_IMAGE(fFilename, fMediaExtension) {
        return (
            `<!DOCTYPE html>
        <html>
        
        <head>
        
        <body class="adbodystyle">
            <div class="ad-sponsor ${fFilename}" data-widget-id="${fFilename}" data-version="0.1.5">
                <style>
                    /* this is the size of the entire ad, defaults to landscape lfd*/
                    .${fFilename} {
                        position: absolute;
                        top: 0%;
                        left: 0%;
                        z-index: 14;
                        width: 100%;
                        height: 100%;
                        animation-fill-mode: both;
                    }
        
                    .${fFilename} .background {
                        position: absolute;
                        top: 0%;
                        left: 0%;
                        z-index: 1;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,158,219,0.9);
                    }
                    
                    .${fFilename} .media_frame1 {
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
                    
                    .${fFilename} .media {
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
                <div id="bint_background" class='${fFilename} background'>
                </div>
                
                <div id="mediaframe_1" class='${fFilename} media_frame1'>
                
                   <img class='media' src="/advertising/${fFilename}_eimage.${fMediaExtension}">
                
                </div>
        
            <script>
        
                common.methods.registerAdScript('${fFilename}',
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
    }


    function E_BINT_VIDEO(fFilename, fMediaExtension) {
        return (`e bint video ${fFilename}`)
    }

    function E_FSA_IMAGE(fFilename, fMediaExtension) {
        return (`<!DOCTYPE html>
        <html>
        <head>
        <body class="adbodystyle">
            <div class="ad-sponsor ${fFilename}" data-widget-id="${fFilename}" data-version="0.1.5">
                <style>
                    /* this is the size of the entire ad, defaults to landscape lfd*/
                    .${fFilename} {
                        position: absolute;
                        top: 0%;
                        left: 0%;
                        z-index: 14;
                        width: 100%;
                        height: 100%;
                    }
                    
                    .${fFilename} .media_frame1 {
                        position: absolute;
                        font-size: 7vw;
                        color: red;
                        top: 0%;
                        left: 0%;
                        z-index: 14;
                        width: 100%;
                        height: 100%;
                    }
                    .${fFilename} .media {
                        position: absolute;
                        width: 100%;
                    }
                    
                    .edu700 .${fFilename} .media {
                        position: absolute;
                        width: 640px;
                        height: 480px;
                    }
                </style>
        
                <div class='media_frame1'>
                   <img id="media_image_e" class="media" src="/advertising/${fFilename}_eimage.${fMediaExtension}">
                </div>
            <script>
        
                common.methods.registerAdScript("${fFilename}",
                    class extends baseAdTemplate {
                        constructor(parentElement) {
                            super(parentElement);
                        }
                    });
            </script>
            </div>
        </body>
        </html>`)
    }

    function E_HFSP_IMAGE(fFilename, fMediaExtension) {
        return (
            `<!DOCTYPE html>
    <html>
    <head>
    <body class="adbodystyle">
        <div class="ad-sponsor ${fFilename}" data-widget-id="${fFilename}" data-version="0.1.5">
            <style>
                /* this is the size of the entire ad, defaults to landscape lfd*/
                .${fFilename} {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                }
                
                .${fFilename} .media_frame1 {
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
                
                .${fFilename} .media{
                    width: 96.5%;
                    height: auto;
                    box-shadow:	0vw 0vw 2vw rgba(0,0,0,.4);
                }
            </style>
    
            <div id="mediaframe_1" class='${fFilename} media_frame1'>
                <img class='media' src ="/advertising/${fFilename}_eimage.${fMediaExtension}">
            </div>
        <script>
            common.methods.registerAdScript("${fFilename}",
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
            }
    function E_HFSP_VIDEO(fFilename, fMediaExtension) {
        return (`e hfsp video ${fFilename}`)}
        
    function E_VSA_IMAGE(fFilename, fMediaExtension) {
        return (`e vsa image ${fFilename}`)}

    function E_VSA_VIDEO(fFilename, fMediaExtension) {
        return (`<!DOCTYPE html>
    <html>
    <head>
    <body class="adbodystyle">
        <div class="ad-sponsor ${fFilename}" data-widget-id="${fFilename}" data-version="0.1.5">
            <style>
                /* this is the size of the entire ad, defaults to landscape lfd*/
                .${fFilename} {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                }
                .${fFilename} .media_frame1 {
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
                
                .${fFilename} .media {
                    width: auto;
                    height: 93%;
                    width: 86.9%;
                    box-shadow:	0vw 0vw 2vw rgba(0,0,0,.4);
                }
                .edu750 .${fFilename} .media_frame1 {
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
            <div class='${fFilename} media_frame1'>
               <video id="media_video_e" class="media" muted src="/advertising/${fFilename}.${fMediaExtension}" type="video/mp4"></video>
            </div>
    
        <script>
            common.methods.registerAdScript("${fFilename}",
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
    </html>`)}
    
    function E_FSBI_IMAGE(fFilename, fMediaExtension) {
        return (`<!DOCTYPE html>
    <html>
    <head>
    <body class="adbodystyle">
        <div class="ad-sponsor ${fFilename}" data-widget-id="${fFilename}" data-version="0.1.5">
            <style>
                /* this is the size of the entire ad, defaults to landscape lfd*/
                .${fFilename} {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                }
    
                .${fFilename} .media_frame1 {
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
    
                .${fFilename} .media {
                    position: absolute;
                    font-size: 7vw;
                    color: red;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                }
                .${fFilename} .sponsor_logo_e {
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
                <img class='media' src="/advertising/${fFilename}_eimage.${fMediaExtension}">
            </div>
    
            <div id="sponsor_logo_e" class="sponsor_logo_e">
                <img style='max-height:7.5vh' src="/advertising/${fFilename}.svg">
            </div>
            <script>
    
                common.methods.registerAdScript("${fFilename}",
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
    }
    function E_FSBI_VIDEO(fFilename, fMediaExtension) {
        return (`e fsbi video ${fFilename}`)}
    
    function E_FSA_VIDEO(fFilename, fMediaExtension) {
    return (`<!DOCTYPE html>
    <html>
    
    <head>
    
    <body class="adbodystyle">
        <div class="ad-sponsor ${fFilename}" data-widget-id="${fFilename}" data-version="0.1.5">
            <style>
                /* this is the size of the entire ad, defaults to landscape lfd*/
                .${fFilename} {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                }
                
                .${fFilename} .media_frame1 {
                    position: absolute;
                    font-size: 7vw;
                    color: red;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    width: 100%;
                    height: 100%;
                }
                .${fFilename} .media {
                    position: absolute;
                    width: 100%;
                }
                .edu700 .${fFilename} .media {
                    position: absolute;
                    width: 640px;
                    height: 480px;
                }
            </style>
    
            <div class='media_frame1'>
               <video id="media_video_e" class="media" muted src="/advertising/${fFilename}_evideo.${fMediaExtension}" type="video/mp4"></video>
            </div>
        <script>
    
            common.methods.registerAdScript("${fFilename}",
                class extends baseAdTemplate {
                    constructor(parentElement) {
                        super(parentElement);
                    }
                    
                    playContent() {
                    
                        var myThis = this;
                        let vid_e = this.element.querySelector('[data-slot-id="' + this._slot + '"] #media_video_e');
                        if (vid_e) {
                            vid_e.play();   
                        }
    
                    }
                });
        </script>
        </div>
    </body>
    
    </html>`)
    }
    function E_MANIFEST(fFilename, fMediaExtension) {
        return (`
        {
            "html": "advertising/${fFilename}.html",
            "fonts": [],
            "images": [${mediaManifestEntry}]
        }
        `
        )}
    
    function BLANK_HTML(fFilename, fMediaExtension) {
        return (`<!DOCTYPE html>
    <html>
    <head>
    <body class="adbodystyle">
        <div class="ad-sponsor ${fFilename}" data-widget-id="${fFilename}" data-version="0.1.5">
            <style>
                
                .${fFilename} {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    z-index: 14;
                    display:none;
                }
            </style>
        <script>
            common.methods.registerAdScript("${fFilename}",
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
    `)}
    
    const productArray = [E_BINT_IMAGE, E_BINT_VIDEO, E_FSA_IMAGE, E_FSA_VIDEO, E_HFSP_IMAGE, E_HFSP_VIDEO, E_VSA_IMAGE, E_VSA_VIDEO, E_FSBI_IMAGE, E_FSBI_VIDEO]


        return (
            <div>
                <button onClick={deliverTemplateFiles}>
                    Create Files
                </button>
            </div>
        )

    }

    export default Template_Creator
