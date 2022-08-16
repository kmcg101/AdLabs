export function getHTMLFile(filename, isElevator, mediaExtensions, productIndex, bintBGColor) {
  //   const eORl = isElevator ? "e" : "l";
  const imageTagE = `<img id="media_image_e" class="media" src="/advertising/${filename}_eimage.${mediaExtensions.elevator}"></img>`;
  const imageTagL = `<img id="media_image_l" class="media" src="/advertising/${filename}_limage.${mediaExtensions.landscape}"></img>`;
  const imageTagP = `<img id="media_image_p" class="media" src="/advertising/${filename}_pimage.${mediaExtensions.portrait}"></img>`;

  const videoTagE = `<video id="media_video_e" class="media" muted src="/advertising/${filename}_evideo.${mediaExtensions.elevator}" type="video/mp4"></video>`;
  const videoTagL = `<video id="media_video_l" class="media" muted src="/advertising/${filename}_lvideo.${mediaExtensions.landscape}" type="video/mp4"></video>`;
  const videoTagP = `<video id="media_video_p" class="media" muted src="/advertising/${filename}_pvideo.${mediaExtensions.portrait}" type="video/mp4"></video>`;

  const playContentVideoE = `var myThis = this;
        let vid = this.element.querySelector('[data-slot-id="' + this._slot + '"] #media_video_e');
        if (vid) {
            vid.play();   
        }`;
  const playContentVideoL = `
            let vid_l = this.element.querySelector('[data-slot-id="' + this._slot + '"] #media_video_l');
            let vid_p = this.element.querySelector('[data-slot-id="' + this._slot + '"] #media_video_p');
            var myThis = this;
            
            if (common.displayService && common.displayService.isPortrait()) {
            
                if (vid_p) {
                    vid_p.play();
                }
            }else{
            
                if (vid_l) {
                    vid_l.play();   
                }
            }
        `;
  const E_BINT = `<!DOCTYPE html>
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
                    background: #${bintBGColor};
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
               ${imageTagE}
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
    
    </html>`;

  const E_FSA = `<!DOCTYPE html>
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
               ${mediaExtensions.elevator === "mp4" ? videoTagE : imageTagE}
            </div>
        <script>
    
            common.methods.registerAdScript("${filename}",
                class extends baseAdTemplate {
                    constructor(parentElement) {
                        super(parentElement);
                    }
                    playContent() {
                        ${mediaExtensions.elevator === "mp4" ? playContentVideoE : ""}
                    }
                });
        </script>
        </div>
    </body>
    </html>`;

  const E_HFSP = `<!DOCTYPE html>
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
            <img class='media' src ="/advertising/${filename}_eimage.${mediaExtensions.elevator}">
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
</html>`;

  const E_VSA = `<!DOCTYPE html>
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
           ${videoTagE}
        </div>

    <script>
        common.methods.registerAdScript("${filename}",
            class extends baseAdTemplate {
                constructor(parentElement) {
                    super(parentElement);
                }
                playContent() {
                
                   ${playContentVideoE}
                }
            });
    </script>
    </div>
</body>
</html>`;

  const E_FSBI = `<!DOCTYPE html>
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
            ${imageTagE}
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
</html>`;

  const L_BINT = `<!DOCTYPE html>
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
				background: #${bintBGColor};
				
            }
			
			.${filename} .media_frame1 {
                position: absolute;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 6vw;
				color: red;
                top: 0%;
                right: 0%;
				left: unset;
                z-index: 14;
				width: 18.4%;
                height: 94.5%;
				animation-fill-mode: both;
            }
			
			.${filename} .media_frame2 {
                position: absolute;
				display: none;
            }
			
			.${filename} .media {
                height: 93.2%;
				width: auto;
				box-shadow: 0 0 2vw rgba(0, 0, 0, .3);
            }
			
			.portrait .${filename} .media_frame2 {
                position: absolute;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				font-size: 6vw;
				color: red;
                top: 0%;
                left: 0%;
                z-index: 14;
				width: 100%;
                height: 20%;
				animation-fill-mode: both;
            }
			
			.portrait .${filename} .media_frame1 {
                position: absolute;
				display: none;
            }
			
			.portrait .${filename} .media {
                height: auto;
				width: 93.2%;
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
		
		    
			@keyframes fadeInSwipeContent {
            0% {
                opacity: 0;
                clip-path: polygon(0% 100%, 100% 100%, 0 100%, 0 0, 0% 100%);
            }

            50% {
                clip-path: polygon(100% 100%, 100% 100%, 0 100%, 0 0, 0% 0%);
            }

            100% {
                opacity: 1;
                clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0, 100% 0);
            }
        }

			
        </style>

				
		<div id="bint_background" class='${filename} background'>
		</div>
        
			<div id="mediaframe_1" class='${filename} media_frame1'>
			
               ${imageTagL}
			
			</div>
			
			<div id="mediaframe_2" class='${filename} media_frame2'>
			   
                ${imageTagP}
			   
			</div>

    <script>

        common.methods.registerAdScript("${filename}",
            class extends baseAdTemplate {
                constructor(parentElement) {
                    super(parentElement);
                }
				
                playContent() {
				
				let mediaframe_1 = this.scheduleItem.template.element.querySelector('#mediaframe_1');
				let mediaframe_2 = this.scheduleItem.template.element.querySelector('#mediaframe_2');
				let bintbackground = this.scheduleItem.template.element.querySelector('#bint_background');
				
				mediaframe_1.style.animationName = "fadeInScale";
                mediaframe_1.style.animationDuration = ".25s";
							
				mediaframe_2.style.animationName = "fadeInScale";
                mediaframe_2.style.animationDuration = ".25s";
				
				bintbackground.style.animationName = "fadeInSwipeContent";
                bintbackground.style.animationDuration = ".2s";
				
				setTimeout(function () {
					
					mediaframe_1.style.animationName = "fadeOut";
					mediaframe_1.style.animationDuration = ".3s";
					
					mediaframe_2.style.animationName = "fadeOut";
					mediaframe_2.style.animationDuration = ".3s";
					
					bintbackground.style.animationName = "fadeOut";
					bintbackground.style.animationDuration = ".3s";

                }, 14650);

                }
            });
    </script>
    </div>
</body>

</html>`;

  const L_FSA = `<!DOCTYPE html>
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
				overflow: hidden;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 7vw;
				color: red;
                top: 0%;
                left: 20%;
                z-index: 14;
				width: 80%;
                height: 94.4%;
				background-color: #2c3030;
            }
			
			.${filename} .media {
				width: 100%;
				box-shadow:	0vw 0vw 2vw rgba(0,0,0,.4);
            }
			
			.${filename} .media_frame2 {
                position: absolute;
				display: none;
            }
			
			.portrait .${filename} .media_frame2 {
                position: absolute;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 7vw;
				color: red;
                top: 0%;
                left: 0%;
                z-index: 14;
				width: 100%;
                height: 75%;
				background-color: #2c3030;
            }
			
			.portrait .${filename} .media_frame1 {
                position: absolute;
				display: none;
            }
			
			.portrait .${filename} .media {
				height: 100%;
				box-shadow:	0vw 0vw 2vw rgba(0,0,0,.4);
            }
        </style>
		<div class='${filename} media_frame1'>
            ${mediaExtensions.landscape === "mp4" ? videoTagL : imageTagL}
        </div>
		
		<div class='${filename} media_frame2'>
            ${mediaExtensions.portrait === "mp4" ? videoTagP : imageTagP}
        </div>

    <script>

        common.methods.registerAdScript("${filename}",
            class extends baseAdTemplate {
                constructor(parentElement) {
                    super(parentElement);
                }
				
                playContent() {
                    ${mediaExtensions.landscape === "mp4" ? playContentVideoL : ""}
                }
            });
    </script>
    </div>
</body>
</html>
`;

  const L_HFSP = `<!DOCTYPE html>
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
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 7vw;
				color: red;
                top: 3.1%;
                left: 20%;
                z-index: 14;
				width: 80%;
                height: 60.2%;
            }
			
			.${filename} .media_frame2 {
                position: absolute;
				display: none;
            }
			
			.${filename} .media{
                width: 96%;
				height: auto;
				box-shadow:	0vw 0vw 2vw rgba(0,0,0,.4);
            }
			
			.portrait .${filename} .media_frame2 {
                position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 7vw;
				color: red;
                top: 1.9%;
                left: 0%;
                z-index: 14;
				width: 100%;
                height: 47.7%;
            }
			
			.portrait .${filename} .media_frame1 {
                position: absolute;
				display: none;
			}
			
			.portrait .${filename} .media{
                height: 100%;
				width: auto;
				box-shadow:	0vw 0vw 2vw rgba(0,0,0,.4);
            }
			
        </style>
		
		
        <div class='${filename} media_frame1'>
            ${imageTagL}
        </div>
		
		<div class='${filename} media_frame2'>
            ${imageTagP}
        </div>

   


    <script>

        common.methods.registerAdScript("${filename}",
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
  const L_VSA = `
    <!DOCTYPE html>
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
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 7vw;
				color: red;
                top: 0%;
                left: 20%;
                z-index: 14;
				width: 33.3%;
                height: 94.5%;
            }
			
			.${filename} .media {
                height: 94%;
				width: auto;
            }
			
			.${filename} .media_frame2 {
                position: absolute;
				display: none;
            }
			
			.portrait .${filename} .media_frame2 {
                position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 7vw;
				color: red;
                top: 1.9%;
                left: 0%;
                z-index: 14;
				width: 62%;
                height: 50%;
            }
			
			.portrait .${filename} .media_frame1 {
                position: absolute;
				display: none;
            }
			
			.portrait .${filename} .media {
                height: 100%;
				width: auto;
            }

			
        </style>

        <div class='${filename} media_frame1'>
			${videoTagL}
        </div>
		
		
		<div class='${filename} media_frame2'>
		
            ${videoTagP}
		   
        </div>
    <script>

        common.methods.registerAdScript("${filename}",
            class extends baseAdTemplate {
                constructor(parentElement) {
                    super(parentElement);
                }
				
                playContent() {
				    let vid_l = this.element.querySelector('[data-slot-id="' + this._slot + '"] #media_video_l');
					let vid_p = this.element.querySelector('[data-slot-id="' + this._slot + '"] #media_video_p');
				    var myThis = this;
					
					if (common.displayService && common.displayService.isPortrait()) {
					
						if (vid_p) {
							vid_p.play();
						}
						
					}else{
					
					    if (vid_l) {
							vid_l.play();   
						}
					}
                }
            });
    </script>
    </div>
