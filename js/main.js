const getRandomIntegerFrom = function(min, max) {
  let random = min + Math.random() * (max + 1 - min);
  if (min < 0) {
    return false;
  }

  if (min >= max) {
    alert('параметры указаны неверно!');
  }

  else {
    return Math.floor(random);
  }

}

// случайное целое число из переданного диапазона включительно

getRandomIntegerFrom(0, 10);

const getRandomFloat = function(min, max, amountOfNumbers) {
  let random = min + Math.random() * (max + 1 - min);
  if (min < 0) {
    return false;
  }

  if (min >= max) {
    alert('параметры указаны неверно!');
  }

  else {
    return random.toFixed(amountOfNumbers);
  }

}

// случайное число с плавающей точкой из переданного диапазона включительно

getRandomFloat(0, 10, 4);

// источник для примера: (https://learn.javascript.ru/number#sluchaynoe-tseloe-chislo-ot-min-do-max)

