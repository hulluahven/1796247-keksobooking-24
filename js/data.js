import  {createMarker, returnMapInitial} from './map.js';
import  {announcementForm} from './form.js';
import {showAlert, showSuccessMessage, showErrorMessage, closeMessage} from './util.js';
const OFFERS_COUNT = 10;

// функция для получения данных

const getData = () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(showAlert('Что-то пошло не так.:( Попробуйте перезагрузить страницу.'));
    })
    .then((response) => response.json())
    .then((announcements) => {
      createMarker(announcements.slice(0, OFFERS_COUNT));
    });
};


getData();

// функция для отправки данных

const sendData = () => {
  announcementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    fetch(
      'https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
        enctype: 'multipart/form-data',
      },
    )
      .then((response) => {
        if (response.ok) {
          showSuccessMessage();
          evt.target.reset();
          returnMapInitial();
          closeMessage(document.querySelector('.success'));
        }
        else {
          showErrorMessage();
          closeMessage(document.querySelector('.error'));
        }
      })
      .catch(() => {
        showErrorMessage();
        closeMessage(document.querySelector('.error'));
      });
  });

};

sendData();

export {getData, sendData};
