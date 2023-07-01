const slotMachine = document.querySelector('.emoji-slots-game');
const food =
  'https://apis.scrimba.com/emojihub/api/all/category/food-and-drink';

function makeFruitArray(arr) {
  return arr
    .filter((food) => food.group === 'food fruit')
    .map((food) => food.unicode[0]);
}

function getRandomFruits(arr) {
  const fruitSet = [];
  for (let i = 0; i < 9; i++) {
    const randomNum = Math.floor(Math.random() * arr.length);
    fruitSet.push(arr[randomNum]);
  }
  return [...fruitSet]; // Using spread operator
}

async function foodRequest() {
  try {
    const response = await fetch(food);
    return await response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

function unicodeToEmoji(unicodeString) {
  const hexValue = unicodeString.replace('U+', ''); // Trim the unicode
  const intValue = parseInt(hexValue, 16); // Convert the hexadecimal string to an integer
  return String.fromCodePoint(intValue); // Convert the integer into a Unicode character
}

function loadWheel(slotMachine, arr) {
  slotMachine.textContent = ''; // Clear slot machine
  for (let unicodeString of arr) {
    const emoji = unicodeToEmoji(unicodeString);
    const listEl = document.createElement('li');
    listEl.textContent = emoji;
    slotMachine.appendChild(listEl);
  }
}

async function spinWheel() {
  const foodArray = await foodRequest();
  const fruitArray = makeFruitArray(foodArray);
  const chosenFruits = getRandomFruits(fruitArray);
  loadWheel(slotMachine, chosenFruits);
}

spinWheel();
