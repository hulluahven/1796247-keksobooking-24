const AVATAR_NUMBERS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
];

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
  'Старинный деревянный коттедж с уютной спальней, финской сауной и грилем во дворе.  Дополнительно есть возможность арендовать лодку с мотором.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const ANNOUNCEMENT_COUNT = 10;

const getRandomIntegerFrom = (min, max) => {
  const random = min + Math.random() * (max + 1 - min);
  if (min < 0 || min >= max) {
    return false;
  }

  return Math.floor(random);

};

// случайное целое число из переданного диапазона включительно


const getRandomFloat = (min, max, amountOfNumbers) => {
  const random = min + Math.random() * (max + 1 - min);
  if (min < 0 || min >= max) {
    return false;
  }

  return random.toFixed(amountOfNumbers);

};

// случайное число с плавающей точкой из переданного диапазона включительно

// доп функция для получения целого + числа

const getRandomIntegerPositive = (value) => {
  const random = Math.random() * value;
  return Math.floor(random);
};

// функции для сбора массива произвольной длины. Преимущества и фото.

const getFeaturesArray = () => {
  const featuresArray = [];
  const maxLength = FEATURES.length;
  const lengthOfArray = getRandomIntegerFrom(1, maxLength);


  for(let id = 0; id < lengthOfArray; id++) {
    const featuresIndex = getRandomIntegerFrom(0, 5);
    const arrayElement = FEATURES[featuresIndex];

    if (!featuresArray.includes(arrayElement)) {
      featuresArray.push(arrayElement);
    }
  }
  return featuresArray.join(', ');

};


const getPhotosArray = () => {
  const photosArray = [];
  const maxLength = PHOTOS.length;
  const lengthOfArray = getRandomIntegerFrom(1, maxLength);


  for(let id = 0; id < lengthOfArray; id++) {
    const photosIndex = getRandomIntegerFrom(0, maxLength - 1);
    const arrayElement = PHOTOS[photosIndex];

    if (!photosArray.includes(arrayElement)) {
      photosArray.push(arrayElement);
    }
  }
  return photosArray.join(', ');
};

const createAnnouncement = () => {
  // переменные для автора
  const randomIndex = getRandomIntegerFrom (0, AVATAR_NUMBERS.length -1);
  const randomIntegerArray = AVATAR_NUMBERS[randomIndex];
  const result = AVATAR_NUMBERS.splice(randomIntegerArray, 1);
  // переменные для оффера...
  const randomIndexTitle = getRandomIntegerFrom (0, TITLES.length -1);
  const randomIndexType = getRandomIntegerFrom (0, TYPES.length - 1);
  const randomIndexCheckin = getRandomIntegerFrom (0, CHECKIN_HOURS.length - 1);
  const randomIndexCheckout = getRandomIntegerFrom (0, CHECKOUT_HOURS.length - 1);
  const randomIndexDescription = getRandomIntegerFrom (0, DESCRIPTIONS.length - 1);
  // ...и локации
  const lat = getRandomFloat(35.65000, 35.70000, 5);
  const lng = getRandomFloat(139.70000, 139.80000, 5);

  return {
    autor: {
      avatar: `img/avatars/user${result}.png`,
    },

    offer: {
      title: TITLES[randomIndexTitle],
      address: `${lat}, ${lng}`,
      price: getRandomIntegerPositive(100000),
      type: TYPES[randomIndexType],
      rooms: getRandomIntegerPositive(20),
      guests: getRandomIntegerPositive(50),
      checkin: CHECKIN_HOURS[randomIndexCheckin],
      checkout: CHECKOUT_HOURS[randomIndexCheckout],
      features: getFeaturesArray (FEATURES),
      description: DESCRIPTIONS[randomIndexDescription],
      photos: getPhotosArray(PHOTOS),
    },

    location: {
      lat: lat,
      lng: lng,
    },
  };
} ;

const announcementArray = Array.from({length:ANNOUNCEMENT_COUNT}, createAnnouncement);
announcementArray;
