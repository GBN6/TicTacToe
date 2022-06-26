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
        if (winner(tileIndex))
        {
            gameOver = true;
            return;    
        }

        round++;
    }

    const getCurrentPlayerMarker = () => {
        return round % 2 === 1 ? playerX.getMarker() : playerO.getMarker();
      };
      if (round === 9) {
        gameOver = true;
        return;
      }
    const winner = (tileIndex) => {
        const win = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        const checkWinner = win.filter((combo) => combo.includes(tileIndex))
                                .some((possibleCombo) => possibleCombo.every((index) => gameBoard.getTile(index) === getCurrentPlayerMarker()));
        return checkWinner;
    }

    const getGameOver = () => {
        return gameOver;
    }

    const reset = () => {
        round = 1;
        gameOver = false;
    }

    return {playRound, getGameOver, reset};

})();