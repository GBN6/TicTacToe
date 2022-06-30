const Player = (marker) => {
    this.marker = marker;
  
    const getMarker = () => {
      return marker;
    };
  
    return { getMarker };
  };

const createGame = (() => {
    // DOM elements
    const newGameModal = document.querySelector('#new-game-modal');
    const mainContainer = document.querySelector('.main-container');
    const startGameButton = document.querySelector('#start-game');
    const resetButton = document.querySelector('#reset');
    const playerTwoHeading = document.querySelector('.player-two-button h3');
    const playerTwoHeadingList = document.querySelectorAll('.player-two-list h3');
    const playerOneName = document.querySelector('#player-one-name');
    const playerTwoName = document.querySelector('#player-two-name');
    const playerOneAppearance = document.querySelectorAll('#player-one .appearance');
    const playerTwoAppearance = document.querySelectorAll('.player-two-human .appearance');
    const playerOneMark = document.querySelectorAll('#player-one .mark');
    const playerTwoMark = document.querySelectorAll('.player-two-human .mark');
    const playerTwoHuman = document.querySelector('.player-two-human');
    const playerTwoBot = document.querySelector('.player-two-bot');
    
    // DOM elements for errors
    const playerTwoErrorMode = document.querySelector('#player-two .error-mode');
    const playerOneErrorName = document.querySelector('#player-one .error-name');
    const playerTwoErrorName = document.querySelector('#player-two .error-name');
    const playerOneErrorAppearance = document.querySelector('#player-one .error-appearance');
    const playerTwoErrorAppearance = document.querySelector('#player-two .error-appearance');
    const playerOneErrorMark = document.querySelector('#player-one .error-mark');
    const playerTwoErrorMark = document.querySelector('#player-two .error-mark');

    // Player's sections
    const playerOneSectionName = document.querySelector('.player-one-section .player-section-name');
    const playerTwoSectionName = document.querySelector('.player-two-section .player-section-name');
    const playerOneSectionAppearance = document.querySelector('.player-one-section .player-section-appearance');
    const playerTwoSectionAppearance = document.querySelector('.player-two-section .player-section-appearance');
    const playerOneSectionMark = document.querySelector('.player-one-section .player-section-mark');
    const playerTwoSectionMark = document.querySelector('.player-two-section .player-section-mark');

    const reset = (type) => {
      if (type === 'hard') {
        playerTwoHeading.textContent = 'Choose';
        playerTwoBot.style.display = 'none';
        playerTwoHuman.style.display = 'none';
      }
      playerOneName.value = '';
      playerTwoName.value = '';
      newPlayerTwoName = undefined;
      newPlayerOneAppearance = undefined;
      newPlayerTwoAppearance = undefined;
      newPlayerOneMark = undefined;
      newPlayerTwoMark = undefined;
      playerOneAppearance.forEach((element) => {
        element.classList.remove('selected');
      });
      playerTwoAppearance.forEach((element) => {
        element.classList.remove('selected');
      });
      playerOneMark.forEach((element) => {
        element.classList.remove('selected');
      });
      playerTwoMark.forEach((element) => {
        element.classList.remove('selected');
      });
      playerTwoErrorMode.style.display = 'none';
      playerOneErrorName.style.display = 'none';
      playerTwoErrorName.style.display = 'none';
      playerOneErrorAppearance.style.display = 'none';
      playerTwoErrorAppearance.style.display = 'none';
      playerOneErrorMark.style.display = 'none';
      playerTwoErrorMark.style.display = 'none';
    };
})




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
    const playerMessage = document.querySelector('.player-turn');
    const buttonReset = document.querySelector('.btn-restart')

    gameTile.forEach((tile) =>
     tile.addEventListener('click', (e) => {
        if (game.getGameOver() || e.target.textContent !== "") return;
        game.playRound(parseInt(e.target.dataset.index));
        console.log(e.target.dataset.index);
        updateBoard();
    })
    )

    buttonReset.addEventListener('click', (e) => {
        gameBoard.reset();
        game.reset();
        updateBoard();
        displayMessage('Player X\'s turn');
    })

    const updateBoard = () => {
        for (let i = 0; i < gameTile.length; i++) {
            gameTile[i].textContent = gameBoard.getTile(i);
        }
      };

    const setResultMessage = (result) => {
        if (result === "Draw") {
          displayMessage("It's a draw!");
        } else {
          displayMessage(`Player ${result} has won!`);
        }
      };
    

    const displayMessage = (text) => {
        playerMessage.textContent = text;
    };
    return {displayMessage, setResultMessage};

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
            displayGameController.setResultMessage(getCurrentPlayerMarker());
            gameOver = true;
            return;    
        }
        if (round === 9)
        {
            displayGameController.setResultMessage('Draw');
            gameOver = true;
            return;
        }
        
        round++;
        displayGameController.displayMessage(`Player ${getCurrentPlayerMarker()}'s turn`);
    };

    const getCurrentPlayerMarker = () => {
        return round % 2 === 1 ? playerX.getMarker() : playerO.getMarker();
      };

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

        const checkWinner = win.filter((combo) => 
        combo.includes(tileIndex)).some((possibleCombo) => 
        possibleCombo.every((index) => 
        gameBoard.getTile(index) === getCurrentPlayerMarker()));

        console.log(checkWinner);
        return checkWinner;
    };

    const getGameOver = () => {
        return gameOver;
    };

    const reset = () => {
        round = 1;
        gameOver = false;
    };

    return {playRound, getGameOver, reset};

})();