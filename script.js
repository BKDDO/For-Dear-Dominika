const gameBoard = document.getElementById('game-board');
const playAgainButton = document.getElementById('play-again');

const cardValues = [
    { id: 1, text: 'consistent' },
    { id: 2, text: 'spójny' },
    { id: 3, text: 'tenacious' },
    { id: 4, text: 'wytrwały' }
];

let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Initialize the game
function initGame() {
    shuffledCards = [...cardValues, ...cardValues]
        .sort(() => Math.random() - 0.5);

    gameBoard.innerHTML = '';
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.textContent = card.text; // Start hidden (CSS hides the text)
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Flip card function
function flipCard() {
    if (lockBoard || this.classList.contains('active') || this.classList.contains('matched')) return;

    this.classList.add('active');
    this.style.color = '#0073e6';

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkMatch();
}

// Check if cards match
function checkMatch() {
    if (firstCard.dataset.id === secondCard.dataset.id) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('active');
            secondCard.classList.remove('active');
            firstCard.style.color = 'transparent';
            secondCard.style.color = 'transparent';
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

// Reset game
playAgainButton.addEventListener('click', initGame);

// Start game on load
initGame();

