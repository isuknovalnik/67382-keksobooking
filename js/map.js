'use strict';

var ADVERT_AVATAR_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var ADVERT_OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var ADVERT_OFFER_TYPES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var ADVERT_OFFER_CHECK = ['12:00', '13:00', '14:00'];
var ADVERT_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var offers = [];

function getUniqueRandomElement(arr) {
  if (arr.length === 1) {
    return [arr[0], []];
  }
  var randomIndex = Math.floor(Math.random() * arr.length);
  var selectedElement = arr.splice(randomIndex, 1);
  return [selectedElement, arr];
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(maxNumber) {
  return Math.ceil(Math.random() * maxNumber);
}

function getRandomPrice() {
  var randomValue = Math.random();
  if (randomValue === 0) {
    return 1000000;
  }
  if (randomValue <= 0.001) {
    return 1000;
  }
  return Math.floor(randomValue * 1000000);
}

function getRandomCoord(minNumber, maxNumber) {
  var randomValue = Math.random();
  if (randomValue === 0) {
    return maxNumber;
  }
  return Math.floor(randomValue * (maxNumber - minNumber)) + minNumber;
}

function createFeatures(features) {
  var featuresNumber = getRandomNumber(features.length);
  var featuresList = [];
  var selectedFeature;
  for (var i = 0; i < featuresNumber; i++) {
    selectedFeature = getUniqueRandomElement(features);
    features = selectedFeature[1];
    featuresList[i] = selectedFeature[0];
  }
  return featuresList;
}

function createOffers(advertsNumber) {
  var avatars = ADVERT_AVATAR_NUMBERS.slice();
  var titles = ADVERT_OFFER_TITLES.slice();
  var selectedAvatar;
  var selectedTitle;
  for (var k = 0; k < advertsNumber; k++) {
    var locationX = getRandomCoord(300, 900);
    var locationY = getRandomCoord(100, 500);
    selectedAvatar = getUniqueRandomElement(avatars);
    avatars = selectedAvatar[1];
    selectedTitle = getUniqueRandomElement(titles);
    titles = selectedTitle[1];
    offers[k] = {
      'author': {
        'avatar': 'img/avatars/user0' + selectedAvatar[0] + '.png'
      },

      'offer': {
        'title': selectedTitle[0],
        'address': locationX.toString() + ', ' + locationY.toString(),
        'price': getRandomPrice(),
        'type': getRandomElement(Object.keys(ADVERT_OFFER_TYPES)),
        'rooms': getRandomNumber(5),
        'guests': getRandomNumber(30),
        'checkin': getRandomElement(ADVERT_OFFER_CHECK),
        'checkout': getRandomElement(ADVERT_OFFER_CHECK),
        'features': createFeatures(ADVERT_OFFER_FEATURES.slice()),
        'description': '',
        'photos': []
      },

      'location': {
        'x': locationX,
        'y': locationY
      }

    };
  }
}

createOffers(8);

var pinMap = document.querySelector('.tokyo__pin-map');

var renderPin = function (advert) {
  var pin = document.createElement('div');
  pin.classList.add('pin');
  pin.setAttribute('style', 'left: ' + (advert.location.x - 20).toString() + 'px; top: ' + (advert.location.y - 40).toString() + 'px');
  pin.innerHTML = '<img src="' + advert.author.avatar + '" class="rounded" width="40" height="40" tabindex="0">';
  return pin;
};

var insertPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
  pinMap.appendChild(fragment);
};

insertPins();

var lodgeTemplate = document.querySelector('#lodge-template').content;

var renderFeatures = function (features, featuresElement) {
  var featureSpan;
  for (var i = 0; i < features.length; i++) {
    featureSpan = document.createElement('span');
    featureSpan.classList.add('feature__image');
    featureSpan.classList.add('feature__image--' + features[i]);
    featuresElement.appendChild(featureSpan);
  }
  return featuresElement;
};

var renderLodge = function (lodge) {
  var lodgeElement = lodgeTemplate.cloneNode(true);
  var lodgeType;

  lodgeElement.querySelector('.lodge__title').textContent = lodge.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = lodge.offer.address;
  lodgeElement.querySelector('.lodge__price').textContent = lodge.offer.price.toString() + '&#x20bd;/ночь';
  lodgeType = ADVERT_OFFER_TYPES[lodge.offer.type];
  lodgeElement.querySelector('.lodge__type').textContent = lodgeType;
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + lodge.offer.guests.toString() + ' гостей в ' + lodge.offer.rooms.toString() + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + lodge.offer.checkin + ', выезд до ' + lodge.offer.checkout;
  renderFeatures(lodge.offer.features, lodgeElement.querySelector('.lodge__features'));
  lodgeElement.querySelector('.lodge__description').textContent = lodge.offer.description;

  return lodgeElement;
};

var offerDialog = document.querySelector('#offer-dialog');
var dialogClose = offerDialog.querySelector('.dialog__close');

var fillDialog = function (offerNumber) {
  var dialogPanel = offerDialog.querySelector('.dialog__panel');
  offerDialog.replaceChild(renderLodge(offers[offerNumber]), dialogPanel);

  var dialogTitle = document.querySelector('.dialog__title');
  var avatar = dialogTitle.querySelector('img');
  avatar.setAttribute('src', offers[offerNumber].author.avatar);
};

closePopup();

var pins = document.querySelectorAll('.pin');

pinMap.addEventListener('click', pinMapClickHandler);
pinMap.addEventListener('keydown', pinMapKeyPressHandler);
dialogClose.addEventListener('click', dialogCloseClickHandler);
dialogClose.addEventListener('keydown', dialogCloseKeyPressHandler);
document.addEventListener('keydown', PopupEscPressHandler);

var currentPin = null;

function dialogCloseClickHandler() {
  closePopup();
}

function dialogCloseKeyPressHandler(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
}

function pinMapClickHandler(evt) {
  selectPin(evt);
}

function pinMapKeyPressHandler(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    selectPin(evt);
  }
}

function selectPin(evt) {
  var clickedElement = evt.target;
  if (clickedElement.nodeName === 'IMG') {
    clickedElement = clickedElement.parentElement;
  }
  if (clickedElement.classList.contains('pin__main')) {
    return;
  }

  if (currentPin) {
    currentPin.classList.remove('pin--active');
  }
  currentPin = clickedElement;
  currentPin.classList.add('pin--active');
  for (var i = 1; i < pins.length; i++) {
    if (currentPin === pins[i]) {
      fillDialog(i - 1);
      break;
    }
  }
  openPopup();
}

function PopupEscPressHandler(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

function openPopup() {
  offerDialog.classList.remove('hidden');
  document.addEventListener('keydown', PopupEscPressHandler);
}

function closePopup() {
  offerDialog.classList.add('hidden');
  if (currentPin) {
    currentPin.classList.remove('pin--active');
  }
  document.removeEventListener('keydown', PopupEscPressHandler);
}
