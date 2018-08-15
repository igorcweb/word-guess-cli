const Letter = function(value) {
  this.value = value.toLowerCase();
  this.guessed = false;
};

//Displaying either the letter or placeholder depending on the guess
Letter.prototype.display = function() {
  let { value, guessed } = this;
  if (guessed || value === ' ') {
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

module.exports = Letter;
