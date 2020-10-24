'use strict';
var gElCanvas;
var gCtx;

function onInit() {
    renderImages();
    renderKeywords();
    document.querySelector('.control').style.display = 'none';
    gElCanvas = document.querySelector('#meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    console.log('canvas properties:', gCtx);
}

function drawImg(toShowShadow = true) {
    var img = new Image();
    var memeIdx = getMeme().selectedImgId;
    var currentMemeUrl = getImageById(memeIdx).url;

    img.src = `./${currentMemeUrl}`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        renderText(toShowShadow);
    };
}

function renderText(toShowShadow = true) {
    if (getCurrentLineIdx() >= 0) {
        var currentLine = getCurrentLine();
        drawText(toShowShadow);
        document.querySelector('input[name=textType]').value = currentLine.txt;
    }
}

function drawText(toShowShadow = true) {
    const currentLineIdx = getCurrentLineIdx();
    if (currentLineIdx >= 0) {
        var lines = getMeme().lines;
        lines.forEach((line) => {
            gCtx.font = `${line.size}px ${line.font}`;
            gCtx.fillStyle = line.color;
            gCtx.strokeStyle = line.strokeColor;
            gCtx.textAlign = line.align;
            if (line === getCurrentLine() && toShowShadow) {
                gCtx.shadowBlur = 5;
                gCtx.shadowColor = '#a900ff';
            } else {
                gCtx.shadowColor = 'transparent';
            }
            
            gCtx.fillText(line.txt, line.x, line.y);
            gCtx.strokeText(line.txt, line.x, line.y);
        });
    }
}

function onTextColor() {
    var txtColor = document.querySelector('input[name="textColor"]').value;
    setTextColor(txtColor);
    drawImg();
}

function onStrokeColor() {
    var strkColor = document.querySelector('input[name="strokeColor"]').value;
    setStrokeColor(strkColor);
    drawImg();
}

function onTextType() {
    var text = document.querySelector('input[name=textType]').value;
    setMemeText(text);
    drawImg();
}

function onSelectedImg(imageId) {
    document.querySelector('.control').style.display = 'flex';
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.keywords').style.display = 'none';
    selectImg(imageId);
    drawImg();
}

function onAddNewLine() {
    var newText = 'New Line';
    document.querySelector('input[name=textType]').value = newText;
    setNewLine(newText);
    drawImg();
}

function onDeleteLine() {
    deleteLine();
    drawImg();
}

function onSwichLine() {
    var lines = getMeme().lines;
    const currentLineIdx = getCurrentLineIdx();

    if (currentLineIdx < lines.length - 1) {
        gMeme.selectedLineIdx += 1;
    } else {
        gMeme.selectedLineIdx = 0;
    }
    drawImg();
}

function renderImages() {
    var images = getImages();
    var htmlStr = '';

    images.forEach((img) => {
        htmlStr += `<img src="${img.url}" alt="" title="" onclick="onSelectedImg(${img.id})"/>`;
    });
    document.querySelector('.gallery').innerHTML = htmlStr;
}

function onTextAlign(alignText) {
    setTextAlign(alignText);
    drawImg();
}

function onFontFamily(fontStyle) {
    setFontFamily(fontStyle);
    drawImg();
}

function onFontSize(size) {
    var currentLineSize = getCurrentLine().size + size;
    setFontSize(currentLineSize);
    drawImg();
}

function onFilterKeyword(keywordToSearch) {
    setKeywordClickes(keywordToSearch);
    var images = getImages();
    var htmlStr = '';

    var filteredImages = images.filter((img) =>
        img.keywords.includes(keywordToSearch)
    );
    filteredImages.forEach((img) => {
        htmlStr += `<img src="${img.url}" alt="" title="" onclick="onSelectedImg(${img.id})"/>`;
    });
    document.querySelector('.gallery').innerHTML = htmlStr;
    renderKeywords()
}

function renderKeywords() {
    var keywords = getKeywords();
    var htmlStr = '';
    for (const keyword in keywords) {
        htmlStr += `<li><a href="#" onClick="onFilterKeyword('${keyword}')" style="font-size:${keywords[keyword]}px">${keyword}</a></li>`;
    }
    document.querySelector('.keywords-list').innerHTML = htmlStr;
}

function downloadCanvas(elLink) {
    drawImg(false)
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}
