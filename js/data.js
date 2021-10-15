import {getRandomIntegerFrom, getRandomFloat, getRandomIntegerPositive, getNewArray} from './util.js';

const TITLES = [
  'Просторные апартаменты с видом на море',
  'Уютный дом на берегу озера',
  'Роскошный дворец для настоящих аристократов',
  'Неприступная крепость для ценителей комфорта и безопасности',
  'Корабль переоборудованный в домик на воде',
  'Новый дом в стиле модерн',
  'Вилла "Корбо Вьянко"',
  'Скромный охотничий домик',
  'Стеклянное иглу в лесу',
  'Апартаметы в бывшем особняке графа Скриптовского',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Светлая квартира в скандинавском стиле',
  'Тихий внутренний двор, без машин, с детской площадкой и беседками',
  'Апартаменты в самом центре города, в шаговой доступности музеи и памятники архитектуры',
  'Панорамный вид на море, солнечная сторона',
  'Спокойное место для работы или отдыха. Рядом лес с эко - тропами для бега или велосипедной езды  ',
  'Рядом кинотеатр, выставочный зал, сразу за углом уютная пекарня',
  'Пару минут вниз по ступенькам и Вы на золотом пляже',
  'Безопасный район с велодорожками и мини - стадионом, охрана на въезде во двор, отапливаемая парковка',
  'Райское место для отдыха вдвоём',
  'Старинный деревянный коттедж с уютной спальней, финской сауной и грилем во дворе. Дополнительно есть возможность арендовать лодку с мотором.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const PRICE_RANGE = 100000;
const ROOMS_RANGE = 20;
const GUESTS_RANGE = 50;

const ANNOUNCEMENT_COUNT = 10;

const createAnnouncement = (value, index) => {
  // переменные для оффера...
  const randomIndexTitle = getRandomIntegerFrom (0, TITLES.length -1);
  const randomIndexType = getRandomIntegerFrom (0, TYPES.length - 1);
  const randomIndexCheckin = getRandomIntegerFrom (0, CHECKIN_HOURS.length - 1);
  const randomIndexCheckout = getRandomIntegerFrom (0, CHECKOUT_HOURS.length - 1);
  const randomIndexDescription = getRandomIntegerFrom (0, DESCRIPTIONS.length - 1);
  // ...и локации
  const lat = getRandomFloat(LAT_MIN, LAT_MAX, 5);
  const lng = getRandomFloat(LNG_MIN, LNG_MAX, 5);

  return {
    author: {
      avatar: `img/avatars/user${String(++index).padStart(2, '0')}.png`,
    },

    offer: {
      title: TITLES[randomIndexTitle],
      address: `${lat}, ${lng}`,
      price: getRandomIntegerPositive(PRICE_RANGE),
      type: TYPES[randomIndexType],
      rooms: getRandomIntegerPositive(ROOMS_RANGE),
      guests: getRandomIntegerPositive(GUESTS_RANGE),
      checkin: CHECKIN_HOURS[randomIndexCheckin],
      checkout: CHECKOUT_HOURS[randomIndexCheckout],
      features: getNewArray (FEATURES),
      description: DESCRIPTIONS[randomIndexDescription],
      photos: getNewArray(PHOTOS),
    },

    location: {
      lat: lat,
      lng: lng,
    },
  };
} ;

export {createAnnouncement, ANNOUNCEMENT_COUNT};
