import {getRandomIntegerFrom, getRandomFloat, getRandomIntegerPositive, getNewArray} from './util.js';
import {TITLES, TYPES, CHECKIN_HOURS, CHECKOUT_HOURS, FEATURES, DESCRIPTIONS, PHOTOS, LAT_MIN, LAT_MAX, LNG_MIN, LNG_MAX, PRICE_RANGE, ROOMS_RANGE, GUESTS_RANGE} from './constants.js';

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

export {createAnnouncement};
