import { fetchData } from './data.js';

const requestData = async () => {
  try {
    const response = await fetchData();
    if (!response.ok) console.error(response);
    return response;
  } catch (error) {
    throw new Error('Request failed', { cause: error });
  }
};

function getRandomColorHex() {
  var hex = '0123456789ABCDEF',
    color = '#';
  for (var i = 1; i <= 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

const generateGraph = (
  graphContainer,
  labelContainer,
  yAxisContainer,
  data,
  maxValue
) => {
  const containerWidth = getComputedStyle(graphContainer).width;
  const dataLength = data.length;
  data.forEach((month) => {
    // Create a div
    const graphBar = document.createElement('div');
    // Generate a random background colour
    const randomColor = getRandomColorHex;
    graphBar.style.backgroundColor = `#${randomColor}`;
    // Height to be percentage of value / maxvalue
    graphBar.style.height = `${(month.value / maxValue) * 100}%`;
    // Width to be width of container / data.length
    graphBar.style.width = `${parseInt(containerWidth) / dataLength}px`;
    graphBar.id = month.id;
    // Give it a label
    const barLabel = document.createElement('div');
    barLabel.style.width = `${parseInt(containerWidth) / dataLength}px`;
    barLabel.innerText = month.name;
    // Add y-axis numbers
    const yAxisLabel = document.createElement('div');
    yAxisLabel.innerText = month.value;
    yAxisLabel.style.position = 'absolute';
    yAxisLabel.style.top = `${100 - (month.value / maxValue) * 100}%`;
    graphContainer.append(graphBar);
    labelContainer.append(barLabel);
    yAxisContainer.append(yAxisLabel);
  });
};

const barGraph = async (graphContainer, labelContainer, yAxisContainer) => {
  const data = await requestData();
  // Get largest number from graph (highest bar - 100%)
  const numValues = data.map((months) => months.value);
  const maxValue = Math.max(...numValues);
  generateGraph(graphContainer, labelContainer, yAxisContainer, data, maxValue);
};

const graphContainer = document.querySelector('#graph-container');
const labelContainer = document.querySelector('#label-container');
const yAxisContainer = document.querySelector('#yaxis-container');

barGraph(graphContainer, labelContainer, yAxisContainer);

//TODO:
// Flexbox and positioning (absolute & relative)
// Stay calm, don't spiral and make small mistakes
// Don't get caught up trying to do something right
