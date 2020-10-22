var gKeywords = {'happy': 12,'funny puk': 1};
var gNewLine = 0;

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [createLine('It\'s pretty', 40, 70)]
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


function createLine(txt, x, y){
    return {
        txt,
        size: 40,
        align: 'left',
        color: '#ffffff',
        strokeColor: '#000000',
        font: 'Impact',
        x,
        y
    }
}

function setNewLine(newLineText){
    gNewLine++;
    let newLineIdx = gNewLine;
    console.log('newLineIdx', newLineIdx);
    gMeme.selectedLineIdx = newLineIdx;
    gMeme.lines.push(createLine(newLineText, 180, 250));
   
}

function getImageById(imgId){
    return gImgs.find(img => img.id === imgId);
}

function setMemeText(text){
    getCurrentLine().txt = text;
}

function setFontFamily(font){
    getCurrentLine().font = font;
}

function setTextAlign(textAlign){
    getCurrentLine().align = textAlign;
}

function setTextColor(textColor){
    getCurrentLine().color = textColor;
}

function setStrokeColor(strokeColor){
    getCurrentLine().strokeColor = strokeColor;
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

function getCurrentLineIdx(){
    return gMeme.selectedLineIdx;
} 


function getCurrentLine(){
    return gMeme.lines[getCurrentLineIdx()];
}