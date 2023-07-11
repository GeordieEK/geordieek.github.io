import { fetchData } from './data.js';

// Page tree - recursive function to generate tree structure
// checking for children and appending them recursively
// TODO: EventDiv not great name (JS Events)
// Function that requests data from api
const getEventData = async () => {
  const eventData = await fetchData();
  return eventData;
};

const makeEventNode = (data) => {
  let eventNode;
  if (data.children) {
    eventNode = document.createElement('details');
    const eventNodeSummary = document.createElement('summary');
    eventNodeSummary.innerText = data.name;
    eventNode.appendChild(eventNodeSummary);
    const childEventNode = document.createElement('ul');
    childEventNode.classList.add('childNode');
    eventNode.appendChild(childEventNode);
  } else {
    eventNode = document.createElement('li');
    eventNode.innerText = data.name;
  }

  return eventNode;
};

// Get and display event data in tree format
const makeEventTree = (data, container) => {
  if (!data) return;
  data.forEach((calendarEvent) => {
    const newEventNode = makeEventNode(calendarEvent);
    if (calendarEvent.children) {
      makeEventTree(
        calendarEvent.children,
        newEventNode.querySelector('.childNode')
      );
    }
    container.append(newEventNode);
  });
};

// global objects
const treeContainer = document.querySelector('.treeContainer');

getEventData().then((data) => {
  makeEventTree(data, treeContainer);
});
