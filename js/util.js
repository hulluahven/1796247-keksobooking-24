const isEscapeKey = (evt) => evt.key === 'Escape';

//шаблон для удачной отправки
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

//шаблон для неудачной отправки
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const ALERT_SHOW_TIME = 5000;

// показать сообщение

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  document.body.append(successMessage);
  return successMessage;
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.append(errorMessage);
  return errorMessage;
};


const closeMessage = (popup) => {
  const removeElement = (popup) => {
    popup.remove();
    document.removeEventListener('keydown', onPopupEscapeKeydown);
    window.removeEventListener('click',onClickPopup );
  }

  function onPopupEscapeKeydown(evt)  {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeElement(popup);
    }
  }

  const onClickPopup = () => {
    removeElement(popup);
      };

  document.addEventListener('keydown', onPopupEscapeKeydown);
  window.addEventListener('click',onClickPopup );
};


export {showAlert , showSuccessMessage, showErrorMessage, closeMessage};
