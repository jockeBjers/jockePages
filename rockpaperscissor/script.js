let humanScore = 0;
let computerScore = 0;
let gamesPlayed = 0;
const winningScore = 3;
const maxRounds = 5;

const container = document.querySelector(".container");
const containerTwo = document.querySelector(".containerTwo");
const playedRound = document.querySelector(".played-round");
const emojiPlayer = document.querySelector(".emoji-player");
const emojiComputer = document.querySelector(".emoji-computer");
const emojiText = document.querySelector(".emoji-text");
const score = document.querySelector(".score");

const playerEmoji = document.createElement("div");
const computerEmoji = document.createElement("div");
const results = document.createElement("div");
const finalWinner = document.createElement("div");

container.appendChild(results);
container.appendChild(finalWinner);
emojiPlayer.appendChild(playerEmoji);
emojiComputer.appendChild(computerEmoji);

playerEmoji.innerHTML = '&#9994';
computerEmoji.innerHTML = '&#9994';
results.textContent = "Best of five wins ";
score.textContent = humanScore + " : " + computerScore;
finalWinner.textContent = "Best of five: ";

const rock = document.querySelector("#rock");
rock.addEventListener("click", () => {
    playRound('ROCK', getComputerChoice())
});
const paper = document.querySelector("#paper");
paper.addEventListener("click", () => {
    playRound('PAPER', getComputerChoice())
});
const scissor = document.querySelector("#scissor");
scissor.addEventListener("click", () => {
    playRound('SCISSOR', getComputerChoice())
});

const resetGame = document.querySelector("#reset");
resetGame.addEventListener("click", () => {
    reset();
});

function getComputerChoice() {
    const choices = ['ROCK', 'PAPER', 'SCISSOR'];
    const randomElement = choices[Math.floor(Math.random() * choices.length)];
    return randomElement;
}

function playRound(getHumanChoice, getComputerChoice) {

    const textToEmoji = {
        'ROCK': '&#9994',    // Fist for Rock
        'PAPER': '&#9995',   // Hand for Paper
        'SCISSOR': '&#9996' // Scissors for Scissor
    };

    playerEmoji.innerHTML = `${textToEmoji[getHumanChoice]}`;
    computerEmoji.innerHTML = `${textToEmoji[getComputerChoice]}`;

    if ((getHumanChoice === "ROCK" && getComputerChoice === "SCISSOR") ||
        (getHumanChoice === "PAPER" && getComputerChoice === "ROCK") ||
        (getHumanChoice === "SCISSOR" && getComputerChoice === "PAPER")) {
        results.setAttribute("style", "color: green;");
        results.textContent = `You win! ${getHumanChoice} beats ${getComputerChoice}!`;
        ++humanScore;
    }

    else if (getComputerChoice === getHumanChoice) {
        results.textContent = "It's a tie!";
        results.setAttribute("style", "color: grey;");
    }
    else {
        results.textContent = `Computer wins! ${getComputerChoice} beats ${getHumanChoice}!`;
        results.setAttribute("style", "color: red;");
        ++computerScore;
    }

    gamesPlayed++;
    calc();

}

function calc() {
    score.textContent = humanScore + " : " + computerScore;
    finalWinner.textContent = "Current round: " + gamesPlayed;

    if (humanScore === winningScore) {
        humanWinner();
    }
    else if (computerScore === winningScore) {
        computerWinner();
    }

    if (gamesPlayed >= 4) {
        if (humanScore === 2 && computerScore === 0) {
            humanWinner();
            return;
        } else if (computerScore === 2 && humanScore === 0) {
            computerWinner();
            return;
        }
    }

    if (gamesPlayed >= maxRounds) {

        if (humanScore === computerScore) {
            finalWinner.textContent = "Current round: " + gamesPlayed + ` It's still a tie after ${gamesPlayed} rounds! Keep playing...`;
        }
        else if (humanScore > computerScore) {
            humanWinner();
        }
        else {
            computerWinner();
        }
    }
}

function humanWinner() {
    finalWinner.textContent =  "Current round: " + gamesPlayed + " Congratulations! You win!";
    container.setAttribute("style", "color: black; background: lightgreen;");
    results.setAttribute("style", "color: black;");
    disableGame();
}

function computerWinner() {
    finalWinner.textContent =  "Current round: " + gamesPlayed + " Awwwwwww! You lose!";
    container.setAttribute("style", "color: black; background: red;");
    results.setAttribute("style", "color: black;");
    disableGame();
}
function disableGame() {
    rock.disabled = true;
    paper.disabled = true;
    scissor.disabled = true;
    rock.setAttribute("style", "background: grey;")
    paper.setAttribute("style", "background: grey;")
    scissor.setAttribute("style", "background: grey;")
}

function reset() {
    humanScore = 0;
    computerScore = 0;
    gamesPlayed = 0;

    rock.disabled = false;
    paper.disabled = false;
    scissor.disabled = false;
    rock.setAttribute("style", "background: #f85e5e;")
    paper.setAttribute("style", "background: #70f556;")
    scissor.setAttribute("style", "background: #64a4f8;")

    results.setAttribute("style", "color: black;");
    playerEmoji.innerHTML = '&#9994';
    computerEmoji.innerHTML = '&#9994';
    container.setAttribute("style", "background: white");
    results.textContent = "Best of five wins ";
    score.textContent = humanScore + " : " + computerScore;
    finalWinner.textContent = "Best of five: ";
}