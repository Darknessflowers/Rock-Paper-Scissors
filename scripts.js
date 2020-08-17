console.log('it works');
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
// scissors beats paper
// paper beats rock
// rock beats scissors

// TODO: computer move function
// generates num from 1 to 3. Returns rock/paper/scissors based on that
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function compMove() {
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
  console.log(compChoice);
  return compChoice;
}

// TODO: compare function
// compares option player clicked against what computer picked
// return who won
// increase score
function compareMove(yourChoice) {
  debugger;
  compMove();
  const result = moves[yourChoice][compChoice];
  console.log(
    `You chose ${yourChoice} and the computer chose ${compChoice}. You ${result}`
  );
}
compareMove('scissors');
// TODO: increase score function
