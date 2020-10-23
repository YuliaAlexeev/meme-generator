'use strict';
var gElCanvas;
var gCtx;

function onInit(){
    renderImages();
    renderKeywords();
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
    if(getCurrentLineIdx() >= 0){
        var currentLine = getCurrentLine();
        drawText()
        document.querySelector('input[name=textType]').value = currentLine.txt;
    }
}

function drawText(){ 
    const currentLineIdx = getCurrentLineIdx();

    if(currentLineIdx >= 0){
        var lines = getMeme().lines;
        gCtx.lineWidth = '2';

        lines.forEach(line => {
            gCtx.font = `${line.size}px ${line.font}`;
            gCtx.fillStyle = line.color;
            gCtx.strokeStyle = line.strokeColor;
            gCtx.textAlign = line.align;
            if(line === getCurrentLine()){
                gCtx.shadowBlur = 20;
                gCtx.shadowColor = "Blue";
            }
            else{
                gCtx.shadowColor = "transparent";
            }
            
            gCtx.fillText(line.txt, line.x, line.y);
            gCtx.strokeText(line.txt, line.x, line.y);
        })
        
    }
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
    drawText();
    setNewLine(newText);
    drawImg();
}

function onDeleteLine(){
    deleteLine();
    drawImg();
}

function onSwichLine(){
    var lines = getMeme().lines;
    // var currentLine = getCurrentLine();
   

    if(gMeme.selectedLineIdx === -1){
        gMeme.selectedLineIdx = 0;
    }


    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);
   
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

function onFontSize(size){
    var currentLineSize = getCurrentLine().size + size;
    setFontSize(currentLineSize)
    drawImg();
}

function onFilterKeyword(keywordToSearch){
    var images = getImages();
    var htmlStr = '';
    var filteredImages = images.filter(img => img.keywords.includes(keywordToSearch));
    filteredImages.forEach(img => {
        htmlStr += `<img src="${img.url}" alt="" title="" onclick="onSelectedImg(${img.id})"/>`;
    });
    document.querySelector('.gallery').innerHTML = htmlStr;
}

function renderKeywords(){
    var keywords = getKeywords();
    var htmlStr = '';
    for (const keyword in keywords) {
        htmlStr += `<li><a href="#" onClick="onFilterKeyword('${keyword}')" style="font-size:${keywords[keyword]}px">${keyword}</a></li>`;
    }
    document.querySelector('.keywords-list').innerHTML = htmlStr;
}


function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    console.log('downloadCanvas',data);
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

