const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const rock = document.querySelector('#rock');
const game = document.querySelector('#game');
const gameChoice = document.querySelectorAll('.choice');
const score = document.querySelector('.scoreNum');
let scoreNum = 0;
let chosen;

let compChoice;
const moves = {
  // Your move
  scissors: {
    // Comp move
    rock: 'lose',
    paper: 'win',
    scissors: 'tie',
  },
  // Your move
  rock: {
    // Comp move
    rock: 'tie',
    paper: 'lose',
    scissors: 'win',
  },
  // Your move
  paper: {
    // Comp move
    rock: 'win',
    paper: 'tie',
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
function compMove(yourChoice) {
  const compNum = randomNum(1, 3);
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

async function resultsTransition() {
  // TODO
  await wait(1000);
  //* remove background on game
  game.classList.add('noBg');
  console.log('waited');
  //* add hidden class to choices that weren't selected
  gameChoice.forEach(choice => {
    if (!choice.classList.contains('picked')) {
      choice.classList.add('hidden');
    }
  });
  //* wait
  await wait(500);
  //* add hidden class to game
  game.classList.add('hidden');
  //! bonus
  //* move selected choice to position of results
}

// compares option player clicked against what computer picked
// return whoincrease score
function compareMove(yourChoice) {
  compMove(yourChoice);
  const result = moves[yourChoice][compChoice];
  console.log(
    `You chose ${yourChoice} and the computer chose ${compChoice}. You ${result}`
  );
  if (result === 'win') {
    changeScore('increase');
  } else if (result === 'lose') {
    changeScore('decrease');
  }
  // wait a few seconds

  // call results
  resultsTransition();
}

function handleClick(event) {
  event.currentTarget.classList.add('picked');
  compareMove(event.currentTarget.id);
  // yourChoice = event.currentTarget;
  // console.log(yourChoice);
}
// compareMove('scissors');
// TODO: increase score function

gameChoice.forEach(choice => choice.addEventListener('click', handleClick));
