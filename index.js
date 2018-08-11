const inquirer = require('inquirer');
console.log('Welcome to Word Game CLI!');
const teams = [
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
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name'
    }
  ])
  .then(answer => {
    console.log(
      `Hello ${answer.name}!  Please guess a Wester Conference NBA team:`
    );
  });
