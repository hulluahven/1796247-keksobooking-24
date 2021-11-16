const announcementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const getNecessaryFeatures = (announcementElement, offer) => {
  const featuresContainer = announcementElement.querySelector('.popup__features');
  const featuresListFragment = document.createDocumentFragment();
  const offerFeatures = offer.features;
  if (!offerFeatures) {
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

const getNecessaryPhotos = (announcementElement, offer) => {
  const offerPhotos = offer.photos;
  if (!offerPhotos) {
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

const checkAnnouncementDescription = (announcementElement, offer) => {
  if (!offer.description) {
    announcementElement.querySelector('.popup__description').style = 'display:none';
    return;
  }
  announcementElement.querySelector('.popup__description').textContent = offer.description;
};

const announcementListFragment = document.createDocumentFragment();
const getAnnouncementCard = ({offer, author}) => {
  const announcementElement = announcementTemplate.cloneNode(true);
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
  return announcementElement;
};

export{getAnnouncementCard};

