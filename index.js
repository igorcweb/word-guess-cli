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
let wordsNumber = words.length;
let word;
let shuffledWords = shuffle(words);

console.log('');
console.log('Welcome to Word Guess CLI!');
console.log('');

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
    console.log('');
    function play() {
      word = new Word(shuffledWords[wordCount]);
      console.log(word);
      let letterArr = word.letterArr();
      console.log(word.wordDisplay());
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
            if (
              answer.letter.match(/^[A-Za-z]+$/) &&
              answer.letter.length === 1
            ) {
              letterArr = word.compare(answer.letter, letterArr);
              let wordDisplay = word.wordDisplay(letterArr);
              console.log(wordDisplay);
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
                        console.log('Thank you for playing!');
                      }
                    });
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
    play();
  });
