// Select next input on number input
// When input not a number, (eg. alpha) input value is 0
// Converting time to string eg. [1, 5] to 01:05

const inputToSeconds = (input) => {
  while (input.length < 4) {
    input.shift(0);
  }
  //In: [10m, 1m, 10s, 1s]
  return input[0] * 600 + input[1] * 60 + input[2] * 10 + input[3];
};

const secondsToOutput = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // convert mins and secs into HH and MM format
  return [
    Math.floor(mins / 10), // tens minutes
    mins % 10, // ones minutes
    Math.floor(secs / 10), // tens seconds
    secs % 10, // ones seconds
  ];
};

const displayTime = (output, time) => {
  // Display time output
  output.forEach((node, index) => {
    node.value = time[index];
  });
};

// Returns time it was started
const startTimer = (numberContainer) => {
  const inputNodes = Array.from(numberContainer.querySelectorAll('input'));
  for (let input of inputNodes) {
    input.readonly = 'true'; //TODO: Does this stop JS too?
  }
  inputValues = inputNodes.map((input) => parseInt(input.value));
  let time = inputToSeconds(inputValues);
  // Keep seconds
  // SetInterval 1000
  const intervalId = setInterval(() => {
    const outputTime = secondsToOutput(time);
    displayTime(inputNodes, outputTime);
    // Reduce time by one second
    time -= 1;
  }, 1000);
  return intervalId;
};

//FIXME: Reset
//TODO: Stop button
const handleButtonClick = (event, timerContainer) => {
  let intervalId;
  if (event.target.matches('#start-button')) {
    intervalId = startTimer(timerContainer);
  } else if (event.target.matches('#reset-button')) {
    const inputNodes = Array.from(timerContainer.querySelectorAll('input'));
    console.log(intervalId);
    displayTime(inputNodes, [0, 0, 0, 0]);
    clearInterval(intervalId);
  } else if (event.target.matches('#stop-button')) {
    startTimer(timerContainer);
  }
};

const createCountdownTimer = (timer) => {
  const defaultTime = 65; // Default time in seconds
  timer.addEventListener('click', (event) => handleButtonClick(event, timer));
};

console.log(inputToSeconds([1, 1, 1, 1]));
console.log(secondsToOutput(671));

// event listeners:
// StartTimer - Stop inputs from being editable (readonly)
// , save time somewhere and start countdown (setInterval)
// stopTimer - stop time counting down
// resetTimer - reset timer to value saved by startTimer
const timer = document.querySelector('#main-container');
createCountdownTimer(timer);

//Takeaways:
// LISTEN TO INTERVIEWER - TAKE THEIR ADVICE
// Keep nerves down
