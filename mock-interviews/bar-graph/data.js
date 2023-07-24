const backendData = [
  {
    id: '1',
    name: 'January',
    value: 100,
  },
  {
    id: '2',
    name: 'February',
    value: 200,
  },
  {
    id: '3',
    name: 'March',
    value: 300,
  },
  {
    id: '4',
    name: 'April',
    value: 150,
  },
  {
    id: '5',
    name: 'May',
    value: 170,
  },
  {
    id: '6',
    name: 'June',
    value: 250,
  },
  {
    id: '7',
    name: 'July',
    value: 300,
  },
  {
    id: '8',
    name: 'August',
    value: 220,
  },
  {
    id: '9',
    name: 'September',
    value: 200,
  },
  {
    id: '10',
    name: 'October',
    value: 300,
  },
  {
    id: '11',
    name: 'November',
    value: 250,
  },
  {
    id: '12',
    name: 'December',
    value: 280,
  },
];

export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(resolve, 100, backendData);
  });
}
