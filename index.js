// Import the word constructor, a bunch of words, and the inquirer module
const Word = require("./word");
const wordList = require("an-array-of-english-words");
const inquirer = require("inquirer");

// Limits the word array to only five letter words
const fiveLetterWords = wordList.filter(w => !!w.match(/^.{5}$/));

// A line for pretty formatting
const line = "----------------------------------";

// Initialize some variables
let thisWord;
let guessesRemaining = 0;
let lettersGuessed = [];

// Reset some variables, get a new word, start the letter guessing process
function startGame() {
    
    console.log(line);
    
    lettersGuessed = [];
    guessesRemaining = 10;

    thisWordString = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];

    thisWord = new Word(thisWordString);

    letterGuess();

};

// Get the input from the user, validate it, and process the result after comparing the guess to each letter object in the word object.
function letterGuess() {

    inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "input",
                message: "Guess a letter:",
                name: "guessedLetter",
            }
        ])
        .then(function (inquirerResponse) {

            // Make sure the input is a single letter
            let regex = /^[a-z]$/i;
            let isValid = regex.test(inquirerResponse.guessedLetter);

            // If the input is valid, and you haven't already guessed ths input letter,
            if (isValid && !lettersGuessed.includes(inquirerResponse.guessedLetter.toLowerCase())) {

                // Record which letter was guessed
                lettersGuessed.push(inquirerResponse.guessedLetter.toLowerCase());

                // Guess the letter against the letters in the word object. If its in the word, congratulate the user
                if (thisWord.guess(inquirerResponse.guessedLetter.toLowerCase())) {
                    console.log("Nice!");

                // if the guessed letter is not in the word, dock the remaining guesses
                } else {
                    guessesRemaining--;
                    if (guessesRemaining != 0) {
                        console.log("Try again!");
                    };
                };

                // If you're out of guesses and haven't completed the word, you lose!
                if (guessesRemaining === 0 && thisWord.display().includes("_")) {
                    console.log("\nSorry! You lose! Loser!");
                    console.log("The word was: " + thisWordString + "\n");
                    playAgain();

                // If you finished the word, you win!
                } else if (!thisWord.display().includes("_")) {
                    console.log("\nYou win! Awesome!");
                    console.log("The word was: " + thisWordString + "\n");
                    playAgain();

                // If you haven't won or lost, keep going
                } else {
                    console.log("Guesses remaining: " + guessesRemaining + "\n");
                    console.log(thisWord.display() + "\n");
                    console.log(line);
                    letterGuess();
                };

            } else if (!isValid) {
                console.log("Not a valid submission. You must guess a single alphabetic Character.");
                letterGuess();
                
            } else {
                console.log("You've already guessed that letter. Choose another.");
                letterGuess();
            };

        });

};

function playAgain() {

    inquirer
    .prompt([
        // Here we create a basic text prompt.
        {
            type: "confirm",
            message: "Play again?",
            name: "confirm",
            default: "y"
        }
    ])
    .then(function (inquirerResponse) {
        if (inquirerResponse.confirm) {
            startGame();
        };
    });

};

startGame();
