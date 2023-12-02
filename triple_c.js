'use strict';
//selecting the ELEMENTS

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
// OR
const score1EL = document.getElementById('score--1');
const Current0EL = document.getElementById('current--0');
const Current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
//starting conditions

let score, currentScore, activePlayer, playing
const init = function() {
  score = [0, 0];
  currentScore = 0;
   activePlayer = 0;
   playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  Current0EL.textContent = 0;
  Current1EL.textContent = 0;
  
  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
}
init()
const swicthPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
// rollin the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display the dice image
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    // check for rolled 1: if true : switch to next player
    if (dice !== 1) {
      // add to current score
      // currentScore = currentScore+dice  OR
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // Current0EL.textContent = currentScore; // change later
    } else {
      swicthPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active players score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //check if players score >= 100
    if (score[activePlayer] >= 200) {
      //finish the game
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      swicthPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
