import {enableState} from './state.js';


const address = document.querySelector('#address');
const startCoordinates = {
  lat: 35.68948,
  lng: 139.69170,
};

export const loadMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      enableState();
      address.value = `${Object.values(startCoordinates)[0].toFixed(5)}, ${Object.values(startCoordinates)[1].toFixed(5)}`;
    }).setView({
      lat: 35.68948,
      lng: 139.69170,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon ({
    iconUrl: '../../img/avatars/main-pin.svg',
    iconSize: [52,52],
    iconAnchor: [26,52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.68948,
      lng: 139.69170,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    address.value = `${Object.values(evt.target.getLatLng())[0].toFixed(5)}, ${Object.values(evt.target.getLatLng())[1].toFixed(5)}`;
  });
};