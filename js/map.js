import{getFormInactive, getFormActive, announcementForm} from './form.js';
import{getAnnouncementCard} from './cards.js';
import {getData} from './api.js';
import {getFileteredFields, filterForm} from './filter.js';
import {debounce} from './utils/debounce.js';

const addressField = document.querySelector('#address');
const OFFERS_COUNT = 10;
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

const RERENDER_DELAY = 500;

getFormInactive();

const map = L.map('map-canvas')
  .on('load',() => {
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

// событие на перемещение маркера
customMarker.on('move', (evt) => {
  const announcementAddress = evt.target.getLatLng();
  addressField.setAttribute('value', `${announcementAddress.lat.toFixed(5)}, ${announcementAddress.lng.toFixed(5)}`);
});

// создать метки в слое, а не на карте, для очистки отрисовки похожих
const markerGroup = L.layerGroup().addTo(map);

// функция для создания маркеров

const createMarker = (announcements) => {
  markerGroup.clearLayers();
  announcements.filter(getFileteredFields)
    .slice(0, OFFERS_COUNT)
    .forEach((announcement) => {
      const {lat, lng} = announcement.location;
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
        .addTo(markerGroup)
        .bindPopup(getAnnouncementCard(announcement));
    });
};


let newAnnouncements = [];

getData((announcements) => {
  // скопировать массив и работать над копией
  newAnnouncements = announcements.slice();
  createMarker(newAnnouncements);
  getFormActive();
});


// сеттер для коллбека

const setFilterClick = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};

setFilterClick(debounce(() => createMarker(newAnnouncements), RERENDER_DELAY));

// возвратить в исходное состояние

const returnMapInitial = () => {
  createMarker(newAnnouncements);
  map.setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  }, 10);

  customMarker.setLatLng({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  });

  map.closePopup();
  addressField.setAttribute('value', `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`);
};

// при клике на кнопку очистить карту вернуть в исходное

const toReset = () => {
  const resetButton = announcementForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', returnMapInitial);
};

toReset();

export {createMarker ,returnMapInitial, toReset};

