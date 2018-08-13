const Letter = require('./Letter');

const Word = function(word) {
  this.word = word;
};

Word.prototype.letterArr = function() {
  const letterArr = [];
  this.word.split('').forEach(letter => {
    letter = new Letter(letter);
    letterArr.push(letter);
  });
  return letterArr;
};

Word.prototype.display = function() {
  let display = '';
  let letterArr = this.letterArr();
  letterArr.forEach(letter => {
    if (letter.guessed) {
      display += letter.value + ' ';
    } else {
      display += '_ ';
    }
  });
  return display;
};

Word.prototype.compare = function(guess) {
  let letterArr = this.letterArr();
  letterArr.forEach(letter => {
    letter.guessed = letter.check(guess);
  });
  return letterArr;
};

// word.compare('u');
// console.log(word.display());

module.exports = Word;
