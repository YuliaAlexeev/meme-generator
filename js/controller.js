'use strict';
var gElCanvas;
var gCtx;

function onInit(){
    renderImages();
    gElCanvas = document.querySelector('#meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    console.log('canvas properties:', gCtx);
}

function drawImg() {
    var img = new Image()
    var memeIdx = getMeme().selectedImgId;
    var currentMemeUrl = getImageById(memeIdx).url;
    
    img.src = `./${currentMemeUrl}`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()
    }
}

function renderText(){
    var currentMeme = getMeme();
    currentMeme
    var currentLine = getCurrentLine();
    drawText(currentLine.txt, currentLine.x, currentLine.y)
    document.querySelector('input[name=textType]').value = currentLine.txt;
}

function drawText(text, x, y){ 


    // var currentLine = getCurrentLine();
    var lines = getMeme().lines;

    gCtx.lineWidth = '2';
    lines.forEach(line => {
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillStyle = line.color;
        gCtx.strokeStyle = line.strokeColor;
        gCtx.textAlign = line.align;
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);
    })
    
    // gCtx.lineWidth = '2';
    // gCtx.font = `${currentLine.size}px ${currentLine.font}`;
    // gCtx.fillStyle = currentLine.color;
    // gCtx.strokeStyle = currentLine.strokeColor;
    // gCtx.textAlign = currentLine.align;
    // gCtx.fillText(text, x, y);
    // gCtx.strokeText(text, x, y);
}

function onTextColor(){
    var txtColor = document.querySelector('input[name="textColor"]').value;
    setTextColor(txtColor);
    drawImg();
}

function onStrokeColor(){
    var strkColor = document.querySelector('input[name="strokeColor"]').value;
    setStrokeColor(strkColor);
    drawImg();
}

function onTextType(){
    var text = document.querySelector('input[name=textType]').value;
    setMemeText(text);
    drawImg();
}

function onSelectedImg(imageId){
    selectImg(imageId)
    drawImg();
}

function onAddNewLine(){

    var newText = 'New Line';
    document.querySelector('input[name=textType]').value = newText;
 
    drawText(newText, gElCanvas.width/2, gElCanvas.height/2);
    console.log('newText', newText);
    setNewLine(newText);
    drawImg();
   
}

function renderImages(){
    var images = getImages();
    var htmlStr = '';

    images.forEach(img => {
        htmlStr += `<img src="${img.url}" alt="" title="" onclick="onSelectedImg(${img.id})"/>`;
    });
    document.querySelector('.gallery').innerHTML = htmlStr;
}

function onTextAlign(alignText){
    setTextAlign(alignText);
    drawImg();
}

function onFontFamily(fontStyle){
    console.log(fontStyle)
    setFontFamily(fontStyle);
    drawImg();
}

// function onFontSize(size){
//     var i = 1;
 
//     document.querySelector('.increase').innerText = i++;
// }


function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    console.log('downloadCanvas',data);
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}