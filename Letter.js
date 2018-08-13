const Letter = function(value) {
  this.value = value.toLowerCase();
  this.guessed = false;
};

Letter.prototype.display = function() {
  let { value, guessed } = this;
  if (guessed) {
    return value;
  }
  return '_';
};

Letter.prototype.check = function(guess) {
  if (this.value === guess) {
    return (this.guessed = true);
  }
  return (this.guessed = false);
};

// console.log(letter.check('a'));
// console.log(letter.display());

module.exports = Letter;
