import { fetchData } from './data.js';

//TODO: Hide from global scope
const dropdownContainer = document.querySelector('#dropdownOptions');
const dropdownInput = document.querySelector('#dropdownInput');

async function getData() {
  try {
    const eventData = await fetchData();
    return eventData;
  } catch (e) {
    console.error(e);
    throw new Error('Api call fail');
  }
}

function makeDropdown(data, container) {
  container.textContent = '';
  data.forEach((eventObj) => {
    const newLi = document.createElement('li');
    newLi.innerText = eventObj.name;
    container.append(newLi);
  });
}

async function buildDropdownList() {
  const eventData = await getData();
  const eventsToDisplay = eventData.filter((eventObj) =>
    eventObj.name.toLowerCase().includes(dropdownInput.value)
  );
  makeDropdown(eventsToDisplay, dropdownContainer);
}

dropdownInput.addEventListener('input', buildDropdownList);
dropdownInput.addEventListener('focus', () => {
  dropdownContainer.classList.remove('hide');
});
dropdownInput.addEventListener('focusout', () => {
  dropdownContainer.classList.add('hide');
});

buildDropdownList();

/**
 * Extensions
 * 1. If you have nothing to display, display "No items found"
 * 2. Filtering is working, doesn't look like dropdown, make it toggle
 * 3. Debounce - Delay filter calls (setTimeout)
 * 4. Highlight text that you have typed (eg. 'Of' in 'Office')
 * 5. Write some tests
 * Learn
 * 1. Debugger in browser (don't use console.log())
 * 2. Practice resolving functions
 * 3. Practice separating concerns
 */
