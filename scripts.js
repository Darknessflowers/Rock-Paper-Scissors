// TODO:
//* Style results page
//* Reimplement restart button
//* Local storage
//* mobile styling
//* animation clean up
//* refactor with modules
// const paper = document.querySelector('#paper');
// const scissors = document.querySelector('#scissors');
// const rock = document.querySelector('#rock');
const game = document.querySelector('#game');
const results = document.querySelector('#results');
const gameChoice = document.querySelectorAll('.choice');
const score = document.querySelector('.scoreNum');
const resultText = document.querySelector('.result');
const restartBtn = document.querySelector('.restart');
const resultsPlayerIcon = document.querySelector('.playerResultIcon');
// const resultPlayerImage = document.createElement('img');
const resultInnerImage = resultsPlayerIcon.querySelector('img');

let choiceCoords;
let pickCoords = resultsPlayerIcon.getBoundingClientRect();
let scoreNum = 0;
let moveY;
let moveX;
let result;
let chosen;

let compChoice;
const moves = {
  // Your move
  scissors: {
    // Comp move
    rock: 'lose',
    paper: 'win',
    scissors: 'draw',
  },
  // Your move
  rock: {
    // Comp move
    rock: 'draw',
    paper: 'lose',
    scissors: 'win',
  },
  // Your move
  paper: {
    // Comp move
    rock: 'win',
    paper: 'draw',
    scissors: 'lose',
  },
};

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// TODO: computer move function
// generates num from 1 to 3. Returns rock/paper/scissors based on that
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeScore(change) {
  if (change === 'increase') {
    scoreNum += 1;
  } else if (change === 'decrease') {
    scoreNum -= 1;
  }
  score.innerText = scoreNum;
}

async function resultsTransition() {
  // TODO
  resultsPlayerIcon.classList.add(chosen);
  resultInnerImage.src = `./images/icon-${chosen}.svg`;
  await wait(1000);
  //* remove background on game
  game.classList.add('noBg');
  //* add hidden class to choices that weren't selected
  gameChoice.forEach(choice => {
    if (!choice.classList.contains('picked')) {
      choice.classList.add('hidden');
    }
  });
  await wait(1000);
  gameChoice.forEach(choice => {
    if (choice.classList.contains('picked')) {
      choice.style.transform = `translate3d(${moveX}px, ${moveY}px,0)`;
    }
  });
  //* wait
  await wait(450);
  results.classList.remove('hidden');

  //* add hidden class to game

  results.style.pointerEvents = 'all';

  game.style.display = 'none';
  game.classList.add('hidden');

  // if not the first time playing set it to grid

  if (result === 'win') {
    changeScore('increase');
  } else if (result === 'lose') {
    if (score >= 0) {
      changeScore('decrease');
    }
  }

  //! bonus
  //* move selected choice to position of results
}

function compMove() {
  // debugger;
  const compNum = randomNum(1, 3);
  // find computers choice based on random number
  switch (compNum) {
    case 1:
      compChoice = 'rock';
      break;
    case 2:
      compChoice = 'paper';
      break;
    case 3:
      compChoice = 'scissors';
      break;
    default:
      console.warn('Invalid num from comp');
      break;
  }
  return compChoice;
}
// compares option player clicked against what computer picked
// return whoincrease score
function compareMove(yourChoice) {
  compMove(yourChoice);
  chosen = yourChoice;
  result = moves[yourChoice][compChoice];
  console.log(
    `You chose ${yourChoice} and the computer chose ${compChoice}. You ${result}`
  );

  resultText.innerText = `You ${result}`;
  // wait a few seconds

  // call results
  resultsTransition();
}

function handleClick(event) {
  pickCoords = resultsPlayerIcon.getBoundingClientRect();
  choiceCoords = event.currentTarget.getBoundingClientRect();
  moveY = pickCoords.y - choiceCoords.y;
  moveX = pickCoords.x - choiceCoords.x;
  event.currentTarget.classList.add('picked');
  gameChoice.forEach(choice =>
    choice.removeEventListener('click', handleClick)
  );
  compareMove(event.currentTarget.id);

  // yourChoice = event.currentTarget;
}

function restartGame() {
  // hide results
  results.classList.add('hidden');
  // bring back game
  game.classList.remove('noBg');
  game.classList.remove('hidden');
  game.style.display = 'grid';
  gameChoice.forEach(choice => {
    choice.classList.remove('hidden');
    choice.classList.remove('picked');
  });
  // add event listeners back
  gameChoice.forEach(choice => choice.addEventListener('click', handleClick));
}
gameChoice.forEach(choice => choice.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
document.addEventListener('resize', () => {
  pickCoords = resultsPlayerIcon.getBoundingClientRect();
});
