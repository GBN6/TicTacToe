const Players = (name, sign, appearance, mark, mode) => ({
  name,
  sign,
  appearance,
  mark,
  mode,
  addMark(element, lastPlayer) {
    const el = element;
    if (lastPlayer === createGame.playerOne) {
      const markIcon = document.createElement('i');
      markIcon.className = lastPlayer.mark;
      el.appendChild(markIcon);
      // el.classList.add('green');
    } else {
      const markIcon = document.createElement('i');
      markIcon.className = lastPlayer.mark;
      el.appendChild(markIcon);
      // el.classList.add('red');
    }
  },
});

const createGame = (() => {
    // DOM elements
    const newGameModal = document.querySelector('#new-game-modal');
    const mainContainer = document.querySelector('.main');
    const startGameButton = document.querySelector('#start-game');
    const resetButton = document.querySelector('#reset');
    const playerMessage = document.querySelector('.player-turn');
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

    const playerOne = Players('Player One', 'X', '', '', '');
    const playerTwo = Players('Player Two', 'O', '', '', '');
  
    let newPlayerTwoName;
    let newPlayerOneAppearance;
    let newPlayerTwoAppearance;
    let newPlayerOneMark;
    let newPlayerTwoMark;

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

    const createPlayersUi = () => {
      playerTwoHeadingList.forEach((item) => {
        item.addEventListener('click', () => {
          playerTwoHeading.textContent = item.textContent;
          reset();
          if (item.textContent === 'Bot') {
            newPlayerTwoName = 'Robot';
            newPlayerTwoAppearance = 'fas fa-robot';
            newPlayerTwoMark = 'fas fa-wrench fa-flip-horizontal';
            playerTwoHuman.style.display = 'none';
            playerTwoBot.style.display = 'flex';
          } else {
            playerTwoHuman.style.display = 'flex';
            playerTwoBot.style.display = 'none';
          }
        });
      });
  
      playerOneAppearance.forEach((appearance) => {
        appearance.addEventListener('click', () => {
          newPlayerOneAppearance = appearance.children[0].className;
          playerOneAppearance.forEach((element) => {
            element.classList.remove('selected');
          });
          appearance.classList.add('selected');
        });
      });
  
      playerTwoAppearance.forEach((appearance) => {
        appearance.addEventListener('click', () => {
          newPlayerTwoAppearance = appearance.children[0].className;
          playerTwoAppearance.forEach((element) => {
            element.classList.remove('selected');
          });
          appearance.classList.add('selected');
        });
      });
  
      playerOneMark.forEach((mark) => {
        mark.addEventListener('click', () => {
          newPlayerOneMark = mark.children[0].className;
          playerOneMark.forEach((element) => {
            element.classList.remove('selected');
          });
          mark.classList.add('selected');
        });
      });
  
      playerTwoMark.forEach((mark) => {
        mark.addEventListener('click', () => {
          newPlayerTwoMark = mark.children[0].className;
          playerTwoMark.forEach((element) => {
            element.classList.remove('selected');
          });
          mark.classList.add('selected');
        });
      });
  
      resetButton.addEventListener('click', () => {
        reset('hard');
      });
    };
    createPlayersUi();

    const setupGame = () => {
      // Player one setup
      playerOne.name = playerOneName.value;
      playerOne.appearance = newPlayerOneAppearance;
      playerOne.mark = newPlayerOneMark;
      playerMessage.textContent = `Player ${playerOne.name} turn`;
      // Player two setup
      playerTwo.mode = playerTwoHeading.textContent;
      playerTwo.name = newPlayerTwoName || playerTwoName.value;
      playerTwo.appearance = newPlayerTwoAppearance;
      playerTwo.mark = newPlayerTwoMark;
      // Player's sections setup
      playerOneSectionName.textContent = playerOne.name;
      playerTwoSectionName.textContent = playerTwo.name;
      const playerOneAppearanceIcon = document.createElement('i');
      playerOneAppearanceIcon.className = playerOne.appearance;
      playerOneSectionAppearance.textContent = '';
      playerOneSectionAppearance.appendChild(playerOneAppearanceIcon);
      const playerTwoAppearanceIcon = document.createElement('i');
      playerTwoAppearanceIcon.className = playerTwo.appearance;
      playerTwoSectionAppearance.textContent = '';
      playerTwoSectionAppearance.appendChild(playerTwoAppearanceIcon);
      const playerOneMarkIcon = document.createElement('i');
      playerOneMarkIcon.className = playerOne.mark;
      playerOneSectionMark.textContent = '';
      playerOneSectionMark.appendChild(playerOneMarkIcon);
      const playerTwoMarkIcon = document.createElement('i');
      playerTwoMarkIcon.className = playerTwo.mark;
      playerTwoSectionMark.textContent = '';
      playerTwoSectionMark.appendChild(playerTwoMarkIcon);
    };

    const validation = () => {
      startGameButton.addEventListener('click', () => {
        if (playerTwoHeading.textContent !== 'Choose'
        && playerOneName.value !== ''
        && newPlayerOneAppearance !== undefined
        && newPlayerTwoAppearance !== undefined
        && newPlayerOneMark !== undefined
        && newPlayerTwoMark !== undefined) {
          if (playerTwoName.value !== '' || newPlayerTwoName !== undefined) {
            setupGame();
            newGameModal.style.display = 'none';
            mainContainer.style.display = 'grid';
          }
        }
        // Mode error
        if (playerTwoHeading.textContent === 'Choose') {
          playerTwoErrorMode.textContent = 'CHOOSE PLAYER MODE';
          playerTwoErrorMode.style.display = 'block';
        } else {
          playerTwoErrorMode.textContent = '';
          playerTwoErrorMode.style.display = 'none';
        }
        if (playerTwoHeading.textContent !== 'Choose') {
          // Name errors
          if (playerOneName.value === '') {
            playerOneErrorName.textContent = 'FILL YOUR NAME';
            playerOneErrorName.style.display = 'block';
          } else {
            playerOneErrorName.textContent = '';
            playerOneErrorName.style.display = 'none';
          }
          if (playerTwoHeading.textContent === 'Human') {
            if (playerTwoName.value === '') {
              playerTwoErrorName.textContent = 'FILL YOUR NAME';
              playerTwoErrorName.style.display = 'block';
            } else {
              playerTwoErrorName.textContent = '';
              playerTwoErrorName.style.display = 'none';
            }
          }
          // Appearance errors
          if (newPlayerOneAppearance === undefined) {
            playerOneErrorAppearance.textContent = 'CHOOSE APPEARANCE';
            playerOneErrorAppearance.style.display = 'block';
          } else {
            playerOneErrorAppearance.textContent = '';
            playerOneErrorAppearance.style.display = 'none';
          }
          if (newPlayerTwoAppearance === undefined) {
            playerTwoErrorAppearance.textContent = 'CHOOSE APPEARANCE';
            playerTwoErrorAppearance.style.display = 'block';
          } else {
            playerTwoErrorAppearance.textContent = '';
            playerTwoErrorAppearance.style.display = 'none';
          }
          // Mark errors
          if (newPlayerOneMark === undefined) {
            playerOneErrorMark.textContent = 'CHOOSE MARK';
            playerOneErrorMark.style.display = 'block';
          } else {
            playerOneErrorMark.textContent = '';
            playerOneErrorMark.style.display = 'none';
          }
          if (newPlayerTwoMark === undefined) {
            playerTwoErrorMark.textContent = 'CHOOSE MARK';
            playerTwoErrorMark.style.display = 'block';
          } else {
            playerTwoErrorMark.textContent = '';
            playerTwoErrorMark.style.display = 'none';
          }
        }
      });
    };
    validation();
    return {
      playerOne,
      playerTwo,
      newGameModal,
      mainContainer,
      reset,
    };
})();




