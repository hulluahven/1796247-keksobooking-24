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

const getRandomIntegerPositive = (value) => {
  const random = Math.random() * value;
  return Math.floor(random);
};

// доп функция для получения целого + числа

const getNewArray = (value) => {
  const newArray = [];
  const maxLength = value.length;
  const lengthOfArray = getRandomIntegerFrom(1, maxLength);
  for(let id = 0; id < lengthOfArray; id++) {
    const newIndex = getRandomIntegerFrom(0, maxLength - 1);
    const arrayElement = value[newIndex];
    if (!newArray.includes(arrayElement)) {
      newArray.push(arrayElement);
    }
  }
  return newArray;
};

// функция для сбора массива произвольной длины.

export {getRandomIntegerFrom, getRandomFloat, getRandomIntegerPositive, getNewArray};
