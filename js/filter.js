const filterForm = document.querySelector('.map__filters');
const housingTypeInput = filterForm.querySelector('[name = "housing-type"]');
const housingPriceInput = filterForm.querySelector('[name = "housing-price"]');
const housingRoomsInput = filterForm.querySelector('[name = "housing-rooms"]');
const housingGuestsInput = filterForm.querySelector('[name = "housing-guests"]');

const DEFAULT_VALUE = 'any';

const announcementPrice = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 1000000,
  },
};

// Фильтрация выпадашек и удобств

const filterHousingType = ({offer}) => housingTypeInput.value === DEFAULT_VALUE
 || offer.type === housingTypeInput.value;
const filterGuestsType = ({offer}) => housingGuestsInput.value === DEFAULT_VALUE
 || offer.guests.toString() === housingGuestsInput.value;
const filterRoomsType = ({offer}) => housingRoomsInput.value === DEFAULT_VALUE
 || offer.rooms.toString() === housingRoomsInput.value;
const comparesPriceOffers = ({offer}) => housingPriceInput.value === DEFAULT_VALUE
 || offer.price >= announcementPrice [housingPriceInput.value].min && offer.price < announcementPrice [housingPriceInput.value].max;
const comparesFeaturesOffers = ({offer}) => {
  const userCheckedFeatures = filterForm.querySelectorAll('[name="features"]:checked');
  const userCheckedArray = Array.from(userCheckedFeatures, (input) => input.value);
  if (!offer.features) {
    return false;
  }
  return userCheckedArray.every((index) => offer.features.includes(index));
};


const getFileteredFields = ({offer}) => filterHousingType({offer})
&& filterGuestsType({offer})
&& filterRoomsType({offer})
&& comparesPriceOffers({offer})
&& comparesFeaturesOffers({offer});


export {getFileteredFields, filterForm};
