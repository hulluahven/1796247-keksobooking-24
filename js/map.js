import{getFormInactive, getFormActive} from './form.js';
import{getAnnouncementCard, announcementArray} from './card-popup.js';
const addressField = document.querySelector('#address');
const TOKYO_CENTER_LAT = 35.67892;
const TOKYO_CENTER_LNG = 139.76844;
const CUSTOM_ICON_DATA = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const ANNOUNCEMENT_ICON_DATA = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

getFormInactive();

const map = L.map('map-canvas')
// добавляем активацию формы при загрузке
  .on('load',() => {
    getFormActive();
    addressField.setAttribute('value', `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`);
  })
  .setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  },10);

// добавляем слой с картой и копирайтом
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// создаём метку для кастомного маркера
const mainPinIcon = L.icon(CUSTOM_ICON_DATA);

// создаём объект-маркер с меткой, кот потом добавим на карту
const customMarker = L.marker({
  lat: TOKYO_CENTER_LAT,
  lng: TOKYO_CENTER_LNG,
},
{
  draggable: true,
  icon: mainPinIcon,
});

customMarker.addTo(map);

// событие на конец перемещения маркера
customMarker.on('move', (evt) => {
  const announcementAddress = evt.target.getLatLng();
  addressField.setAttribute('value', `${announcementAddress.lat.toFixed(5)}, ${announcementAddress.lng.toFixed(5)}`);
});

// функция для создания маркеров

const createMarker = () => {
  announcementArray.forEach((index) => {
    const {lat, lng} = index.location;
    const icon = L.icon(ANNOUNCEMENT_ICON_DATA);
    const announcementMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    announcementMarker
      .addTo(map)
      .bindPopup(getAnnouncementCard(index));
  });
};

announcementArray.forEach((index) => {
  createMarker(index);
});

