const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".paly-again");


let correctWord, wrongGuessCount, correctLetters;
const maxguesses = 6;

// Game reset 
const resetGama = () =>{
    wrongGuessCount = 0; 
    correctLetters = [];
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    wordDisplay.innerHTML = correctWord.split("").map(()=> `<li class="letter"></li>`).join("");
    guessesText.innerText = `${wrongGuessCount} / ${maxguesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModel.classList.remove("show");

}

// Create Random words and setting its correct space
const getRandomWords = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    correctWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGama();
}

// Game Over section
const gameOver = (isVictory) => {
    setTimeout(()=>{
        const modelText = isVictory ? `You found the word: `: `The correct word was: `;
        gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML =`${modelText} <b>${correctWord}</b>`;
        gameModel.classList.add("show");
    },300)

}

// Show words in display when click
const initGame = (button, clickedLetter) => {
    if(correctWord.includes(clickedLetter)){
        [...correctWord].forEach((letter, index)=> {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxguesses}`;
    // console.log(button, clickedLetter);

    if(wrongGuessCount === maxguesses) return gameOver(false);
    if(correctLetters.length === correctWord.length) return gameOver(true);
}

// Create Keyboard and adding Even Listeners
for(let i = 97; i<=122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWords();
playAgainBtn.addEventListener("click",getRandomWords);