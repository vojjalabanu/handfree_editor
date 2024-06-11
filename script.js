let navToggle = document.getElementsByClassName('btn');
function sam(){
    let navMenu = document.querySelector('.onds');
    navMenu.classList.toggle("visible");
}
const signin=document.querySelector(".signin");
const signup=document.querySelector(".signup");
const clickme=document.querySelector(".clickhere");
const log=document.querySelector(".start");

function login(){
    signin.classList.remove("disable");
    log.classList.add("disable");
}
function change(){
     signin.classList.add("disable");
     signup.classList.remove("disable")
}
function wrong1(){
    signin.classList.add("disable");
    log.classList.remove("disable");
}
function wrong2(){
    signup.classList.add("disable");
    log.classList.remove("disable");
}
