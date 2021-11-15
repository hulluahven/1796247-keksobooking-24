
const filterForm = document.querySelector('.map__filters');
const housingTypeInput = filterForm.querySelector('[name = "housing-type"]');
const housingPriceInput = filterForm.querySelector('[name = "housing-price"]');
const housingRoomsInput = filterForm.querySelector('[name = "housing-rooms"]');
const housingGuestsInput = filterForm.querySelector('[name = "housing-guests"]');

const houseFeatures = filterForm.querySelector('#housing-features');
const featureWifi = houseFeatures.querySelector('#filter-wifi');
const featureDishwasher = houseFeatures.querySelector('#filter-dishwasher');
const featureParking = houseFeatures.querySelector('#filter-parking');
const featureWasher = houseFeatures.querySelector('#filter-washer');
const featureElevator = houseFeatures.querySelector('#filter-elevator');
const featureConditioner = houseFeatures.querySelector('#filter-conditioner');

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

// Дать рейтинг удобствам по одному баллу на каждое выбранное

const getFeaturesRank = ({offer}) => {

  let rank = 0;

  if (offer.features > 0) {
    if (offer.features.includes('wifi')) {
      rank += 1;
    }
    if (offer.features.includes('dishwasher')) {
      rank += 1;
    }
    if (offer.features.includes('parking')) {
      rank += 1;
    }
    if (offer.features.includes('washer')) {
      rank += 1;
    }
    if (offer.features.includes('elevator')) {
      rank += 1;
    }
    if (offer.features.includes('conditioner')) {
      rank += 1;
    }
  }
  return rank;
};

// Создаем фнкцию-компаратор для сравнения

const compareFeatures = (featureA, featureB) => {
  const rankA = getFeaturesRank(featureA);
  const rankB = getFeaturesRank(featureB);
  return rankB - rankA;
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

const wifiFilter = ({offer}) => (offer.features && featureWifi.checked && offer.features.includes('wifi')
|| !featureWifi.checked);
const dishwasherFilter = ({offer}) => (offer.features && featureDishwasher.checked && offer.features.includes('dishwasher')
|| !featureDishwasher.checked);
const parkingFilter = ({offer}) => (offer.features && featureParking.checked && offer.features.includes('parking')
|| !featureParking.checked);
const washerFilter = ({offer}) => (offer.features && featureWasher.checked && offer.features.includes('washer')
|| !featureWasher.checked);
const elevatorFilter = ({offer}) => (offer.features && featureElevator.checked && offer.features.includes('elevator')
|| !featureElevator.checked);
const conditionerFilter = ({offer}) => (offer.features && featureConditioner.checked && offer.features.includes('conditioner')
|| !featureConditioner.checked);


const getFileteredFields = ({offer}) => filterHousingType({offer})
&& filterGuestsType({offer})
&& filterRoomsType({offer})
&& comparesPriceOffers({offer})
&& wifiFilter({offer})
&& dishwasherFilter({offer})
&& parkingFilter({offer})
&& washerFilter({offer})
&& elevatorFilter({offer})
&& conditionerFilter({offer});


export {getFileteredFields, compareFeatures, filterForm};

