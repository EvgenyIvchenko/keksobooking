import {createAnnouncements} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const PopupType = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

const createAvatar = (popup, avatar) => {
  const popupAvatar = popup.querySelector('.popup__avatar');

  if (!avatar) { return popupAvatar.remove(); }

  popupAvatar.setAttribute('src', avatar);
};

const createTextContent = (popup, className, string, data1, data2 = true) => {
  const popupElement = popup.querySelector(className);

  if (!data1 || !data2) { return popupElement.remove(); }

  popupElement.textContent = string;
};

const createFeatures = (popup, features) => {
  const popupFeatures = popup.querySelector('.popup__features');

  if (!features) { return popupFeatures.remove(); }

  popupFeatures.innerHTML = '';

  features.forEach((feature) => {
    const popupFeature = document.createElement('li');
    popupFeature.classList.add('popup__feature', `popup__feature--${feature}`);
    popupFeatures.appendChild(popupFeature);
  });
};

const createPhotos = (popup, photos) => {
  const popupPhotos = popup.querySelector('.popup__photos');

  if (!photos) { return popupPhotos.remove(); }

  popupPhotos.innerHTML = '';

  photos.forEach((photo) => {
    const popupPhoto = document.createElement('img');

    popupPhoto.classList.add('popup__photo');
    popupPhoto.src = photo;
    popupPhoto.width = '40';
    popupPhoto.height = '40';
    popupPhoto.alt = 'Фотография жилья';

    popupPhotos.appendChild(popupPhoto);
  });
};

export const createCards = (count) => {
  const cards = createAnnouncements(count);

  cards.forEach(({ author, offer }) => {
    const { avatar } = author;
    const {
      title,
      address,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos,
    } = offer;

    const popup = popupTemplate.cloneNode(true);

    createAvatar(popup, avatar);
    createTextContent(popup, '.popup__title', title, title);
    createTextContent(popup, '.popup__text--address', address, address);
    createTextContent(popup, '.popup__text--price', `${price} ₽/ночь`, price);
    createTextContent(popup, '.popup__type', PopupType[type], type);
    createTextContent(popup, '.popup__text--capacity', `${rooms} комнаты для ${guests} гостей`, rooms, guests);
    createTextContent(popup, '.popup__text--time', `Заезд после ${checkin}, выезд до ${checkout}`, checkin, checkout);
    createTextContent(popup, '.popup__description', description, description);
    createFeatures(popup, features);
    createPhotos(popup, photos);

    // mapCanvas.appendChild(popup);
  });
};
