const game = document.querySelector('#game');
const results = document.querySelector('#results');
const gameChoice = document.querySelectorAll('.choice');
const score = document.querySelector('.scoreNum');
const resultOuter = document.querySelector('.resultText');
const resultText = document.querySelector('.result');
const restartBtn = document.querySelector('.restart');
const resultsPlayerIcon = document.querySelector('.playerResultIcon');
const houseIcon = document.querySelector('.houseResultIcon');
const resultInnerImage = resultsPlayerIcon.querySelector('img');
const houseIconImage = houseIcon.querySelector('img');
const houseIconCover = document.querySelector('.hideHouse');
const rulesModal = document.querySelector('.rulesModalOuter');
const rulesBtn = document.querySelector('.rulesBtn');
const closeRulesBtn = document.querySelector('.closeModal');

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

function mirrorToLocalStorage() {
  localStorage.setItem('score', scoreNum);
}
function retreiveFromLocalStorage() {
  // get score from local storage and display
  const retreivedScore = JSON.parse(localStorage.getItem('score'));
  console.log(retreivedScore);
  if (retreivedScore > 0) {
    scoreNum = retreivedScore;
    score.innerText = retreivedScore;
  }
}

function changeScore(change) {
  if (change === 'increase') {
    scoreNum += 1;
  } else if (change === 'decrease') {
    console.log('decrease complete');
    scoreNum -= 1;
  }
  score.innerText = scoreNum;
  mirrorToLocalStorage();
}

async function resultsTransition() {
  // add class of chosen move to the results icon
  resultsPlayerIcon.classList.add(chosen);
  resultInnerImage.src = `./images/icon-${chosen}.svg`;
  await wait(200); // wait so that icon has time to load
  //* remove background on game
  game.classList.add('noBg');
  //* add hidden class to choices that weren't selected
  gameChoice.forEach(choice => {
    if (!choice.classList.contains('picked')) {
      choice.classList.add('hidden');
    }
  });
  await wait(500);
  gameChoice.forEach(choice => {
    if (choice.classList.contains('picked')) {
      choice.style.transform = `translate3d(${moveX}px, ${moveY}px,0)`; // move icon to results section
    }
  });
  //* wait
  await wait(450); // let translate animation play
  results.classList.remove('hidden');
  results.style.pointerEvents = 'all';
  //* add hidden class to game
  game.style.display = 'none';
  game.classList.add('hidden');
  // add icon to house
  houseIcon.classList.replace('empty', compChoice);
  houseIconImage.src = `./images/icon-${compChoice}.svg`;
  await wait(500);
  houseIconCover.classList.add('hidden');
  await wait(150);
  // make icon go BIG

  houseIconCover.classList.add('scale');
  resultsPlayerIcon.classList.add('scaleUp');
  houseIcon.classList.add('scaleUp');
  // scaleIcon
  // get width of scaled element
  // set parent to same width
  await wait(600);
  resultOuter.classList.remove('closed');
  await wait(500);
  resultOuter.classList.remove('opacityHidden');
  console.log(result);
  if (result === 'win') {
    changeScore('increase');
    resultsPlayerIcon.classList.add('winner');
  } else if (result === 'lose') {
    if (scoreNum > 0) {
      console.log('decreasing');
      changeScore('decrease');
    }
    houseIcon.classList.add('winner');
  }
}

function compMove() {
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
}

function restartGame() {
  // hide results
  results.classList.add('hidden');
  resultInnerImage.src = ``;
  houseIconImage.src = ``;
  // bring back game
  game.classList.remove('noBg');
  game.classList.remove('hidden');
  game.style.display = 'grid';
  resultOuter.classList.add('closed');
  resultOuter.classList.add('opacityHidden');
  moveY = 0;
  moveX = 0;
  houseIcon.classList.replace(compChoice, 'empty');
  houseIconCover.classList.remove('hidden');
  houseIconCover.classList.remove('scale');
  resultsPlayerIcon.classList.remove('scaleUp');
  houseIcon.classList.remove('scaleUp');

  if (resultsPlayerIcon.classList.contains('winner')) {
    resultsPlayerIcon.classList.remove('winner');
  } else if (houseIcon.classList.contains('winner')) {
    houseIcon.classList.remove('winner');
  }

  gameChoice.forEach(choice => {
    if (choice.classList.contains('picked')) {
      choice.style.transform = `translate3d(${moveX}px, ${moveY}px,0)`;
    }
  });
  resultsPlayerIcon.classList.remove(chosen);
  gameChoice.forEach(choice => {
    choice.classList.remove('hidden');
    choice.classList.remove('picked');
  });
  // add event listeners back
  gameChoice.forEach(choice => choice.addEventListener('click', handleClick));
}
function handleModalClick() {
  rulesModal.classList.add('open');
}
function closeModal() {
  rulesModal.classList.remove('open');
}
rulesModal.addEventListener('click', event => {
  const isOutside = !event.target.closest('.rulesModalInner');
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

gameChoice.forEach(choice => choice.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
document.addEventListener('resize', () => {
  pickCoords = resultsPlayerIcon.getBoundingClientRect();
});
rulesBtn.addEventListener('click', handleModalClick);
closeRulesBtn.addEventListener('click', closeModal);

retreiveFromLocalStorage();
