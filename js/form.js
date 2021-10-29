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

//1- проверка валидности заголовка

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

//2- проверка валидности цены
announcementPriceInput.addEventListener('input', () => {
  const priceInput = announcementPriceInput.value;

  announcementPriceInput.setCustomValidity('');
  announcementPriceInput.style = '';

  if(priceInput > MAX_PRICE){
    announcementPriceInput.setCustomValidity(`Макс. допустимая цена: ${MAX_PRICE} /ночь`);
    announcementPriceInput.style = 'outline: 2px solid red';
  }

  announcementPriceInput.reportValidity();
});

// 3 синхронизация и проверка соотношения кол-ва гостей и комнат
const onAmountFieldChange = () => {
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

numberOfRooms.addEventListener('change',onAmountFieldChange);
roomsСapacity.addEventListener('change',onAmountFieldChange);

announcementForm.addEventListener('submit', (evt) => {
  evt.PreventDefault();
  if(!roomsСapacity.checkValidity()) {
    roomsСapacity.style = 'outline: 2px solid red';
  }
});

