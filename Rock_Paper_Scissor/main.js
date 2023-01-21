// Fetch Variable
const computerChoice = document.getElementById('computer-choice');
const yourChoice = document.getElementById('your-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('.btn');
let userChoice;
let result;


possibleChoices.forEach((val) => {
    val.addEventListener('click', (e) => {
        userChoice = e.target.id; // you can use innerText also
        yourChoice.innerText = userChoice

        generateRandomeNumber();
        checkWin();
    });
})

function generateRandomeNumber() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    console.log(randomNumber);

    if (randomNumber == 1) {
        compChoice = 'Rock';
    }
    if (randomNumber == 2) {
        compChoice = 'Scissor';
    }
    if (randomNumber == 3) {
        compChoice = 'Paper';
    }
    computerChoice.innerText = compChoice;
}

function checkWin() {


    if (compChoice === userChoice) {
        result = 'Tie';
    }
    else if ((userChoice === 'Rock' && compChoice === 'Scissor') ||
        (userChoice === 'Scissor' && compChoice === 'Paper') ||
        (userChoice === 'Paper' && compChoice === 'Rock')) {
        result = 'You win!!';
    }
    else {
        result = 'You loose!';
    }
    resultDisplay.innerText = result;
}

