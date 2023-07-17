const symbols = [
  '🍇',
  '🍉',
  '🚗',
  '🍌',
  '🏠',
  '🥭',
  '🍎',
  '🐯',
  '🍒',
  '🍓',
  '🐵',
  '🥝',
  '🍿',
  '🏀',
  '🎱',
  '🐻',
  '🍜',
  '🍢',
  '🎓',
  '🍤',
  '🦀',
  '🍦',
  '🍩',
  '🎂',
  '🍫',
  '🍭',
  '🍼',
  '🪔',
  '🍺',
  '🐱',
  '🐶',
];

const selectSymbolPairs = (symbols, numPairs) => {
  const chosenSymbols = [];
  for (let i = 0; i < numPairs; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    chosenSymbols.push(symbols[randomIndex]);
  }
  return chosenSymbols.concat(chosenSymbols);
};

const createMatchCard = (symbol) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('game-card', 'facedown');
  const divContent = document.createElement('p');
  divContent.textContent = symbol;
  cardDiv.append(divContent);
  return cardDiv;
};

const populateGameContainer = (container, matchCards) => {
  matchCards.forEach((card) => {
    container.append(card);
  });
};

const attemptCounter = () => {
  let counter = 0;
  return {
    incrementCounter() {
      return ++counter;
    },
    resetCounter() {
      counter = 0;
    },
  };
};

const displayCount = (display, count) => {
  display.innerText = `${count} Attempts`;
};

const handleContainerClick = (event, checkMatch, counter, counterDisplay) => {
  if (event.target.matches('.game-card')) {
    event.target.classList.remove('facedown');
    checkMatch(event.target);
    displayCount(counterDisplay, counter.incrementCounter());
  }
};

const facedownCards = (cards, delay = 0) => {
  const flipCards = () => {
    cards.forEach((card) => card.classList.add('facedown'));
  };
  if (delay === 0) {
    flipCards();
  } else {
    setTimeout(flipCards, delay);
  }
};

const matchChecker = () => {
  let flippedCards = [];
  return (card) => {
    if (card !== flippedCards[0]) flippedCards.push(card);
    console.log(flippedCards);
    if (flippedCards.length > 2) {
      facedownCards(flippedCards);
      flippedCards = [];
    }
    if (flippedCards.length === 2) {
      const result =
        flippedCards[0].textContent === flippedCards[1].textContent;
      if (result) {
        console.log('match success');
        flippedCards.forEach((card) => card.classList.add('matched-card'));
      }
      facedownCards(flippedCards, 2000);
      setTimeout(() => (flippedCards = []), 2000);
      return result;
    }
  };
};

const bindEventHandlers = (
  container,
  resetBtn,
  counter,
  counterDisplay,
  checkMatch
) => {
  container.addEventListener('click', (event) => {
    if (event.target.matches('.game-card')) {
      event.target.classList.remove('facedown');
      checkMatch(event.target);
      displayCount(counterDisplay, counter.incrementCounter());
    }
  });

  resetBtn.addEventListener('click', () => {
    createMatchGame(
      gameContainer,
      symbols,
      resetBtn,
      counterDisplay,
      counter,
      false
    );
    displayCount(counterDisplay, 0);
  });
};

const createMatchGame = (
  container,
  symbols,
  resetBtn,
  counterDisplay,
  gameSize,
  counter = attemptCounter(),
  addListeners = true
) => {
  // Resetting counter and game container
  counter.resetCounter();
  container.innerText = '';

  // Choose symbols
  const symbolPairs = selectSymbolPairs(symbols, gameSize * 2);

  // Create Match Card
  const matchCards = symbolPairs.map((symbol) => createMatchCard(symbol));

  // Populate the game container
  populateGameContainer(container, matchCards);

  const checkMatch = matchChecker(); // Check matching pair function

  // If not a reset game, add event listeners and create new counter
  if (addListeners) {
    bindEventHandlers(container, resetBtn, counter, counterDisplay, checkMatch);
  }
};

const gameContainer = document.querySelector('.game-container');
const resetBtn = document.querySelector('#resetBtn');
const counterDisplay = document.querySelector('#counter');
const gridSize = 4; // 4x4 grid

createMatchGame(gameContainer, symbols, resetBtn, counterDisplay, gridSize);
