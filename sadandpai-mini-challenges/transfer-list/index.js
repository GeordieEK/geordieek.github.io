leftData = ['JS', 'HTML', 'CSS', 'TS'];
rightData = ['React', 'Angular', 'Vue', 'Svelte'];

const createListComponents = (data) => {
  const fragment = document.createDocumentFragment();
  for (string of data) {
    const divWrapper = document.createElement('div');
    const newInput = document.createElement('input');
    const inputLabel = document.createElement('label');
    newInput.type = 'checkbox';
    newInput.id = string;
    divWrapper.classList.add('checkbox-item');
    inputLabel.innerText = string;
    inputLabel.for = string;
    divWrapper.append(newInput, inputLabel);
    fragment.append(divWrapper);
  }
  return fragment;
};

const moveData = (data, destination, uncheck = false) => {
  for (item of data) {
    destination.append(item);
    if (uncheck) item.querySelector('input').checked = false;
  }
};

const moveDataHandler = (event, leftContainer, rightContainer) => {
  //TODO: Innertext not best way to check button, should be ID

  switch (event.target.innerText) {
    case '< <': {
      const itemsToMove = Array.from(rightContainer.children);
      moveData(itemsToMove, leftContainer);
      break;
    }
    case '> >': {
      const itemsToMove = Array.from(leftContainer.children);
      moveData(itemsToMove, rightContainer);
      break;
    }
    case '<': {
      const checkedItems = Array.from(
        rightContainer.querySelectorAll('input:checked')
      ).map((input) => input.parentNode);
      moveData(checkedItems, leftContainer, true);
      break;
    }
    case '>': {
      const checkedItems = Array.from(
        leftContainer.querySelectorAll('input:checked')
      ).map((input) => input.parentNode);
      moveData(checkedItems, rightContainer, true);
      break;
    }
  }
};

const handleBtnContainerClick = (event, leftContainer, rightContainer) => {
  if ((event.target.nodeType = 'button'))
    moveDataHandler(event, leftContainer, rightContainer); // Data is selected data and command is one of the button options
};

const makeTransferList = (leftContainer, rightContainer, btnContainer) => {
  const leftFieldset = createListComponents(leftData); // Take data and return fieldset of html nodes of checkboxes
  leftContainer.append(leftFieldset);
  const rightFieldset = createListComponents(rightData);
  rightContainer.append(rightFieldset);
  btnContainer.addEventListener('click', (event) => {
    handleBtnContainerClick(event, leftContainer, rightContainer);
  });
};

const leftContainer = document.querySelector('#leftContainer');
const rightContainer = document.querySelector('#rightContainer');
const btnContainer = document.querySelector('#btnContainer');

makeTransferList(leftContainer, rightContainer, btnContainer);
