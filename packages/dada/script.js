document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const rollDiceBtn = document.getElementById('roll-dice');
    const diceResultDiv = document.getElementById('dice-result');
    const playerPositionDiv = document.getElementById('player-position');

    let playerPosition = 1;

    const snakes = {
        16: 6,
        47: 26,
        49: 11,
        56: 53,
        62: 19,
        64: 60,
        87: 24,
        93: 73,
        95: 75,
        98: 78
    };

    const ladders = {
        1: 38,
        4: 14,
        9: 31,
        21: 42,
        28: 84,
        36: 44,
        51: 67,
        71: 91,
        80: 100
    };

    function createBoard() {
        for (let i = 100; i > 0; i--) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.textContent = i;
            gameBoard.appendChild(square);
        }
        const player = document.createElement('div');
        player.classList.add('player');
        gameBoard.appendChild(player);
        updatePlayerPosition();
    }

    function rollDice() {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        diceResultDiv.textContent = `Dice Roll: ${diceRoll}`;
        movePlayer(diceRoll);
    }

    function movePlayer(steps) {
        playerPosition += steps;
        if (playerPosition > 100) {
            playerPosition = 100;
        }

        if (snakes[playerPosition]) {
            playerPosition = snakes[playerPosition];
            alert('Oops! You landed on a snake!');
        }

        if (ladders[playerPosition]) {
            playerPosition = ladders[playerPosition];
            alert('Yay! You climbed a ladder!');
        }

        updatePlayerPosition();

        if (playerPosition === 100) {
            alert('Congratulations! You won!');
            playerPosition = 1;
            updatePlayerPosition();
        }
    }

    function updatePlayerPosition() {
        const player = document.querySelector('.player');
        const row = Math.floor((playerPosition - 1) / 10);
        const col = (playerPosition - 1) % 10;
        const x = col * 50 + 10;
        const y = (9 - row) * 50 + 10;

        player.style.left = `${x}px`;
        player.style.bottom = `${y}px`;
        playerPositionDiv.textContent = `Player is at position: ${playerPosition}`;
    }

    createBoard();
    rollDiceBtn.addEventListener('click', rollDice);
});