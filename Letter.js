const Letter = function(value) {
  this.value = value.toLowerCase();
  this.guessed = false;
};

//Displayin either the letter or placeholder depending on the guess
Letter.prototype.display = function() {
  let { value, guessed } = this;
  if (guessed) {
    return value;
  }
  return '_';
};

//Checking if the letter has been guessed
Letter.prototype.check = function(guess) {
  if (this.value === guess) {
    return (this.guessed = true);
  }
  return (this.guessed = false);
};

// console.log(letter.check('a'));
// console.log(letter.display());

module.exports = Letter;
