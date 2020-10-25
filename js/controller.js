'use strict';
var gElCanvas;
var gCtx;
const gElMemeText = 'input[name="memeTxt"]';

function onInit() {
    renderImages();
    renderKeywords();
    document.querySelector('.editor').style.display = 'none';
    gElCanvas = document.querySelector('#meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    console.log('canvas properties:', gCtx);
}

function drawMeme(toShowShadow = true) {
    var img = new Image();
    var memeIdx = getMeme().selectedImgId;
    var currentMemeUrl = getImageById(memeIdx).url;

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        renderText(toShowShadow);
    };
    img.src = `./${currentMemeUrl}`;
}

function renderText(toShowShadow = true) {
    const currLine = getCurrentLine();
    if (currLine) {
        drawText(toShowShadow);
        document.querySelector(gElMemeText).value = currLine.txt;
    }
}

function drawText(toShowShadow = true) {
    const currLine = getCurrentLine();
    var lines = getMeme().lines;
    lines.forEach((line) => {
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillStyle = line.color;
        gCtx.strokeStyle = line.strokeColor;
        gCtx.textAlign = line.align;
        switch (line.align) {
            case 'center':
                line.x = gElCanvas.width / 2;
                break;
            case 'left':
                line.x = 10;
                break;
            case 'right':
                line.x = gElCanvas.width - 10;
                break;
        }
        if (line === currLine && toShowShadow) {
            gCtx.shadowBlur = 5;
            gCtx.shadowColor = '#a900ff';
        } else {
            gCtx.shadowColor = 'transparent';
        }
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);
    });
}

function onTextColor() {
    var txtColor = document.querySelector('input[name="textColor"]').value;
    setTextColor(txtColor);
    drawMeme();
}

function onStrokeColor() {
    var strkColor = document.querySelector('input[name="strokeColor"]').value;
    setStrokeColor(strkColor);
    drawMeme();
}

function onTextType() {
    var text = document.querySelector(gElMemeText).value;
    setMemeText(text);
    drawMeme();
}

function onSelectedImg(imageId) {
    document.querySelector('.editor').style.display = 'flex';
    document.querySelector('.gallery').style.display = 'none';
    selectImg(imageId);
    drawMeme();
}

function onAddNewLine() {
    var newText = 'New Line';
    document.querySelector(gElMemeText).value = newText;
    setNewLine(newText);
    drawMeme();
}

function onDeleteLine() {
    deleteLine();
    drawMeme();
}

function onSwichLine() {
    var lines = getMeme().lines;
    const currentLineIdx = getCurrentLineIdx();

    // Blong to SERVICE: moveLine(diff=1)
    if (currentLineIdx < lines.length - 1) {
        gMeme.selectedLineIdx += 1;
    } else {
        gMeme.selectedLineIdx = 0;
    }
    drawMeme();
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
    drawMeme();
}

function onFontFamily(fontStyle) {
    setFontFamily(fontStyle);
    drawMeme();
}

function onFontSize(size) {
    var currentLineSize = getCurrentLine().size + size;
    setFontSize(currentLineSize);
    drawMeme();
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
    renderKeywords();
}

function renderKeywords() {
    var keywords = getKeywords();
    var htmlStr = '';
    for (const keyword in keywords) {
        htmlStr += `<li><a href="#" onClick="onFilterKeyword('${keyword}')" style="font-size:${keywords[keyword]}px">${keyword}</a></li>`;
    }
    document.querySelector('.keywords-list').innerHTML = htmlStr;
}

function downloadCanvas() {
    drawMeme(false);
    setTimeout(() => {
        // debugger
        const data = gElCanvas.toDataURL();
        // setTimeout(() => {
            const elTempLink = document.createElement('a');
            elTempLink.hidden = true;
            elTempLink.href = data;
            elTempLink.download = 'my-meme.jpg';
            elTempLink.click();
        // }, 100);
    }, 100);
}
