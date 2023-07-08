data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO: Globals bad - encapsulate later
const puzzleContainer = document.querySelector('.puzzleContainer');

const populatePuzzle = (data, puzzleContainer) => {
  data.forEach((dataElement) => {
    const puzzleSquare = document.createElement('div');
    puzzleSquare.classList.add('puzzleSquare');
    puzzleSquare.draggable = true;
    puzzleSquare.textContent = dataElement;
    puzzleContainer.appendChild(puzzleSquare);
  });
};

const swapElements = (obj1, obj2) => {
  // create marker element and insert it where obj1 is
  var temp = document.createElement('div');
  obj1.parentNode.insertBefore(temp, obj1);
  // move obj1 to right before obj2
  obj2.parentNode.insertBefore(obj1, obj2);
  // move obj2 to right before where obj1 used to be
  temp.parentNode.insertBefore(obj2, temp);
  // remove temporary marker node
  temp.parentNode.removeChild(temp);
};

const handleDrag = () => {
  //Swap position with element that it lands on
};

const addDragListeners = (puzzleContainer) => {
  let dragged = null;
  puzzleContainer.addEventListener('dragstart', (event) => {
    dragged = event.target;
    // console.log('start drag', event);
  });
  puzzleContainer.addEventListener('dragover', (event) => {
    event.preventDefault(); // MDN recommended (allows drop)
    console.log('dragover', event.target);
  });
  puzzleContainer.addEventListener('drop', (event) => {
    event.preventDefault();
    if (event.target === dragged) return; // Don't replace with itself
    const tempNode = dragged;
    swapElements(dragged, event.target);
  });
};

populatePuzzle(data, puzzleContainer);
addDragListeners(puzzleContainer);
