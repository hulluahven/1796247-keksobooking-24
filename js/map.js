import{getFormInactive, getFormActive, announcementForm} from './form.js';
import{getAnnouncementCard} from './cards.js';

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

// событие на перемещение маркера
customMarker.on('move', (evt) => {
  const announcementAddress = evt.target.getLatLng();
  addressField.setAttribute('value', `${announcementAddress.lat.toFixed(5)}, ${announcementAddress.lng.toFixed(5)}`);
});

// функция для создания маркеров
const createMarker = (announcements) => {
  announcements.forEach((announcement) => {
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
      .addTo(map)
      .bindPopup(getAnnouncementCard(announcement));
  });
};

// возвратить в исходное состояние

const returnMapInitial = () => {
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

