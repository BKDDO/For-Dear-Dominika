const gameBoard = document.getElementById('game-board');
const playAgainButton = document.getElementById('play-again');

const cardValues = [
    { word: 'consistent', pair: 'spójny' },
    { word: 'tenacious', pair: 'wytrwały' }
];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Initialize the game
function initGame() {
    cards = [...cardValues, ...cardValues]
        .map((card, index) => ({ ...card, id: index }))
        .sort(() => Math.random() - 0.5);
    
    gameBoard.innerHTML = '';
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.word = card.word;
        cardElement.dataset.pair = card.pair;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Flip card function
function flipCard() {
    if (lockBoard || this.classList.contains('active') || this.classList.contains('matched')) return;

    this.classList.add('active');
    this.textContent = this.dataset.word || this.dataset.pair;

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
    const isMatch =
        firstCard.dataset.word === secondCard.dataset.pair ||
        firstCard.dataset.pair === secondCard.dataset.word;

    if (isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
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
