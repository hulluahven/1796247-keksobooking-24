const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const announcementTitleInput = document.querySelector('#title');
const announcementPriceInput = document.querySelector('#price');
const numberOfRooms = document.querySelector('#room_number');
const roomsСapacity = document.querySelector('#capacity');
const announcementForm = document.querySelector('.ad-form');

//1- проверка валидности заголовка
announcementTitleInput.addEventListener('input', () => {
  const titleLength = announcementTitleInput.value.length;

  if(titleLength < MIN_TITLE_LENGTH) {
    announcementTitleInput.setCustomValidity(`Необходимо ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
    announcementTitleInput.style = 'border: 2px solid red';
  }
  else if(titleLength > MAX_TITLE_LENGTH) {
    announcementTitleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
    announcementTitleInput.style = 'border: 2px solid red';
  }
  else {
    announcementTitleInput.setCustomValidity('');

  }
  announcementTitleInput.reportValidity();
});

//2- проверка валидности цены
announcementPriceInput.addEventListener('input', () => {
  const priceInput = announcementPriceInput.value;
  if(priceInput > MAX_PRICE){
    announcementPriceInput.setCustomValidity(`Макс. допустимая цена: ${MAX_PRICE} /ночь`);
    announcementPriceInput.style = 'border: 2px solid red';
  }
  else {
    announcementPriceInput.setCustomValidity('');
    announcementPriceInput.style = '';
  }
  announcementPriceInput.reportValidity();
});

// 3 синхронизация и проверка соотношения кол-ва гостей и комнат
const onAmountFieldChange = () => {
  const roomsAmount = numberOfRooms.value;
  const capacityAmount = roomsСapacity.value;
  roomsСapacity.style = 'border: 2px solid red';
  if(roomsAmount < capacityAmount) {
    roomsСapacity.setCustomValidity('Нельзя установить кол-во гостей больше кол-ва комнат(мест)');

  }
  else if(roomsAmount === 100 && capacityAmount !== 0) {
    roomsСapacity.setCustomValidity('Параметры указаны некорректно, доступен только вариант: "не для гостей"');
  }
  else if(roomsAmount !== 100 && capacityAmount === 0) {
    roomsСapacity.setCustomValidity('Данный вариант доступен только при выборе "100 комнат(отель)"');
  }
  else {
    roomsСapacity.setCustomValidity('');
    roomsСapacity.style = '';
  }
  roomsСapacity.reportValidity();
};

numberOfRooms.addEventListener('change',onAmountFieldChange);
roomsСapacity.addEventListener('change',onAmountFieldChange);

announcementForm.addEventListener('submit', (evt) => {
  evt.PreventDefault();
  if(!roomsСapacity.checkValidity()) {
    roomsСapacity.style = 'border: 2px solid red';
  }
});