</body>

</html>
`;
  const L_FSBI = `<!DOCTYPE html>
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
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 7vw;
				color: red;
                top: 0%;
                left: 20%;
                z-index: 14;
				width: 80%;
                height: 94.375%;
				animation-fill-mode: both;
            }
			
			.${filename} .media_frame2 {
                position: absolute;
				display: none;
				animation-fill-mode: both;
            }
			
			.${filename} .media {
				width: 100%;
                height: auto;
            }
			
			.${filename} .sponsor_logo_l {
				display: none;
            }
			
			.${filename} .sponsor_logo_p {
				display: none;
            }
			
			.portrait .${filename} .media_frame2 {
                position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 7vw;
				color: red;
                top: 0%;
                left: 0%;
                z-index: 14;
				width: 100%;
                height: 75%;
				animation-fill-mode: both;
            }
			
			.portrait .${filename} .media_frame1 {
                position: absolute;
				display: none;
				animation-fill-mode: both;
            }
			
			.portrait .${filename} .media {
				width: auto;
                height: 100%;
            }
			
			.portrait .${filename} .sponsor_logo_l {
				display: none;
            }
			
			.portrait .${filename} .sponsor_logo_p {
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
			
        </style>
        <div id="mediaframe_1" class='media_frame1'>
		
           ${imageTagL}
		   
        </div>
		
		<div id="mediaframe_2" class='media_frame2'>
		
            ${imageTagP}
		  
        </div>
		
		<div id="sponsor_logo_l" class="sponsor_logo_l">
			<img style='max-height:9vh' src="/advertising/${filename}.svg">
		</div>
		
		<div id="sponsor_logo_p" class="sponsor_logo_p">
			<img style='position: relative; max-height:5vh; left:22%' src="/advertising/${filename}.svg">
		</div>

    <script>

        common.methods.registerAdScript("${filename}",
            class extends baseAdTemplate {
                constructor(parentElement) {
                    super(parentElement);
                }
				
                playContent() {

                var slotduration = this.scheduleItem.slot.duration;
                var transitionTime = (slotduration * 1000) * (1/3);
				
				console.log("new versiion you snarl");
				
				let logo = this.scheduleItem.template.element.querySelector('#primary_logo');
				let logo_container = this.scheduleItem.template.element.querySelector('#primary_logo_container');
                //let logo_container = this.scheduleItem.template.element.querySelector('#building_logo');
				
				let logo_sponsor_l = this.scheduleItem.template.element.querySelector('#sponsor_logo_l');
				let logo_sponsor_p = this.scheduleItem.template.element.querySelector('#sponsor_logo_p');
				
				let mediaframe_1 = this.scheduleItem.template.element.querySelector('#mediaframe_1');
				let mediaframe_2 = this.scheduleItem.template.element.querySelector('#mediaframe_2');
			
				
				if (common.displayService && common.displayService.isPortrait()){
					console.log("portrait you snitch");
					logo_container.innerHTML = logo_sponsor_p.innerHTML;
				}else{
					console.log("lands you snitch");
					logo_container.innerHTML = logo_sponsor_l.innerHTML;
				}
				
				mediaframe_1.style.animationName = "fadeInScale";
                mediaframe_1.style.animationDuration = ".25s";
							
				mediaframe_2.style.animationName = "fadeInScale";
                mediaframe_2.style.animationDuration = ".25s";
				
				
				setTimeout(function () {
				
							console.log(mediaframe_1);
							console.log(mediaframe_2);
							
                            mediaframe_1.style.animationName = "fadeOutScale";
                            mediaframe_1.style.animationDuration = ".33s";
							
							mediaframe_2.style.animationName = "fadeOutScale";
                            mediaframe_2.style.animationDuration = ".33s";

                }, transitionTime);

                }
            });
    </script>
    </div>
</body>

</html>
`;

  const productArrayE = [E_BINT, E_FSA, E_HFSP, E_VSA, E_FSBI];
  const productArrayL = [L_BINT, L_FSA, L_HFSP, L_VSA, L_FSBI];

  const currentArray = isElevator ? productArrayE : productArrayL;

  let returnValue = currentArray[productIndex];

  return returnValue;
}
