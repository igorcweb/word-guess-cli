const Letter = require('./Letter');

const Word = function(word) {
  this.word = word;
};

//Create an array of new Letter objects
Word.prototype.letterArr = function() {
  const letterArr = [];
  this.word.split('').forEach(letter => {
    letter = new Letter(letter);
    letterArr.push(letter);
  });
  return letterArr;
};

//Return a string representing word display
Word.prototype.wordDisplay = function(letterArr = this.letterArr()) {
  let wordDisplay = [];
  letterArr.forEach(letter => {
    //Function from Letter.js
    wordDisplay.push(letter.display());
  });
  return wordDisplay.join(' ');
};

//Compare letter to guess, and return an array with updated "guessed" values
Word.prototype.compare = function(guess, letterArr = this.letterArr()) {
  letterArr.forEach(letter => {
    //function from Letter.js
    letter.guessed = letter.check(guess);
  });
  return letterArr;
};

// word.compare('u');
// console.log(word.wordDisplay());

module.exports = Word;
