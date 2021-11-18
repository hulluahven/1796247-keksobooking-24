const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SIZE = 70;

const avatarInputField = document.querySelector('.ad-form__field input[type=file]');
const userImagePreview = document.querySelector('.ad-form-header__preview img');
const houseInputUpload = document.querySelector('.ad-form__upload input[type=file]');
const houseImageContainer = document.querySelector('.ad-form__photo');
const houseImageContent = document.createElement('img');

avatarInputField.addEventListener('change', () => {
  const userAvatarFile = avatarInputField.files[0];
  const avatarfileName = userAvatarFile.name.toLowerCase();

  const fileMatches = FILE_TYPES.some((extension) => avatarfileName.endsWith(extension));


  if(fileMatches) {
    userImagePreview.src = URL.createObjectURL(userAvatarFile);
  }

});

houseInputUpload.addEventListener('change', () => {
  const housePhotoFile = houseInputUpload.files[0];
  const housePhotoName = housePhotoFile.name.toLowerCase();

  houseImageContent.width = SIZE;
  houseImageContent.height = SIZE;
  houseImageContent.alt ='Фотография жилья';

  const fileMatches = FILE_TYPES.some((extension) => housePhotoName.endsWith(extension));

  if(fileMatches) {
    houseImageContent.src = URL.createObjectURL(housePhotoFile);
  }

  houseImageContainer.appendChild(houseImageContent);
  return  houseImageContent;
});


const removePictures = () => {
  userImagePreview.src = 'img/muffin-grey.svg';
  houseImageContent.remove();
};

export {removePictures};

