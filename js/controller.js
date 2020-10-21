'use strict';
var gElCanvas;
var gCtx;

console.log('started');
function onInit(){
     gElCanvas = document.querySelector('#meme-canvas');
     gCtx = gElCanvas.getContext('2d');
     console.log('canvas properties:', gCtx)
     drawText(10, 10)
}

function onWrite(ev){
    console.log(ev);
}

function drawText(){
    gCtx.font = '30px Impact';
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = '#000';
    
    gCtx.textAlign = 'center';
    gCtx.fillText('Hello world', gElCanvas.width/2, gElCanvas.height/2);
}
