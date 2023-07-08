dataArray = [
  {
    name: 'Javascript',
  },
  {
    name: 'HTML',
  },
  {
    name: 'CSS',
  },
];

// Convert data array to Map for O(1) access
data = new Map(dataArray.map((toDo) => [toDo.name, toDo]));

// Reduce global variables
const getElements = () => {
  return {
    toDoWrapper: document.querySelector('.toDoWrapper'),
    userInput: document.querySelector('.toDoInput'),
  };
};

// Generic button factory
const createButton = (text) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add(`${text}Btn`);
  return button;
};

const createToDoNode = (name) => {
  const toDoNode = document.createElement('div');
  const toDoName = document.createElement('span');
  toDoName.textContent = name;
  toDoName.contentEditable = false;
  toDoName.classList.add('toDoName');
  toDoNode.appendChild(toDoName);
  toDoNode.dataset.index = name;
  toDoNode.classList.add('toDoItem');

  const editBtn = createButton('edit');
  const deleteBtn = createButton('delete');
  [editBtn, deleteBtn].forEach((btn) => {
    toDoNode.appendChild(btn);
  });

  return toDoNode;
};

const handleToDoClick = (e, container) => {
  const node = e.target.parentElement;
  if (e.target.classList.contains('deleteBtn')) {
    deleteToDo(node, container);
  }
  if (e.target.classList.contains('editBtn')) {
    editToDo(node, container);
  }
};

const deleteToDo = (node, container) => {
  console.log(node);
  data.delete(node.dataset.index); // Remove from mock database
  container.removeChild(node); // Remove from DOM
};

const addToDo = () => {
  if (userInput.value === '') return;
  if (data.has(userInput.value)) {
    alert('This Task already exists!');
    return;
  }

  const newTodo = createToDoNode(userInput.value);
  toDoWrapper.appendChild(newTodo);
  data.set(userInput.value, { name: userInput.value });
  userInput.value = '';
};

const editToDo = (node) => {
  const nameSpan = node.querySelector('.toDoName');
  const editBtn = node.querySelector('.editBtn');
  if (nameSpan.contentEditable === 'false') {
    data.delete(nameSpan.textContent); // Remove old record from database
    editBtn.textContent = 'save';
    nameSpan.contentEditable = true;
    nameSpan.focus();
  } else {
    nameSpan.contentEditable = false;
    editBtn.textContent = 'edit';
    data.set(nameSpan.textContent, { name: nameSpan.textContent });
    node.dataset.index = nameSpan.textContent;
  }
};

const reloadList = (container) => {
  container.innerHTML = '';
  data.forEach((task, name) => {
    container.appendChild(createToDoNode(name));
  });
};

const createListeners = (toDoWrapper, userInput) => {
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addToDo();
  });

  toDoWrapper.addEventListener('click', (e) => handleToDoClick(e, toDoWrapper));
};

const { toDoWrapper, userInput } = getElements();
reloadList(toDoWrapper);
createListeners(toDoWrapper, userInput);
