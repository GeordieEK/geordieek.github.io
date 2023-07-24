import { fetchData } from './data.js';

const requestData = async () => {
  try {
    return fetchData();
    // (!res.ok) extra error handling here
  } catch (error) {
    console.error(error);
  }
};

// TODO: Does this need to be its own function?
const filterData = (searchValue, data) => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

const populateDropdown = (data, container) => {
  // Create DOM Nodes for filtered data
  const dropdownNodes = data.map((item) => {
    const listEl = document.createElement('li');
    listEl.innerText = item.name;
    return listEl;
  });
  container.innerHTML = '';
  // Populate dropdown list with nodes
  container.append(...dropdownNodes);
};

const handleDropdown = (event, data, dropdownContents) => {
  const searchValue = event.target.value;
  // Filter data based on input value
  const filteredData = filterData(searchValue, data);
  populateDropdown(filteredData, dropdownContents);
};

// When input is focused, toggle dropdown
// TODO: Fetch data elsewhere?
const createDropdown = async (input, dropdownContents) => {
  const data = await requestData();
  populateDropdown(data, dropdownContents);
  // Get user input on 'keyup'
  input.addEventListener('keyup', (event) => {
    handleDropdown(event, data, dropdownContents);
  });
};

const input = document.querySelector('#filter-input');
const dropdownContents = document.querySelector('#dropdown-contents');
createDropdown(input, dropdownContents);

// Toggle hidden class ('show') when input.targeted === true;
// Hidden class could also rotate chevron
