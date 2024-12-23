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
    tile.dataset.value = isEnglish ? value.en : value.pl;
    tile.textContent = isEnglish ? value.en : value.pl;

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
    if (
        (firstTile.dataset.value === secondTile.dataset.value) ||
        (tilesData.some(pair => 
            (firstTile.dataset.value === pair.en && secondTile.dataset.value === pair.pl) ||
            (firstTile.dataset.value === pair.pl && secondTile.dataset.value === pair.en)
        ))
    ) {
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

    const tiles = tilesData.flatMap(pair => [
        { value: pair.en, isEnglish: true },
        { value: pair.pl, isEnglish: false }
    ]);

    shuffleArray(tiles);

    tiles.forEach(({ value, isEnglish }) => {
        const tile = createTile({ en: value, pl: value }, isEnglish);
        gameBoard.appendChild(tile);
    });
};

document.getElementById("resetButton").addEventListener("click", initializeGame);

initializeGame();
