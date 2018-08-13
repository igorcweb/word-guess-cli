const inquirer = require('inquirer');
const Word = require('./Word');
const helpers = require('./helpers');
const shuffle = helpers.shuffle;

const words = [
  'timberwolves',
  'spurs',
  'thunder',
  'pelicans',
  'warriors',
  'rockets',
  'jazz',
  'lakers',
  'nuggets',
  'blazers',
  'clippers',
  'grizzlies',
  'mavericks',
  'kings',
  'suns'
];

let wordCount = 0;
let guess;
let word;
function chooseWord() {
  const shuffledWords = shuffle(words);
  return new Word(shuffledWords[wordCount]);
}
console.log('');
console.log('Welcome to Word Guess CLI!');
console.log('');
let letterArr;
inquirer
  .prompt([
    {
      type: 'text',
      name: 'name',
      message: 'What is your name'
    }
  ])
  .then(answer => {
    console.log('');
    console.log(
      `Hello ${answer.name}!  Please guess a Western Conference NBA team:`
    );
    console.log('');
    word = chooseWord();
    letterArr = word.letterArr();
    console.log(letterArr);
    console.log('');
    console.log(word.wordDisplay(letterArr));
    console.log('');

    letterPrompt();
    function letterPrompt() {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'letter',
            message: 'Guess a letter:'
          }
        ])
        .then(answer => {
          guess = answer.letter;
          letterArr = word.compare(guess, letterArr);
          console.log(letterArr);
          console.log('');
          console.log(word.wordDisplay(letterArr));
          console.log('');
          if (word.wordDisplay().includes('_')) {
            letterPrompt();
          }
        });
    }
  });
