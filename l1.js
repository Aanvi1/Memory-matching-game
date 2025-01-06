const symbols = ['🧇', '🥞', '🎂', '🍫', '🍬', '🍰', '🥧', '🍦'];
const cards = [...symbols, ...symbols]; // Pair duplicate
let firstCard, secondCard;
let isFlipping = false;
let matches = 0;
let moves = 0;
const restart = document.querySelector("#restart-button");
const restartbtn = document.querySelector("#restart-btn"); 
const moveCounter = document.getElementById('move-counter');
const nextLevel = document.querySelector("#next-level");

// To shuffle the cards randomly
cards.sort(() => 0.5 - Math.random());

// Generate game board
const gameBoard = document.getElementById('game-board');
cards.forEach((symbol) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});

// Card flip logic
function flipCard() {
    startTimer(); // Start timer when the 1st card is flipped
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

// Check if cards match
function checkMatch() {
  isFlipping = true;
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matches++;
    if (matches === symbols.length) { // To check if all the pairs are matched
        stopTimer();
        showPopup("Congratulations! You won the game! 🎉");
        nextLevel.style.display = 'inline';
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

// Reset selected cards
function resetCards() {
  [firstCard, secondCard] = [null, null];
  isFlipping = false;
}

// Starting the timer
let timer = 60; // Countdown duration (in secs)
let timerInterval = null;

// Start the countdown timer
function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById('timer').textContent = timer; // Update timer
    if (timer <= 0) {
      stopTimer();
      showPopup("Time's up! You lost the game. 😞");
      nextLevel.classList.remove("hidden");
    }
  }, 1000);
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Reset the timer
function resetTimer() {
  stopTimer();
  timer = 60; // Reset to initial duration
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
    popup.classList.remove('hidden'); // Show popup
  
    // Restart button functionality
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
      popup.classList.add('hidden'); // Hide popup
      resetGame(); // Resetting the game
    });
  }

  restart.addEventListener("click", function(){
    const popup = document.getElementById('popup');
   popup.classList.add('hidden'); // Hide popup
   resetGame();
  });
  
  restartbtn.addEventListener("click", function(){
   resetGame();
  });

  function resetGame() {
    resetTimer();
    resetMoves();
    matches = 0; // Reset matches
    isFlipping = false;
    nextLevel.style.display = 'none';
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
  
nextLevel.addEventListener("click", function () {
  window.location.href = "l2.html"; // Linking the next level
});
  