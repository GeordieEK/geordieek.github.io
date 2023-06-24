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

const displayAdvice = (advice, elements) => {
  elements.advice.innerText = advice.slip.advice;
  elements.adviceNum.innerText = `Advice #${advice.slip.id}`;
};

const handleAdviceButtonClick = async (elements) => {
  const advice = await getAdvice();
  displayAdvice(advice, elements);
};

const addListeners = () => {
  const elements = getElements();
  elements.adviceButton.addEventListener('click', () =>
    handleAdviceButtonClick(elements)
  );
};

// add event listeners
addListeners();
