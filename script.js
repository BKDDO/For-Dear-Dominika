const gameBoard = document.getElementById('game-board');
const playAgainButton = document.getElementById('play-again');

const cardValues = ['consistent', 'spójny', 'tenacious', 'wytrwały'];
let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Initialize the game
function initGame() {
    shuffledCards = [...cardValues].sort(() => Math.random() - 0.5);
    gameBoard.innerHTML = '';
    shuffledCards.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.textContent = '';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card function
function flipCard() {
    if (lockBoard || this.classList.contains('active') || this.classList.contains('matched')) return;

    this.classList.add('active');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkMatch();
}

// Check for a match
function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.removeEventListener('click', flipCard); // Disable further clicks
        secondCard.removeEventListener('click', flipCard); // Disable further clicks
        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('active');
            secondCard.classList.remove('active');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetTurn();
        }, 1000);
    }
}

// Reset turn
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Add functionality to Play Again button
playAgainButton.addEventListener('click', initGame);

// Start the game on page load
initGame();
