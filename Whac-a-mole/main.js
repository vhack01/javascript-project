const playBoard = document.querySelector('#play-board');
const scored = document.querySelector('#score');
const timeLeft = document.querySelector('#time-left');
const gameOver = document.querySelector('#game-over');
let gridboxes;
let score = 0;
let delaytime = 500;
let clock = null;
let runTimer = null;

countDown();
function countDown() {
    let second = 60;
    let clock = window.setInterval(() => {
        timeLeft.innerText = --second;
        if (second == 0) {
            clearInterval(clock);
            clearInterval(runTimer);
            playBoard.remove();
            gameOver.innerText = "GAME OVER !!! \n Your Final Score : " + score;
        }
    }, 1000);
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        div.setAttribute('class', 'grid-box');
        playBoard.appendChild(div);
    }
}

function playGame() {
    runTimer = window.setInterval(KillTheMole, delaytime);

}

function KillTheMole() {
    gridboxes = playBoard.children;
    filter();

    // if (score > 10 && score <= 20) delaytime = 500;
    // else if (score > 20 && score <= 30) delaytime = 300;
    // else if (score > 30) delaytime = 100;

    // console.log(delaytime);

    let randomNumber = Math.floor(Math.random() * gridboxes.length) + 1;
    const img = document.createElement('img');
    img.setAttribute('src', './images/mole.jpg');
    img.addEventListener('mousedown', () => {
        ++score;
        scored.innerText = score;
    });
    gridboxes[randomNumber - 1].appendChild(img);

}
function filter() {
    let arr = [];
    for (let item of gridboxes) {
        arr.push(item);
    }
    arr.forEach(box => {
        if (box.firstChild) box.firstChild.remove();
    });
}
createBoard();
playGame();