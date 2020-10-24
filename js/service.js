var gNewLine = 0;
var gKeywords = {
    Happy: getRandomIntInclusive(),
    Cat: getRandomIntInclusive(),
    Baby: getRandomIntInclusive(),
    Man: getRandomIntInclusive(),
    Trump: getRandomIntInclusive(),
    Dog: getRandomIntInclusive(),
    Obama: getRandomIntInclusive(),
    Cute: getRandomIntInclusive(),
    Funny: getRandomIntInclusive(),
    'Movie/TV Show': getRandomIntInclusive(),
};

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [createLine("It's pretty", 0, 200)],
};

var gImgs = [
    { id: 1, url: 'gallery/1.jpg', keywords: ['Trump'] },
    { id: 2, url: 'gallery/2.jpg', keywords: ['Dog', 'Cute'] },
    { id: 3, url: 'gallery/3.jpg', keywords: ['Dog', 'Cute', 'Sleep', 'Baby'] },
    { id: 4, url: 'gallery/4.jpg', keywords: ['Cat', 'Sleep', 'Cute'] },
    { id: 5, url: 'gallery/5.jpg', keywords: ['Baby', 'Funny'] },
    { id: 6, url: 'gallery/6.jpg', keywords: ['Man', 'Movie/TV Show'] },
    { id: 7, url: 'gallery/7.jpg', keywords: ['Man', 'Cute'] },
    { id: 8, url: 'gallery/8.jpg', keywords: ['Man', 'Movie/TV Show'] },
    { id: 9, url: 'gallery/9.jpg', keywords: ['Baby', 'Funny'] },
    { id: 10, url: 'gallery/10.jpg', keywords: ['Man', 'Obama', 'Happy'] },
    { id: 11, url: 'gallery/11.jpg', keywords: ['Man'] },
    { id: 12, url: 'gallery/12.jpg', keywords: ['Man', 'Movie/TV Show'] },
    {
        id: 13,
        url: 'gallery/13.jpg',
        keywords: ['Man', 'Happy', 'Movie/TV Show'],
    },
    { id: 14, url: 'gallery/14.jpg', keywords: ['Man', 'Movie/TV Show'] },
    { id: 15, url: 'gallery/15.jpg', keywords: ['Man', 'Movie/TV Show'] },
    {
        id: 16,
        url: 'gallery/16.jpg',
        keywords: ['Man', 'Happy', 'Movie/TV Show'],
    },
    { id: 17, url: 'gallery/17.jpg', keywords: ['Man', 'Putin'] },
    { id: 18, url: 'gallery/18.jpg', keywords: ['cartoon'] },
];

function createLine(txt, x, y) {
    return {
        txt,
        size: 40,
        align: 'left',
        color: '#ffffff',
        strokeColor: '#000000',
        font: 'Impact',
        x,
        y,
    };
}

function setNewLine(newLineText) {
    gNewLine++;
    let newLineIdx = gNewLine;
    gMeme.selectedLineIdx = newLineIdx;
    gMeme.lines.push(createLine(newLineText, 180, 250));
}

function getImageById(imgId) {
    return gImgs.find((img) => img.id === imgId);
}

function setMemeText(text) {
    getCurrentLine().txt = text;
}

function setFontFamily(font) {
    getCurrentLine().font = font;
}

function setTextAlign(textAlign) {
    getCurrentLine().align = textAlign;
}

function setTextColor(textColor) {
    getCurrentLine().color = textColor;
}

function setFontSize(size) {
    getCurrentLine().size = size;
}

function setStrokeColor(strokeColor) {
    getCurrentLine().strokeColor = strokeColor;
}

function selectImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function getImages() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function getCurrentLineIdx() {
    return gMeme.selectedLineIdx;
}

function getCurrentLine() {
    return gMeme.lines[getCurrentLineIdx()];
}

function deleteLine() {
    gMeme.lines.splice(getCurrentLineIdx(), 1);
    gNewLine--;
    gMeme.selectedLineIdx = gNewLine;
}

function getKeywords() {
    return gKeywords;
}

function setKeywordClickes(keywordClick) {
    getKeywords()[keywordClick] += 1;
}
