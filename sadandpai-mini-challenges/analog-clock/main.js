const clock = document.querySelector('#clock');
const numContainer = document.querySelector('#number-container');
const secHand = document.querySelector('#second-hand');
const minHand = document.querySelector('#minute-hand');
const hourHand = document.querySelector('#hour-hand');
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const populateNumbers = (container, numbers) => {
  let rotation = 0;
  numbers.forEach((num) => {
    const newDiv = document.createElement('div');
    const newSpan = document.createElement('span');
    newSpan.textContent = num;
    newDiv.append(newSpan);
    newDiv.classList.add('number');
    newSpan.classList.add('number-text');
    rotation += 30;
    newDiv.style.transform = `rotate(${rotation}deg)`;
    newSpan.style.transform = `rotate(-${rotation}deg)`;
    container.append(newDiv);
  });
};

const setClockHands = (secHand, minHand, hourHand) => {
  const date = new Date();
  console.log(date.getHours());
  secHand.style.transform = `rotate(${(date.getSeconds() / 60) * 360 - 90}deg)`;
  minHand.style.transform = `rotate(${(date.getMinutes() / 60) * 360 - 90}deg)`;
  // -150 on hourHand is to set timezone to AEST
  hourHand.style.transform = `rotate(${(date.getHours() / 24) * 360 - 150}deg)`;
};

populateNumbers(clock, numbers);
setInterval(setClockHands, 1000, secHand, minHand, hourHand);
