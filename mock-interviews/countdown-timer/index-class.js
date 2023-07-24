// Helper functions for time conversion
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

class Timer {
  constructor(containerNode) {
    this.intervalId = null;
    this.ioNodes = Array.from(containerNode.querySelectorAll('input'));
  }

  start() {
    const inputValues = this.ioNodes.map((input) => parseInt(input.value));
    let time = inputToSeconds(inputValues);
    this.intervalId = setInterval(() => {
      const outputTime = secondsToOutput(time);
      displayTime(this.ioNodes, outputTime);
      time -= 1;
    }, 1000);
  }

  reset() {
    const inputNodes = Array.from(this.containerNode.querySelectorAll('input'));
    displayTime(inputNodes, [0, 0, 0, 0]);
    clearInterval(this.intervalId);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  updateDisplay() {
    this.ioNodes.forEach((node, index) => (node.value = time[index]));
  }
}

const containerNode = document.querySelector('#main-container');
const timer = new Timer(containerNode);
