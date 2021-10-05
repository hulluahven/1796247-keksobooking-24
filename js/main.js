// источник для примера: (https://learn.javascript.ru/number#sluchaynoe-tseloe-chislo-ot-min-do-max)
const getRandomIntegerFrom = function(min, max) {
  const random = min + Math.random() * (max + 1 - min);
  if (min < 0 || min >= max) {
    return false;
  }

  return Math.floor(random);

};

// случайное целое число из переданного диапазона включительно

getRandomIntegerFrom(0, 10);

const getRandomFloat = function(min, max, amountOfNumbers) {
  const random = min + Math.random() * (max + 1 - min);
  if (min < 0 || min >= max) {
    return false;
  }

  return random.toFixed(amountOfNumbers);

};

// случайное число с плавающей точкой из переданного диапазона включительно

getRandomFloat(0, 10, 4);
