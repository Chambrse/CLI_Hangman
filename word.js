let Letter = require("./letter");

// Word constructor; depends on the letter constructor
function Word(wordString) {
    //create an array of letter objects to represent the input word
    this.letters = wordString.split("").map(function (element) { return new Letter(element) });
    // Display the word according to which letters have been guessed correctly
    this.display = function () {

        let displayString = [];

        this.letters.forEach(element => {
            displayString.push(element.charReturn());
        });

        return displayString.join(" ");

    };
    // Compare the guessed letter to each letter object
    this.guess = function (letter) {

        let correctGuess = false;

        this.letters.forEach(element => {
            if (element.compare(letter)) {
                correctGuess = true;
            };
        });

        return correctGuess;

    };
};

module.exports = Word;