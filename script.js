const tilesData = [
    { en: "consistent", pl: "spójny" },
    { en: "tenacious", pl: "wytrwały" }
];

let firstTile = null;
let secondTile = null;
let isProcessing = false;

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const createTile = (value, isEnglish) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.value = value;
    tile.textContent = value;

    tile.addEventListener("click", () => {
        if (isProcessing || tile.classList.contains("revealed") || tile.classList.contains("matched")) {
            return;
        }

        tile.classList.add("revealed");

        if (!firstTile) {
            firstTile = tile;
        } else if (!secondTile) {
            secondTile = tile;
            checkMatch();
        }
    });

    return tile;
};

const checkMatch = () => {
    const pair = tilesData.find(
        pair => 
            (firstTile.dataset.value === pair.en && secondTile.dataset.value === pair.pl) ||
            (firstTile.dataset.value === pair.pl && secondTile.dataset.value === pair.en)
    );

    if (pair) {
        firstTile.classList.add("matched");
        secondTile.classList.add("matched");
        resetSelection();
    } else {
        isProcessing = true;
        setTimeout(() => {
            firstTile.classList.remove("revealed");
            secondTile.classList.remove("revealed");
            resetSelection();
        }, 1000);
    }
};

const resetSelection = () => {
    firstTile = null;
    secondTile = null;
    isProcessing = false;
};

const initializeGame = () => {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";

    const tiles = [
        { value: tilesData[0].en, isEnglish: true },
        { value: tilesData[0].pl, isEnglish: false },
        { value: tilesData[1].en, isEnglish: true },
        { value: tilesData[1].pl, isEnglish: false }
    ];

    shuffleArray(tiles);

    tiles.forEach(({ value }) => {
        const tile = createTile(value);
        gameBoard.appendChild(tile);
    });
};

document.getElementById("resetButton").addEventListener("click", initializeGame);

initializeGame();
