'use strict';

function getRandomIntInclusive(min = 10, max = 50) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function toggleMenu(){
    document.body.classList.toggle('nav-open');
}
