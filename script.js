const Player = (marker) => {
    this.marker = marker;
  
    const getMarker = () => {
      return marker;
    };
  
    return { getMarker };
  };

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setTile = (index, marker) => {
        if (index > board.length) return;
        board[index] = marker;
      };

    const getTile = (index) => {
        if (index > board.length) return;
        return board[index];
    };
    const reset = () => {
        for (let i = 0; i < board.length; i++) {
          board[i] = "";
        }
      };
    
    return { setTile, getTile, reset };
})();

const displayGameController = (() => {
    const gameTile = document.querySelectorAll('.game-tile');
    const playerTurn = document.querySelector('.player-turn');

    gameTile.forEach((tile) =>
     tile.addEventListener('click', (e) => {
        if (e.target.textContent !== "") return;
        game.playRound(parseInt(e.target.dataset.index));
        updateBoard();
    })
    )

    const updateBoard = () => {
        for (let i = 0; i < gameTile.length; i++) {
            gameTile[i].textContent = gameBoard.getTile(i);
        }
      };

})();

const game = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let gameOver = false;

    const playRound = (tileIndex) => {
        gameBoard.setTile(tileIndex, getCurrentPlayerMarker());
        round++;
    }

    const getCurrentPlayerMarker = () => {
        return round % 2 === 1 ? playerX.getMarker() : playerO.getMarker();
      };
      if (round === 9) {
        gameOver = true;
        return;
      }

    return {playRound};

})();
// gameBoard.renderBoard;


// const jeff = player('jeff', 'x')
// console.log(jeff.marker);

// const gameTile = document.querySelectorAll('.game-tile');
// const playerTurn = document.querySelector('.player-turn');
// let flagMarker = 0;
// playerTurn.textContent = 'X\'s turn'; 
// const placeMarker = (e) => {
//     if (e.target.textContent === '')
//     {
//         if (flagMarker === 0)
//         {
//             e.target.textContent = 'X';
//             playerTurn.textContent = 'O\'s turn';
//             flagMarker = 1;
//         }
//         else if (flagMarker === 1)
//         {
//             e.target.textContent = 'O';
//             playerTurn.textContent = 'X\'s turn';
//             flagMarker = 0;
//         }
//     }
// }
// gameTile.forEach((item) => item.addEventListener('click', placeMarker))