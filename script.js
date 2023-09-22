'use strict';

// Selecting elements
const elementScore0 = document.querySelector('#score--0');
const elementScore1 = document.getElementById('score--1'); // Another way to select an ID

const elementDice = document.querySelector('.dice');
const elementBtnNew = document.querySelector('.btn--new');
const elementBtnRoll = document.querySelector('.btn--roll');
const elementBtnHold = document.querySelector('.btn--hold');
const elementPlayer0 = document.querySelector('.player--0');
const elementPlayer1 = document.querySelector('.player--1');
const elementCurrent0 = document.getElementById('current--0');
const elementCurrent1 = document.getElementById('current--1');

// Starting conditions

window.addEventListener('load', init);
elementBtnRoll.addEventListener('click', showDiceRoll);
elementBtnHold.addEventListener('click', holdScore);
elementBtnNew.addEventListener('click', init);

let finalScore, currentScore, activePlayer, playing, maxScore;

function init() {
  finalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  maxScore = 100;

  elementCurrent0.textContent = 0;
  elementCurrent1.textContent = 0;
  elementScore0.textContent = 0;
  elementScore1.textContent = 0;
  elementDice.classList.add('hidden');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  elementPlayer0.classList.add('player--active');
  elementPlayer1.classList.remove('player--active');
}

// let displayCurrentScore = document.getElementById(
//   `current--${activePlayer}`
// ).textContent;

function showDiceRoll() {
  if (playing) {
    // 1. Generate random dice roll
    const getRandomDiceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    elementDice.classList.remove('hidden');
    elementDice.src = `dice-${getRandomDiceRoll}.png`;

    // 3. Check for rolled 1, if true switch to next player
    if (getRandomDiceRoll !== 1) {
      // Add to current score
      currentScore += getRandomDiceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchToNextPlayer();
    }
  }
}

function holdScore() {
  if (playing) {
    // 1. Add the current score to the final score and display it
    finalScore[activePlayer] += currentScore;
    console.log(finalScore[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScore[activePlayer];
    // 2. Reset the current score to 0
    currentScore = 0;
    // 3. Check if final score is >== 100, if yes player wins
    if (finalScore[activePlayer] >= maxScore) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      elementDice.classList.add('hidden');
    } else {
      // 4. If not, switch to next player
      switchToNextPlayer();
    }
  }
}

function switchToNextPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  elementPlayer0.classList.toggle('player--active');
  elementPlayer1.classList.toggle('player--active');
}
