const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById('gameContainer');
const statusMessage = document.getElementById('statusMessage');
const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');

let isPlayerXTurn = true;
let gameState = Array(9).fill(null);

// Start button to initialize the game
startButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    initializeGame();
});

// Initialize game state
function initializeGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win', 'lose');
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    isPlayerXTurn = true;
    updateStatusMessage();
}

// Update the game status message
function updateStatusMessage() {
    statusMessage.textContent = `Player ${isPlayerXTurn ? 'X' : 'O'}'s Turn`;
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const currentPlayer = isPlayerXTurn ? 'X' : 'O';
    const cellIndex = Array.from(cells).indexOf(cell);
    
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (gameState.every(cell => cell)) {
        endGame(true);
    } else {
        isPlayerXTurn = !isPlayerXTurn;
        updateStatusMessage();
    }
}

// Check for winning combinations
function checkWin(currentPlayer) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winningCombinations.some(combination => {
        if (combination.every(index => gameState[index] === currentPlayer)) {
            combination.forEach(index => cells[index].classList.add('win'));
            return true;
        }
        return false;
    });
}

// End game with a win or draw
function endGame(draw) {
    if (draw) {
        statusMessage.textContent = "It's a Draw!";
        cells.forEach(cell => cell.classList.add('lose'));
    } else {
        statusMessage.textContent = `Player ${isPlayerXTurn ? 'X' : 'O'} Wins!`;
    }
    restartButton.classList.remove('hidden');
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

// Restart button to reset the game
restartButton.addEventListener('click', () => {
    restartButton.classList.add('hidden');
    initializeGame();
});
