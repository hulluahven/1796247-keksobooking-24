import{getFormInactive, getFormActive, announcementForm} from './form.js';
import{getAnnouncementCard} from './cards.js';
import {getData} from './api.js';
import {getFileteredFields, filterForm} from './filter.js';
import {debounce} from './utils/debounce.js';

const addressField = document.querySelector('#address');
const OFFERS_COUNT = 10;
const VIEW = 10;
const RERENDER_DELAY = 500;
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
  .on('load',() => {
    addressField.setAttribute('value', `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`);
  })
  .setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  },VIEW);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon(CUSTOM_ICON_DATA);

const customMarker = L.marker({
  lat: TOKYO_CENTER_LAT,
  lng: TOKYO_CENTER_LNG,
},
{
  draggable: true,
  icon: mainPinIcon,
});

customMarker.addTo(map);

customMarker.on('move', (evt) => {
  const announcementAddress = evt.target.getLatLng();
  addressField.setAttribute('value', `${announcementAddress.lat.toFixed(5)}, ${announcementAddress.lng.toFixed(5)}`);
});

const markerGroup = L.layerGroup().addTo(map);

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
  newAnnouncements = announcements.slice();
  createMarker(newAnnouncements);
  getFormActive();
});

const setFilterClick = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};

setFilterClick(debounce(() => createMarker(newAnnouncements), RERENDER_DELAY));

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

const toReset = () => {
  const resetButton = announcementForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', returnMapInitial);
};

toReset();

export {createMarker ,returnMapInitial, toReset};

