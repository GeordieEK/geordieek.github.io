const getNodes = () => {
  return {
    game: document.querySelector('#game'),
    cells: document.querySelectorAll('.cell'),
    resetButton: document.querySelector('#resetButton'),
  };
};

const getCurrentPlayer = () => {
  let player = 'X';
  return () => {
    player = player === 'X' ? 'O' : 'X';
    return player;
  };
};

const displayWin = (player) => {
  document.querySelector('#winDiv').innerText = `${player} wins!`;
};

const placeMark = (board, cell, player) => {
  const x = cell.dataset.x;
  const y = cell.dataset.y;
  board[x][y] = player;
};

// prettier-ignore
const winningConditions = [
  [[0, 0], [0, 1], [0, 2]],  // top row
  [[1, 0], [1, 1], [1, 2]],  // middle row
  [[2, 0], [2, 1], [2, 2]],  // bottom row
  [[0, 0], [1, 0], [2, 0]],  // left column
  [[0, 1], [1, 1], [2, 1]],  // middle column
  [[0, 2], [1, 2], [2, 2]],  // right column
  [[0, 0], [1, 1], [2, 2]],  // main diagonal
  [[0, 2], [1, 1], [2, 0]]   // secondary diagonal
];

const checkWin = (board) => {
  for (let condition of winningConditions) {
    const [a, b, c] = condition.map(([x, y]) => board[x][y]);
    if (a !== undefined && a === b && a === c) {
      return true;
    }
  }
  return false;
};

const handleCellClick = (event, player, board) => {
  const currentPlayer = player();
  if (event.target.innerText === '') {
    // Fill UI cell with current player mark
    event.target.innerText = currentPlayer;
    // Place internal mark in 2D Matrix
    placeMark(board, event.target, currentPlayer);
    // Check win and display winning player if true
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
  // Uses event delegation to add event listener to parent element
  // instead of adding listeners to every cell in the game
  game.addEventListener('click', (event) => {
    if (event.target.className === 'cell') {
      handleCellClick(event, player, board);
    }
  });
  resetButton.addEventListener('click', () =>
    handleResetClick(event, cells, board)
  );
};

const player = getCurrentPlayer();
const board = [[], [], []];
const domNodes = getNodes();
addListeners(domNodes, board, player);
