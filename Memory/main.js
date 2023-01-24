const boardImage = document.querySelectorAll('.board__image');
const resultDisplay = document.getElementById('result');
const path = {
    1: './images/cheeseburger.png',
    2: './images/fries.png',
    3: './images/hotdog.png',
    4: './images/ice-cream.png',
    5: './images/milkshake.png',
    6: './images/pizza.png'
};
let clickCount = 0;
let clickedOn = null;
let memory = {};
let score = 0;

boardImage.forEach((val) => {
    val.addEventListener('click', function handlr(e) {
        e.target.removeEventListener('click', handlr);
        ++clickCount;
        clickedOn = e.target;

        //generator randome Number
        generatorRandomNumber();

        // click count
        if (clickCount == 2) {
            clickCount = 0;
            matchEquality();
        }
    });
});

function generatorRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    memory[clickCount] = clickedOn;
    clickedOn.setAttribute('src', path[randomNumber]);
}

function matchEquality() {
    let choice1 = memory['1'].getAttribute('src');
    let choice2 = memory['2'].getAttribute('src');
    if (choice1 === choice2) ++score;
    else setTimeout(vanish, 300);
    resultDisplay.innerText = score;
}

function vanish() {
    memory['1'].setAttribute('src', './images/white.png');
    memory['2'].setAttribute('src', './images/white.png');
}


// sorting array in random order
// array.sort(()=> 0.5 - Math.random());