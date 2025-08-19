let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let vsAI = false;
let scores = { X: 0, O: 0, Draw: 0 };

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

function startGame() {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");
    createBoard();
}

function playAI() {
    vsAI = true;
    startGame();
}

function createBoard() {
    boardEl.innerHTML = "";
    board = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        boardEl.appendChild(cell);
    }
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] !== "" || !isGameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusEl.textContent = `Player ${currentPlayer} Wins!`;
        scores[currentPlayer]++;
        updateScore();
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusEl.textContent = "It's a Draw!";
        scores.Draw++;
        updateScore();
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusEl.textContent = `Player ${currentPlayer}'s Turn`;

    if (vsAI && currentPlayer === "O") {
        aiMove();
    }
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(i => board[i] === currentPlayer)
    );
}

function aiMove() {
    let emptyCells = board.map((val,i) => val === "" ? i : null).filter(v => v !== null);
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    setTimeout(() => {
        document.querySelector(`.cell[data-index='${move}']`).click();
    }, 500);
}

function restartGame() {
    createBoard();
    currentPlayer = "X";
    isGameActive = true;
    statusEl.textContent = "Player X's Turn";
}

function resetScore() {
    scores = { X: 0, O: 0, Draw: 0 };
    updateScore();
}

function updateScore() {
    document.getElementById("scoreX").textContent = `Player X: ${scores.X}`;
    document.getElementById("scoreO").textContent = `Player O: ${scores.O}`;
    document.getElementById("scoreDraw").textContent = `Draws: ${scores.Draw}`;
}
