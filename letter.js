

// Letter constructor
function Letter (letter) {
    // Store the letter string
    this.letter = letter;
    // Has this letter been guessed correctly?
    this.isGuessed = false;
    // If the letter has been guessed, return the letter. Otherwise, return an underscore.
    this.charReturn = function () {
        if (this.isGuessed) {
            return this.letter;
        } else {
            return "_";
        };
    };
    // Compare the letter that was guessed with the letter string in this object. if they're the same,
    // change isGuessed to true so that .charReturn returns the letter when called.
    this.compare = function (character) {
        if (character === this.letter) {
            this.isGuessed = true
            return true;
        } else {
            return false;
        };
    };
};

module.exports = Letter;