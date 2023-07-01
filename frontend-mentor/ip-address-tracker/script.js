const getNodes = () => {
  return {
    ipInput: document.querySelector('#ipInput'),
    submitBtn: document.querySelector('#submitBtn'),
    mapNode: '', //TODO: get map node (where map will go)
  };
};

const displayIpInfo = (ipInfo, nodes) => {
  document.querySelector('#displayIp').innerText = ipInfo.ip;
  document.querySelector(
    '#displayLocation'
  ).innerText = `${ipInfo.location.country}, ${ipInfo.location.city}`;
  document.querySelector('#displayTimezone').innerText =
    ipInfo.location.timezone;
  document.querySelector('#displayIsp').innerText = ipInfo.isp;
};

const getIpInfo = async ({ ipInput }) => {
  const ipRequest = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_l6DfFCQetrpqArvTlJBnIXIqtz8ed&ipAddress=${ipInput.value}`
  );
  if (!ipRequest.ok) {
    throw new Error('geoipify call failed');
    //TODO: Display error to user
  }
  return await ipRequest.json();
};

const createMap = () => {
  const map = L.map('map').setView([51.5, -0.09], 13);

  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  let marker = L.marker([51.5, -0.09]).addTo(map);

  return {
    getMap() {
      return map;
    },
    updateMap(latLng) {
      map.setView(latLng);
      marker = L.marker(latLng).addTo(map);
    },
  };
};

const handleIpSubmit = async (nodes) => {
  try {
    const ipInfo = await getIpInfo(nodes);
    console.log(ipInfo);
    displayIpInfo(ipInfo, nodes);
    const latLng = [ipInfo.location.lat, ipInfo.location.lng];
    map.updateMap(latLng);
  } catch (e) {
    console.error(e);
  }
};

const addListeners = (nodes, map) => {
  nodes.submitBtn.addEventListener('click', () => handleIpSubmit(nodes, map));
};

const nodes = getNodes();
// Leaflet JS
const map = createMap();

addListeners(nodes);
