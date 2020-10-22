var gKeywords = {'happy': 12,'funny puk': 1};

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 40,
        align: 'left',
        color: 'red',
        strokeColor: 'black',
        font: 'Impact',
        x: 0,
        y: 0
    }]
}

var gImgs = [{id: 1, url: 'gallery/1.jpg', keywords: ['happy']},
             {id: 2, url: 'gallery/2.jpg', keywords: ['happy']},
             {id: 3, url: 'gallery/3.jpg', keywords: ['happy']},
             {id: 4, url: 'gallery/4.jpg', keywords: ['happy']},
             {id: 5, url: 'gallery/5.jpg', keywords: ['happy']},
             {id: 6, url: 'gallery/6.jpg', keywords: ['happy']},
             {id: 7, url: 'gallery/7.jpg', keywords: ['happy']},
             {id: 8, url: 'gallery/8.jpg', keywords: ['happy']},
             {id: 9, url: 'gallery/9.jpg', keywords: ['happy']},
             {id: 10, url: 'gallery/10.jpg', keywords: ['happy']}
            ];






function setNewLine(newLine){
    gMeme.selectedLineIdx =1;
    gMeme.lines[1].txt = newLine;
}

function getImageById(imgId){
    return gImgs.find(img => img.id === imgId);
}

function setMemeText(text){
    gMeme.lines[0].txt = text;
}

function setFontFamily(font){
    gMeme.lines[0].font = font;
}

function setTextAlign(textAlign){
    gMeme.lines[0].align = textAlign;
}

function setTextColor(color){
    gMeme.lines[0].align = textAlign;
}

function selectImg(imgId){
    gMeme.selectedImgId = imgId;
}          

function getImages(){
    return gImgs;
}            

function getMeme(){
    return gMeme;
} 

function getLine(){
    return gMeme.lines;
} 


