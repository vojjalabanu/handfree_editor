const sam=()=>{
    const btn=document.querySelector(".onds");
    btn.classList.toggle("visible");
}
const preview_img=document.querySelector(".imge");
const choose=document.querySelector(".choose");
const file_input=document.querySelector(".file-input");
const option=document.querySelectorAll(".option");
const save=document.querySelector(".save");

let bright=1;
let grayscale=0;
let blured=0;
let contrast=100;
let sepia=0;
option.forEach(opt=>{
    opt.addEventListener("click",()=>{
        document.querySelector(".active").classList.remove("active");
       
        opt.classList.add("active");
     if(opt.id=="b1"){
            grayscale=100;
            preview_img.style.filter=`grayscale(100%)`
             blured=0;
             contrast=100;
             sepia=0;
        }else if(opt.id=="b2"){
            blured=2;
            preview_img.style.filter=`blur(2px)`
            grayscale=0;
             contrast=100;
             sepia=0;
        }else if(opt.id=="b3"){
            contrast=150;
            preview_img.style.filter=`contrast(150%)`
            grayscale=0;
             blured=0;
             sepia=0;
        }else if(opt.id=="b4"){
            sepia=100;
            preview_img.style.filter=`sepia(100%)`;
            grayscale=0;
             blured=0;
             contrast=100;
        }else  if(opt.id=="b5"){
            preview_img.style.filter=`none`;
                grayscale=0;
                 blured=0;
                 contrast=100;
                 sepia=0;

        }
    })
})

const loadimage=()=>{
    let file=file_input.files[0];
    if(!file) return;
    preview_img.src=URL.createObjectURL(file);
    document.querySelector(".panelin").classList.remove("disable")
}

const saveimg=()=>{
    const canvas=document.createElement("canvas");
    const ctx=canvas.getContext("2d");
    canvas.width=preview_img.naturalWidth;
    canvas.height=preview_img.naturalHeight;
    ctx.filter=`grayscale(${grayscale}%) blur(${blured}px) contrast(${contrast}%) sepia(${sepia}%) brightness(${bright})`;
    ctx.drawImage(preview_img,0,0,canvas.width,canvas.height);
    let link=document.createElement("a");
    link.href=canvas.toDataURL();
    link.download="editedimg.jpg";
    link.click();
}
file_input.addEventListener("change",loadimage);
save.addEventListener("click",saveimg);
choose.addEventListener("click",()=>{file_input.click()});
        let recognition = null;

        function startRecognition() {
            if (recognition) {
                recognition.stop();
                recognition = null;
            }

            recognition = new webkitSpeechRecognition() || new SpeechRecognition();
            recognition.continuous = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                console.log('Speech recognition started');
                document.getElementById('startRecognition').textContent = 'Stop voice filtering';
                document.getElementById('startRecognition').classList.add("actived");
            };

            recognition.onend = () => {
                recognition.stop();
                console.log('Speech recognition stopped');
                document.getElementById('startRecognition').textContent = 'Start voice filtering';
                document.getElementById('startRecognition').classList.remove("actived");
            };

            recognition.onresult = (event) => {
                const result = event.results[event.results.length - 1][0].transcript.toLowerCase(); // Only the first word
                console.log('Recognized: ' + result);

                if (result.includes('brighten')) {
                    adjustBrightness(1.2);
                } else if (result.includes('darken')) {
                    adjustBrightness(0.8);
                }else if (result.includes('download')) {
                    saveimg();
                }else if(result.includes('black and white')){
                    preview_img.style.filter=`grayscale(100%)`;
                    grayscale=100;
                }
            };

            recognition.start();
        }

        function stopRecognition() {
            if (recognition) {
                recognition.stop();
                recognition = null;
                document.getElementById('startRecognition').textContent = 'Start Speech Recognition';
            }else{
                console.log('Recognition was not running.');
            }
        }

        function adjustBrightness(factor) {
            preview_img.style.filter=`brightness(${factor})`;
            bright=factor;
        }

        document.getElementById('startRecognition').addEventListener('click', () => {
            if (recognition && recognition.running) {
                stopRecognition();
            } else {
                startRecognition();
            }
        });
