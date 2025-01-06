const symbols = ['🧇', '🥞', '🎂', '🍫', '🍬', '🍰', '🥧', '🍦','🍧','🍪','🧁','🥮','🍭','🍡','🍮','🧋','🥨','🥐'];
const cards = [...symbols, ...symbols];
let firstCard, secondCard;
let isFlipping = false;
let matches = 0;
let moves = 0;
const restart = document.querySelector("#restart-button");
const restartbtn = document.querySelector("#restart-btn"); 
const moveCounter = document.getElementById('move-counter');

cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('game-board');
cards.forEach((symbol) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
    startTimer();
  if (isFlipping) return;
  if (this === firstCard) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.symbol;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    moves++;
    moveCounter.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  isFlipping = true;
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matches++;
    if (matches === symbols.length) {
        stopTimer();
        showPopup("Congratulations! You won the game! 🎉");
    }
    resetCards();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetCards();
    }, 500);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  isFlipping = false;
}

let timer = 30;
let timerInterval = null;

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById('timer').textContent = timer;
    if (timer <= 0) {
      stopTimer();
      showPopup("Time's up! You lost the game. 😞");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  timer = 30;
  document.getElementById('timer').textContent = timer;
}

function resetMoves(){
    moves = 0;
    document.getElementById('move-counter').textContent = moves;
}
function showPopup(message) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  popupMessage.textContent = message;
  popup.classList.remove('hidden');

  const restartButton = document.getElementById('restart-button');
  restartButton.addEventListener('click', () => {
    popup.classList.add('hidden');
    resetGame();
  });
}

  restart.addEventListener("click", function(){
    const popup = document.getElementById('popup');
   popup.classList.add('hidden');
   resetGame();
  });
  
  restartbtn.addEventListener("click", function(){
   resetGame();
  });

  function resetGame() {
    resetTimer();
    resetMoves();
    matches = 0;
    isFlipping = false;
  
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cards.sort(() => 0.5 - Math.random());  
    cards.forEach((symbol) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.symbol = symbol;
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
    });
  }