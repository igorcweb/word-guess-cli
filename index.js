const inquirer = require('inquirer');
const Word = require('./Word');

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
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let wordCount = 0;
let guess;
let word;
function chooseWord() {
  const shuffledWords = shuffle(words);
  return new Word(shuffledWords[wordCount]);
}

console.log('Welcome to Word Game CLI!');
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
          console.log('after compare: ', word.wordDisplay());
          console.log('');
          // if (display.includes('_')) {
          //   letterPrompt();
          // }
        });
    }
  });
