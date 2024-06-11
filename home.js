
let navToggle = document.getElementsByClassName('btn');
function sam(){
    let navMenu = document.querySelector('.onds');
    navMenu.classList.toggle("visible");
}

const fileinput=document.querySelector(".file-input");
const choose=document.querySelector(".choosefile");
const preview_img=document.querySelector(".imge");
const dis=document.querySelector(".container");
const filteropt=document.querySelectorAll(".filters button");
const filter_name=document.querySelector(".filterinfo .filtername");
const filtslider=document.querySelector(".slider input");
const filtvalue=document.querySelector(".filterinfo .value");
const rotateopts=document.querySelectorAll(".rotate button");
const resetbtn=document.querySelector(".controls .resetbutton");
const savbtn=document.querySelector(".row .save");

let brightness=100;
let saturation=100;
let grayscale=0;
let inversion=0;
let rotate=0;
let flipvertical=1;
let fliphorizontal=1;

const loadimage = ()=>{
    let file=fileinput.files[0];
    if(!file) return;
    preview_img.src=URL.createObjectURL(file);
    dis.classList.remove("disable");
}

const applyfilters = ()=>{
    preview_img.style.filter=`brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`;
    preview_img.style.transform=`rotate(${rotate}deg) scale(${fliphorizontal},${flipvertical})`;
}

fileinput.addEventListener("change",loadimage);
choose.addEventListener("click",() => fileinput.click());
filteropt.forEach(Option=>{
    Option.addEventListener("click",()=>{
        document.querySelector(".filters .active").classList.remove("active");
        Option.classList.add("active");
        filter_name.innerHTML=Option.innerText;
        if(Option.id==="Brightness"){
            filtslider.max=200;
           filtslider.value=brightness;
           filtvalue.innerText=filtslider.value;
        }else if(Option.id==="Saturation"){
            filtslider.max=200;
            filtslider.value=saturation;
           filtvalue.innerText=filtslider.value;
        }else if(Option.id==="Grayscale"){
            filtslider.max=100;
            filtslider.value=grayscale;
           filtvalue.innerText=filtslider.value;
        }else if(Option.id==="inversion"){
            filtslider.max=100;
            filtslider.value=inversion;
           filtvalue.innerText=filtslider.value;
        }
    })
})

const updatefilter = ()=>{
   filtvalue.innerText=filtslider.value;
   const selecfilter=document.querySelector(".filters .active");

   if(selecfilter.id==="Brightness"){
    brightness=filtslider.value;
   }else if(selecfilter.id==="Saturation"){
    saturation=filtslider.value;
   }else if(selecfilter.id==="Grayscale"){
    grayscale=filtslider.value;
   }else if(selecfilter.id==="inversion"){
    inversion=filtslider.value;
   }
   applyfilters();
}

const resetfilt =()=>{
         brightness=100;
        saturation=100;
         grayscale=0;
         inversion=0;
         rotate=0;
         flipvertical=1;
         fliphorizontal=1;
         filteropt[0].click();
         applyfilters();
}
rotateopts.forEach(options=>{
    options.addEventListener("click",()=>{
        if(options.id==="left"){
           rotate-=90;
          
        }else if(options.id==="right"){
            rotate+=90;
           
         }else if(options.id=="horizontal"){
           fliphorizontal= fliphorizontal==1?-1:1;

         }else if(options.id=="vertical"){
            flipvertical=flipvertical==1?-1:1;

         }
        
        applyfilters();
    })
})

const saveimg=()=>{
    const canvas=document.createElement("canvas");
    const ctx=canvas.getContext("2d");
    canvas.width=preview_img.naturalWidth;
    canvas.height=preview_img.naturalHeight;
    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`;
    ctx.translate(canvas.width/2,canvas.height/2);
    if(rotate!=0){
        ctx.rotate(rotate * Math.PI/180);
    }
    ctx.scale(fliphorizontal,flipvertical)
    ctx.drawImage(preview_img,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
    const link=document.createElement("a");
    link.download="Img.png";
    link.href=canvas.toDataURL();
    link.click();
}

filtslider.addEventListener("input",updatefilter);
resetbtn.addEventListener("click",resetfilt);
savbtn.addEventListener("click",saveimg);
