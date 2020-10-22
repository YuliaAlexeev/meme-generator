'use strict';
var gElCanvas;
var gCtx;

function onInit(){
    renderImages();
    gElCanvas = document.querySelector('#meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    console.log('canvas properties:', gCtx)
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
    drawText(currentMeme.lines[0].txt, 50, 50)
}

function drawText(text, x, y){ 
    var currentMeme = getMeme(); 
    var selectedLineIdx = currentMeme.selectedLineIdx;
    
    gCtx.lineWidth = '2'
    gCtx.font = `${currentMeme.lines[selectedLineIdx].size}px ${currentMeme.lines[selectedLineIdx].font}`;
    gCtx.fillStyle = currentMeme.lines[selectedLineIdx].color;
    gCtx.strokeStyle = currentMeme.lines[selectedLineIdx].strokeColor;
    gCtx.textAlign = currentMeme.lines[selectedLineIdx].align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onTextColor(){
    var currentMeme = getMeme();
    var selectedLineIdx = currentMeme.selectedLineIdx;

    var txtColor = document.querySelector('input[name="textColor"]').value;
    currentMeme.lines[selectedLineIdx].color = txtColor;
    setTextColor(txtColor);
    drawImg();
}

function onStrokeColor(){
    var currentMeme = getMeme();
    var selectedLineIdx = currentMeme.selectedLineIdx;

    var strkColor = document.querySelector('input[name="strokeColor"]').value;
    currentMeme.lines[selectedLineIdx].strokeColor = strkColor;

    gStrokeColor = strkColor;
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
    setNewLine(newText);
}

function renderImages(){
    var images = getImages();
    var htmlStr = '';

    images.forEach(img => {
        htmlStr += `<img src="${img.url}" alt="" title="" onclick="onSelectedImg(${img.id})"/>`;
    });
    document.querySelector('.gallery').innerHTML = htmlStr;
}

function onTextAlign(align){
    console.log('align', align);
    if(align === 'right'){
        gAlign = 'right';
    } else if(align === 'left'){
        gAlign = 'left';
    }   else if(align === 'center'){
        gAlign = 'center';
    }
    setTextAlign(gAlign);
    drawImg();
}



function onFontFamily(fontStyle){
    if(fontStyle === 'Arial'){
        gFontStyle = 'Arial';
    } else if(fontStyle === 'Times New Roman'){
        gFontStyle = 'Times New Roman';
    } else if(fontStyle === 'Cursive'){
        gFontStyle = 'Cursive';
    }   else if(fontStyle === 'Monospace'){
        gFontStyle = 'Monospace';
    }   else if(fontStyle === 'Tahoma'){
        gFontStyle = 'Tahoma';
    }
    else{
        gFontStyle = 'Impact';
    }
    setFontFamily(gFontStyle);
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