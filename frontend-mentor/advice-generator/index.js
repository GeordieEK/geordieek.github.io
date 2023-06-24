const getElements = () => {
  return {
    adviceButton: document.querySelector('#diceButton'),
    adviceNum: document.querySelector('#adviceNum'),
    advice: document.querySelector('#advice'),
  };
};

const getAdvice = async () => {
  try {
    const adviceRequest = await fetch('https://api.adviceslip.com/advice');
    const advice = await adviceRequest.json();
    return advice;
  } catch (e) {
    console.error(e);
  }
};

const displayAdvice = () => {
  advice = getAdvice();
  const elements = getElements();
  elements.advice.innerText = advice.slip.advice;
  elements.adviceNum.innerText = `Advice #${advice.slip.id}`;
};

const addListeners = () => {
  elements.adviceButton.addEventListener('click', displayAdvice);
};

// add event listeners
addListeners();
