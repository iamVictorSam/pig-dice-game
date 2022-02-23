'use strict';

// selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdGame = document.querySelector('.btn--hold');

// Starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;

let playing, scores, currentScore, activePlayer;

const initGame = function () {
  // Starting conditions
   playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initGame();

const switchPlayer = function () {
  // switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  /* the toggle checks if a class is present ? removes it buh if its absent: adds it */
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
rollDice.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice
    let dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled dice 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', initGame)
  

holdGame.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
