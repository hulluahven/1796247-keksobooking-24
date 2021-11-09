// находим шаблон для копирования
const announcementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

// оставить пришедшие с сервера удобства
const getNecessaryFeatures = (announcementElement, offer) => {
  const featuresContainer = announcementElement.querySelector('.popup__features');
  const featuresListFragment = document.createDocumentFragment();
  const offerFeatures = offer.features;
  if (offerFeatures === undefined) {
    announcementElement.querySelector('.popup__photos').style.display = 'none';
    return;
  }
  offerFeatures.forEach((offerFeature) => {
    const featuresListItem = featuresContainer.querySelector(`.popup__feature--${offerFeature}`);
    if (featuresListItem) {
      featuresListFragment.append(featuresListItem);
    }
  });
  featuresContainer.innerHTML = '';
  featuresContainer.appendChild(featuresListFragment);
};

// получить все пришедшие фотографии жилья
const getNecessaryPhotos = (announcementElement, offer) => {
  const offerPhotos = offer.photos;
  if (offerPhotos === undefined) {
    announcementElement.querySelector('.popup__photos').style.display = 'none';
    return;
  }

  announcementElement.querySelector('.popup__photos').innerHTML = '';
  offerPhotos.forEach((offerPhoto) => {
    const photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = offerPhoto;
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt ='Фотография жилья';
    announcementElement.querySelector('.popup__photos').appendChild(photoItem);
  });
};

// вывести тип жилья на русском
const getNecessaryType = (announcementElement, offer) => {
  const type = offer.type;
  const offerType = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    home: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };
  const getType = (value) => offerType[value];

  announcementElement.querySelector('.popup__type').textContent = getType(type);
};


// Проверить поле с описанием на заполнение
const checkAnnouncementDescription = (announcementElement, offer) => {
  if (!offer.description) {
    announcementElement.querySelector('.popup__description').style = 'display:none';
    return;
  }
  announcementElement.querySelector('.popup__description').textContent = offer.description;
};

const announcementListFragment = document.createDocumentFragment();

// создаём карточку объявления
const getAnnouncementCard = ({offer, author}) => {
  const announcementElement = announcementTemplate.cloneNode(true);
  // клонируем шаблон и заполняем его
  announcementElement.querySelector('.popup__title').textContent = offer.title;
  announcementElement.querySelector('.popup__text--address').textContent = offer.address;
  announcementElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  announcementElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  announcementElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  announcementElement.querySelector('.popup__description').textContent = offer.description;
  announcementElement.querySelector('.popup__avatar').src = author.avatar;
  getNecessaryFeatures(announcementElement, offer);
  getNecessaryPhotos(announcementElement, offer);
  getNecessaryType( announcementElement, offer);
  checkAnnouncementDescription(announcementElement, offer);
  announcementListFragment.append(announcementElement);
  // удаляем отрисовку карточки на месте карты и возвращаем заполненный склонированный шаблон
  return announcementElement;
};

export{getAnnouncementCard};
