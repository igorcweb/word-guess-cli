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

let word = new Word('mavericks');

Word.prototype.display = function() {
  let display = '';
  this.letterArr().forEach(letter => {
    if (letter.guessed) {
      display += letter.value + ' ';
    } else {
      display += '_ ';
    }
  });
  return display;
};

Word.prototype.compare = function(guess) {
  this.letterArr().forEach(letter => {
    letter.guessed = letter.check(guess);
    console.log(letter);
    // console.log(letter.display());
  });
};

// word.compare('a');
// console.log(word.display());
