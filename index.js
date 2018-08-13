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
    let letterArr = word.letterArr();
    console.log('letterArr: ', letterArr);
    let display = '';
    letterArr.forEach(obj => {
      display += obj.display() + ' ';
    });
    console.log('display: ', display);
    letterPrompt();

    // letterPrompt();
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
          display = '';
          guess = answer.letter;
          letterArr = word.compare(guess);
          console.log('from compare: ', letterArr);
          letterArr.forEach(obj => {
            display += obj.display() + ' ';
          });
          console.log('display: ', display);
          if (display.includes('_')) {
            letterPrompt();
          }
        });
    }
  });
