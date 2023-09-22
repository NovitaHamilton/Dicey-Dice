'use strict';

let finalScore, currentScore, activePlayer, playing, winScore;

// Selecting elements
const elementBtnHold = document.querySelector('.btn--hold');
const elementBtnNew = document.querySelector('.btn--new');
const elementBtnRoll = document.querySelector('.btn--roll');
const elementCurrent0 = document.getElementById('current--0'); // getElementById - Another way to select an ID, no # needed
const elementCurrent1 = document.getElementById('current--1');
const elementDice = document.querySelector('.dice');
const elementPlayer0 = document.querySelector('.player--0');
const elementPlayer1 = document.querySelector('.player--1');
const elementScore0 = document.querySelector('#score--0');
const elementScore1 = document.getElementById('score--1');

// Event handlers
window.addEventListener('load', init);
elementBtnHold.addEventListener('click', holdScore);
elementBtnNew.addEventListener('click', init);
elementBtnRoll.addEventListener('click', showDiceRoll);

// Main Functions
function init() {
  activePlayer = 0; // First player is player0 (Player 1)
  resetCurrentScore();
  finalScore = [0, 0]; // Storing final score of [player0, player1]
  playing = true;
  winScore = 100;

  elementCurrent0.textContent = 0;
  elementCurrent1.textContent = 0;
  elementScore0.textContent = 0;
  elementScore1.textContent = 0;
  hideDice();

  removeClass(selectActivePlayer(), 'player--winner');
  addClass(elementPlayer0, 'player--active');
  removeClass(elementPlayer1, 'player--active');
}

function holdScore() {
  if (playing) {
    // 1. Add the current score to the final score and display it
    finalScore[activePlayer] += currentScore;
    displayActivePlayerScore('score', finalScore[activePlayer]);
    // 2. Reset the current score to 0
    resetCurrentScore();
    // 3. Check if final score is >== 100, if yes player wins
    if (finalScore[activePlayer] >= winScore) {
      playing = false;
      addClass(selectActivePlayer(), 'player--winner');
      removeClass(selectActivePlayer(), 'player--active');
      hideDice();
    } else {
      // 4. If not, switch to next player
      switchPlayer();
    }
  }
}

function showDiceRoll() {
  if (playing) {
    // 1. Generate random dice roll
    const getRandomDiceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    removeClass(elementDice, 'hidden');
    elementDice.src = `dice-${getRandomDiceRoll}.png`;

    // 3. Check for rolled 1, if true switch to next player
    if (getRandomDiceRoll !== 1) {
      // Add to current score
      currentScore += getRandomDiceRoll;
      displayActivePlayerScore('current', currentScore);
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
}

function switchPlayer() {
  displayActivePlayerScore('current', 0);
  activePlayer = activePlayer === 0 ? 1 : 0;
  resetCurrentScore();
  togglePlayerActive(elementPlayer0);
  togglePlayerActive(elementPlayer1);
}

// General Functions
function addClass(element, cls) {
  element.classList.add(cls);
}

function displayActivePlayerScore(id, text) {
  document.getElementById(`${id}--${activePlayer}`).textContent = text;
}

function hideDice() {
  return elementDice.classList.add('hidden');
}

function removeClass(element, cls) {
  element.classList.remove(cls);
}

function resetCurrentScore() {
  currentScore = 0;
}

function selectActivePlayer() {
  return document.querySelector(`.player--${activePlayer}`);
}

function togglePlayerActive(element) {
  element.classList.toggle('player--active');
}
