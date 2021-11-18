const DEFAULT_VALUE = 'any';

const filterForm = document.querySelector('.map__filters');
const housingTypeInput = filterForm.querySelector('[name = "housing-type"]');
const housingPriceInput = filterForm.querySelector('[name = "housing-price"]');
const housingRoomsInput = filterForm.querySelector('[name = "housing-rooms"]');
const housingGuestsInput = filterForm.querySelector('[name = "housing-guests"]');

const AnnouncementPrices = {
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

const filterOutHousingType = ({offer}) => housingTypeInput.value === DEFAULT_VALUE
 || offer.type === housingTypeInput.value;
const filterOutGuestsType = ({offer}) => housingGuestsInput.value === DEFAULT_VALUE
 || offer.guests.toString() === housingGuestsInput.value;
const filterOutRoomsType = ({offer}) => housingRoomsInput.value === DEFAULT_VALUE
 || offer.rooms.toString() === housingRoomsInput.value;
const filterOutPriceOffers = ({offer}) => housingPriceInput.value === DEFAULT_VALUE
 || offer.price >= AnnouncementPrices [housingPriceInput.value].min && offer.price < AnnouncementPrices [housingPriceInput.value].max;
const filterOutFeaturesOffers = ({offer}) => {
  const userCheckedFeatures = filterForm.querySelectorAll('[name="features"]:checked');
  const userCheckedArray = Array.from(userCheckedFeatures, (input) => input.value);
  if (typeof offer.features === 'undefined' && userCheckedArray.length > 0) {
    return false;
  }
  return userCheckedArray.every((index) => offer.features.includes(index));
};

const getFileteredFields = ({offer}) => filterOutHousingType({offer})
&& filterOutGuestsType({offer})
&& filterOutRoomsType({offer})
&& filterOutPriceOffers({offer})
&& filterOutFeaturesOffers({offer});


export {getFileteredFields, filterForm};
