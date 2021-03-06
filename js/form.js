import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage, closeMessage} from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const NOT_FOR_GUESTS = 0;
const HOTEL_ROOMS = 100;

const announcementTitleInput = document.querySelector('#title');
const announcementPriceInput = document.querySelector('#price');
const numberOfRooms = document.querySelector('#room_number');
const roomsСapacity = document.querySelector('#capacity');
const announcementForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formFieldsets = announcementForm.querySelectorAll('fieldset');
const houseType = announcementForm.querySelector('#type');
const timeIn = announcementForm.querySelector('#timein');
const timeOut = announcementForm.querySelector('#timeout');

const getFormInactive = () => {
  announcementForm.classList.add('ad-form--disabled');
  formFieldsets.forEach((formFieldset) => {
    formFieldset.setAttribute('disabled','disabled');
  });
  mapFilters.classList.add('map__filters--disabled');
  mapFilters.setAttribute('disabled','disabled');
};

const getFormActive = () => {
  announcementForm.classList.remove('ad-form--disabled');
  formFieldsets.forEach((formFieldset) => {
    formFieldset.removeAttribute('disabled');
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.removeAttribute('disabled');
};

announcementTitleInput.addEventListener('input', () => {
  const titleLength = announcementTitleInput.value.length;

  announcementTitleInput.setCustomValidity('');

  if(titleLength < MIN_TITLE_LENGTH) {
    announcementTitleInput.setCustomValidity(`Необходимо ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
    announcementTitleInput.style = 'outline: 2px solid red';
  }

  if (titleLength > MAX_TITLE_LENGTH) {
    announcementTitleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
    announcementTitleInput.style = 'outline: 2px solid red';
  }

  announcementTitleInput.reportValidity();
});

announcementPriceInput.addEventListener('input', () => {
  const priceInput = announcementPriceInput.value;

  announcementPriceInput.setCustomValidity('');
  announcementPriceInput.style = '';

  if (priceInput < announcementPriceInput.min) {
    announcementPriceInput.setCustomValidity('Нельзя указать цену ниже рекомендуемого значения');
    announcementPriceInput.style = 'outline: 2px solid red';
  }

  if(priceInput > MAX_PRICE){
    announcementPriceInput.setCustomValidity(`Макс. допустимая цена: ${MAX_PRICE} /ночь`);
    announcementPriceInput.style = 'outline: 2px solid red';
  }

  announcementPriceInput.reportValidity();
});

const checkAmountFieldChange = () => {
  const roomsAmount = Number(numberOfRooms.value);
  const capacityAmount = Number(roomsСapacity.value);

  roomsСapacity.setCustomValidity('');
  roomsСapacity.style = '';

  if(roomsAmount < capacityAmount) {
    roomsСapacity.setCustomValidity('Нельзя установить кол-во гостей больше кол-ва комнат');
    roomsСapacity.style = 'outline: 2px solid red';
  }

  if(roomsAmount === HOTEL_ROOMS && capacityAmount !== NOT_FOR_GUESTS ) {
    roomsСapacity.setCustomValidity('Параметры указаны некорректно, доступен только вариант: "не для гостей"');
    roomsСapacity.style = 'outline: 2px solid red';
  }

  if(roomsAmount !== HOTEL_ROOMS && capacityAmount === NOT_FOR_GUESTS ) {
    roomsСapacity.setCustomValidity('Данный вариант доступен только при выборе "100 комнат(отель)"');
    roomsСapacity.style = 'outline: 2px solid red';
  }

  roomsСapacity.reportValidity();
};

numberOfRooms.addEventListener('change',checkAmountFieldChange);
roomsСapacity.addEventListener('change',checkAmountFieldChange);

const synchronizeHouseAndPriceType = () => {
  const houseTypePrices = {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  };

  houseType.addEventListener('change', () => {
    announcementPriceInput.placeholder = houseTypePrices[houseType.value];
    announcementPriceInput.min = houseTypePrices[houseType.value];
  });
};

synchronizeHouseAndPriceType();

const synchronizeInOutTime = () => {
  timeIn.addEventListener('change', () => {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', () => {
    timeIn.value = timeOut.value;
  });

};

synchronizeInOutTime();

const setUserFormSubmit = (returnMapInitial) => {
  announcementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(!roomsСapacity.checkValidity()) {
      roomsСapacity.style = 'outline: 2px solid red';
    }
    sendData(
      () => {
        showSuccessMessage();
        evt.target.reset();
        returnMapInitial();
        closeMessage(document.querySelector('.success'));
      },
      () => {
        showErrorMessage();
        closeMessage(document.querySelector('.error'));
      },
      new FormData(evt.target),
    );
  });
};

export{getFormInactive, getFormActive, announcementForm, setUserFormSubmit};
