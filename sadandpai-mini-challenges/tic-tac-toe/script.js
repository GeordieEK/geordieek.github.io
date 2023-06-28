const getNodes = () => {
  return {
    game: document.querySelector('#game'),
    cells: document.querySelectorAll('.cell'),
    resetButton: document.querySelector('#resetButton'),
  };
};

const getPlayer = () => {
  //TODO: Make ternary
  let playerX = true;

  return () => {
    if (playerX === true) {
      playerX = false;
      return 'X';
    } else {
      playerX = true;
      return 'O';
    }
  };
};

const displayWin = (player) => {
  document.querySelector('#winDiv').innerText = `${player} wins!`;
};

const makeGameBoard = () => {
  return [[], [], []];
};

const placeMark = (board, cell, player) => {
  const x = cell.getAttribute('data-x');
  const y = cell.getAttribute('data-y');
  board[x][y] = player;
};

// Returns true if win
const checkCol = (board) => {
  for (let i = 0; i < 3; i++) {
    const cache = { O: 0, X: 0 };

    for (let j = 0; j < 3; j++) {
      cache[board[i][j]] += 1;
    }

    if (cache['X'] === 3 || cache['O'] === 3) return true;
  }
  return false;
};

const checkRow = (board) => {
  for (let i = 0; i < 3; i++) {
    const cache = { O: 0, X: 0 };

    for (let j = 0; j < 3; j++) {
      cache[board[j][i]] += 1;
    }
    if (cache['X'] === 3 || cache['O'] === 3) return true;
  }
  return false;
};
const checkDiagonal = (board) => {
  const diagonals = [
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];
  for (arr of diagonals) {
    const cache = { O: 0, X: 0 };
    arr.forEach((val) => (cache[val] += 1));
    if (cache['X'] === 3 || cache['O'] === 3) return true;
  }
};

const checkWin = (board) => {
  if (checkRow(board) || checkCol(board) || checkDiagonal(board)) {
    console.log('win');
    return true;
  }
};

const handleCellClick = (event, player) => {
  const currentPlayer = player();
  // TODO: Split out display
  if (event.target.className === 'cell' && event.target.innerText === '') {
    event.target.innerText = currentPlayer;

    // Place internal mark
    placeMark(board, event.target, currentPlayer);
    // Check win
    if (checkWin(board)) displayWin(currentPlayer);
  }
};

const handleResetClick = (event, cells, board) => {
  // Clear visible cells
  cells.forEach((cell) => {
    cell.innerText = '';
  });
  // Clear internal game board
  board.forEach((col) => {
    col.length = 0;
  });
  document.querySelector('#winDiv').innerText = '';
};

const addListeners = ({ game, cells, resetButton }, board, player) => {
  // Use event delegation to add event listener to parent element instead of adding listeners to every cell in the game
  game.addEventListener('click', () => handleCellClick(event, player));
  resetButton.addEventListener('click', () =>
    handleResetClick(event, cells, board)
  );
};

const player = getPlayer();
const board = makeGameBoard();
const domNodes = getNodes();
addListeners(domNodes, board, player);
