
const gameBoard = (() => {
    const gameTile = document.querySelectorAll('.game-tile');
    const playerTurn = document.querySelector('.player-turn');
    let flagMarker = 0;
    playerTurn.textContent = 'X\'s turn'; 
    const placeMarker = (e) => {
        if (e.target.textContent === '')
        {
            if (flagMarker === 0)
            {
                e.target.textContent = 'X';
                playerTurn.textContent = 'O\'s turn';
                flagMarker = 1;
            }
            else if (flagMarker === 1)
            {
                e.target.textContent = 'O';
                playerTurn.textContent = 'X\'s turn';
                flagMarker = 0;
            }
        }
    }

    gameTile.forEach((item) => item.addEventListener('click', placeMarker))
})();

const player = (name, marker) => {
    return {name, marker};
}

// gameBoard.renderBoard;


// const jeff = player('jeff', 'x')
// console.log(jeff.marker);

