const inquirer = require('inquirer');
const Word = require('./Word');
const helpers = require('./helpers');
const { shuffle } = helpers;
let guessedLetters = [];
let display;

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
  'trail blazers',
  'clippers',
  'grizzlies',
  'mavericks',
  'kings',
  'suns'
];

let wordCount = 0;
let wordsNumber = words.length;
let word;
let shuffledWords = shuffle(words);

console.log('');
console.log('Welcome to Word Guess CLI!');
console.log('');
function play() {
  let attempts = 6;
  guessedLetters = [];
  word = new Word(shuffledWords[wordCount]);
  // console.log(word.word);
  let letterArr = word.letterArr();
  console.log('');
  console.log(word.wordDisplay().toUpperCase());
  console.log('');
  function letterPrompt() {
    inquirer
      .prompt([
        {
          type: 'text',
          name: 'letter',
          message: 'Guess a letter'
        }
      ])
      .then(answer => {
        let { letter } = answer;
        letter = letter.toLowerCase();
        if (letter.match(/^[A-Za-z]+$/) && letter.length === 1) {
          guessedLetters.push(letter.toUpperCase());
          guessedLetters = Array.from(new Set(guessedLetters));
          console.log('');
          console.log(`Guessed letters: ${guessedLetters.join(', ')}`);
          letterArr = word.compare(letter, letterArr, attempts);
          let wordDisplay = word.wordDisplay(letterArr);
          if (display === wordDisplay) {
            attempts--;
            if (attempts > 1) {
              console.log('');
              console.log(`${attempts} attempts left.`);
              console.log('');
            } else if (attempts === 1) {
              console.log('');
              console.log(`${attempts} attempt left.`);
              console.log('');
            } else {
              console.log('');
              console.log(`The answer is ${word.word.toUpperCase()}`);
              console.log('');
              playAgain();
              return;
            }
          }
          console.log('');
          console.log(wordDisplay);
          console.log('');
          display = wordDisplay;
          if (wordDisplay.includes('_')) {
            letterPrompt();
          } else {
            wordCount++;
            wordsNumber--;
            console.log('');
            console.log(`${wordsNumber} teams to go!`);
            if (wordsNumber > 0) {
              play();
            } else {
              console.log('Congratulations!  You are an NBA expert!');
              playAgain();
            }
          }
        } else {
          console.log('Please enter a single letter');
          letterPrompt();
        }
      });
  }
  letterPrompt();
}
function playAgain() {
  inquirer
    .prompt([
      {
        name: 'play',
        type: 'list',
        message: 'Would you like to play again?',
        choices: ['Yes', 'No']
      }
    ])
    .then(answer => {
      if (answer.play === 'Yes') {
        wordCount = 0;
        wordsNumber = words.length;
        shuffledWords = shuffle(words);
        play();
      } else {
        console.log('');
        console.log('Thank you for playing!');
        console.log('');
      }
    });
}

inquirer
  .prompt([
    {
      type: 'text',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answer => {
    console.log('');
    console.log(
      `Hello ${answer.name}!  Please guess a Western Conference NBA team:`
    );
    play();
  });
