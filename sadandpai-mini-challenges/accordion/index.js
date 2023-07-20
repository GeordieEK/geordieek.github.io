import { fetchData } from './data.js';

const requestData = async () => {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Data request failed');
  }
};

const makeAccordionNode = (data) => {
  //Note: Details element could be replaced if more specific toggle functionality required
  const accordionFragment = document.createDocumentFragment();
  for (const item of data) {
    const detailsNode = document.createElement('details');
    const summNode = document.createElement('summary');
    summNode.innerText = `Event ${item.id}`;
    detailsNode.innerText = item.name;
    detailsNode.id = `event-${item.id}`;
    detailsNode.classList.add('accordion-item');
    detailsNode.appendChild(summNode);
    accordionFragment.appendChild(detailsNode);
  }
  return accordionFragment;
};

const handleAccordionClick = (event, accordionItems) => {
  console.log(event.target);
  for (const item of accordionItems) {
    if (item.id !== event.target.id) {
      item.open = false;
    }
  }
};

const createAccordion = (data, container) => {
  const accordion = makeAccordionNode(data);
  container.append(accordion);
  const accordionItems = Array.from(container.children);
  container.addEventListener('click', (e) => {
    handleAccordionClick(e, accordionItems);
  });
};

const main = async () => {
  const data = await requestData();
  const container = document.querySelector('#accordion-container');
  createAccordion(data, container);
};

main();
