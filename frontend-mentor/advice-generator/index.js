const elements = {
    adviceButton : document.querySelector("#diceButton"),
    adviceNum : document.querySelector("#adviceNum"),
    advice : document.querySelector("#advice")
}

const getAdvice = async () => {
    try {
        const adviceRequest = await fetch("https://api.adviceslip.com/advice");
        const advice = await adviceRequest.json();
        console.log(advice);
        elements.advice.innerText = advice.slip.advice;
        elements.adviceNum.innerText = `Advice #${advice.slip.id}`;
    }
    catch (e) {
        console.error(e);
    }
}

const addListeners = () => {
    elements.adviceButton.addEventListener("click", getAdvice)
}

// add event listeners
addListeners();