const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setTile = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
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
    
    return { setTile, getTile, reset, board };
})();

const displayGameController = (() => {
    const gameTile = document.querySelectorAll('.game-tile');
    const playerMessage = document.querySelector('.player-turn');
    const buttonReset = document.querySelector('.btn-restart');

    gameTile.forEach((tile) =>
     tile.addEventListener('click', (e) => {
      {
        if (game.getGameOver()) return;
        let index = parseInt(e.target.dataset.index);
        let currentPlayer = game.getCurrentPlayer();
        if (gameBoard.getTile(index) === '')
        {
            game.playRound(index);
            updateBoard(tile, currentPlayer);
            console.log(game.getRound());
            if (createGame.playerTwo.mode === 'Bot' && currentPlayer === createGame.playerOne && game.getRound() !== 9)
            {
              let i = 0;
              while (i < 1)
              {
                const randomIndex = Math.floor(Math.random() * gameBoard.board.length);
                if (gameBoard.getTile(randomIndex) === '')
                {
                  if (game.getGameOver()) return;
                  game.playRound(randomIndex);
                  let tileIndex = document.querySelector(`div[data-index="${randomIndex}"]`);
                  updateBoard(tileIndex, createGame.playerTwo);
                  i += 1;
                }
              }
            }
        } 
      }
    })
    );

    buttonReset.addEventListener('click', (e) => {
        gameBoard.reset();
        game.reset();
        gameTile.forEach((tile) => {
          let child = tile.lastElementChild
          while (child) {
            tile.removeChild(child);
            child = tile.lastElementChild;
          }
        })
        displayMessage(`Player ${createGame.playerOne.name} turn`);
    });

    const updateBoard = (tile, currentPlayer) => {
      currentPlayer.addMark(tile, currentPlayer);
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
    // const playerX = Player("X");
    // const playerO = Player("O");

    let round = 1;
    let gameOver = false;

    const playRound = (tileIndex) => {
        gameBoard.setTile(tileIndex, getCurrentPlayerSign());
        if (winner(tileIndex))
        {
            displayGameController.setResultMessage(getCurrentPlayerName());
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
        displayGameController.displayMessage(`Player ${getCurrentPlayerName()} turn`);
    };

    const getCurrentPlayer = () => {
      return round % 2 === 1 ? createGame.playerOne : createGame.playerTwo;
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? createGame.playerOne.sign : createGame.playerTwo.sign;
      };
    
    const getCurrentPlayerName = () => {
        return round % 2 === 1 ? createGame.playerOne.name : createGame.playerTwo.name;
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
        gameBoard.getTile(index) === getCurrentPlayerSign()));
        return checkWinner;
    };

    const getGameOver = () => {
        return gameOver;
    };

    const reset = () => {
        round = 1;
        gameOver = false;
    };

    const getRound = () => {
      return round;
    }

    return {playRound, getCurrentPlayer, getGameOver, reset, getRound};

})();
