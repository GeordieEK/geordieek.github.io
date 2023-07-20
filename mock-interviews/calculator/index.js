const container = document.querySelector('#container');
const display = document.querySelector('#display');
const btnContainer = document.querySelector('#btn-container');

//TODO: Global num bad - rewrite with closure?
let num1 = '';
let num2 = '';
let num1Saved = false;
let operation = '';

// Display numbers
// Grab number value as number (i.e parse number from string)
// Functions that perform match calculations

// Takes in number based on button presses
// Return number
function inputNumber(numberPressed, numToUpdate) {
  return numToUpdate.concat(numberPressed);
}

function displayNumber(num, display) {
  display.textContent = String(num);
}

function handleNumBtnClick(event) {
  const currentNum = !num1Saved ? num1 : num2;
  const newNum = inputNumber(event.target.textContent, currentNum);
  !num1Saved ? (num1 = newNum) : (num2 = newNum);
  displayNumber(newNum, display);
}

function handleOpBtnClick(event) {
  //TODO: Value not innerText
  operation = event.target.innerText;
  // TODO: Toggle number to input
  num1Saved = true;
  display.innerText = '0';
}

function handleEqualsBtnClick(event) {
  let resultNum;
  //TODO: Dependency Injection
  if (operation === '+') {
    resultNum = parseFloat(num1) + parseFloat(num2);
  }
  if (operation === '-') {
    resultNum = parseFloat(num1) - parseFloat(num2);
  }
  if (operation === 'x') {
    resultNum = parseFloat(num1) * parseFloat(num2);
  }
  if (operation === '/') {
    resultNum = parseFloat(num1) / parseFloat(num2);
  }
  // If num to display includes decimal, check string length and truncate appropriately
  // Display string
  displayNumber(resultNum.toFixed(8), display);
  clearValues();
}

function clearValues() {
  num1 = '';
  num2 = '';
  operation = '';
  num1Saved = false;
}

container.addEventListener('click', (event) => {
  // TODO: Fix condition bleed (clear is in opBtn class)
  if (event.target.classList.contains('equals')) handleEqualsBtnClick(event);
  else if (event.target.classList.contains('clear')) clearValues();
  // FIXME: Remove clear button from this condition by excluding its class
  else if (event.target.classList.contains('opBtn')) handleOpBtnClick(event);
  else if (event.target.classList.contains('numBtn')) handleNumBtnClick(event);
});
