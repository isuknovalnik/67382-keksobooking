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
var ADVERT_OFFER_TYPES = ['flat', 'house', 'bungalo'];
var ADVERT_OFFER_CHECK = ['12:00', '13:00', '14:00'];
var ADVERT_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offers = [];
var selections = [];

function getUniqueRandomElement(arr, n) {
  if (arr.length === 1) {
    return arr[0];
  }
  var ratio = 1 / arr.length;
  var lastIndex = arr.length - 1;
  var randomValue = Math.random();
  for (var j = 0; j < lastIndex; j++) {
    if (randomValue <= (j + 1) * ratio) {
      selections[n] = j;
      return arr[j];
    }
  }
  selections[n] = lastIndex;
  return arr[lastIndex];
}

function getRandomElement(arr) {
  var ratio = 1 / arr.length;
  var lastIndex = arr.length - 1;
  var randomValue = Math.random();
  for (var j = 0; j < lastIndex; j++) {
    if (randomValue <= (j + 1) * ratio) {
      return arr[j];
    }
  }
  return arr[lastIndex];
}

function getRandomNumber(maxNumber) {
  var ratio = 1 / maxNumber;
  var randomValue = Math.random();
  for (var j = 0; j < (maxNumber - 1); j++) {
    if (randomValue <= (j + 1) * ratio) {
      return j + 1;
    }
  }
  return maxNumber;
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
  for (var i = 0; i < featuresNumber; i++) {
    featuresList[i] = getUniqueRandomElement(features, 2);
    if (features.length > 1) {
      features.splice(selections[2], 1);
    }
  }
  return featuresList;
}

function createOffers(avatars, titles, types, check, features) {
  for (var k = 0; k < 8; k++) {
    var locationX = getRandomCoord(300, 900);
    var locationY = getRandomCoord(100, 500);
    offers[k] = {
      'author': {
        'avatar': 'img/avatars/user0' + getUniqueRandomElement(avatars, 0) + '.png'
      },

      'offer': {
        'title': getUniqueRandomElement(titles, 1),
        'address': locationX.toString() + ', ' + locationY.toString(),
        'price': getRandomPrice(),
        'type': getRandomElement(types),
        'rooms': getRandomNumber(5),
        'guests': getRandomNumber(30),
        'checkin': getRandomElement(check),
        'checkout': getRandomElement(check),
        'features': createFeatures(features),
        'description': '',
        'photos': []
      },

      'location': {
        'x': locationX,
        'y': locationY
      }

    };
    if (avatars.length > 1) {
      avatars.splice(selections[0], 1);
    }
    if (titles.length > 1) {
      titles.splice(selections[1], 1);
    }
  }
}

createOffers(ADVERT_AVATAR_NUMBERS, ADVERT_OFFER_TITLES, ADVERT_OFFER_TYPES, ADVERT_OFFER_CHECK, ADVERT_OFFER_FEATURES);

var pinMap = document.querySelector('.tokyo__pin-map');

var renderPin = function (advert) {
  var pin = document.createElement('div');
  pin.classList.add('pin');
  pin.setAttribute('style', 'left: ' + (advert.location.x - 20).toString() + 'px; top: ' + (advert.location.y - 40).toString() + 'px');
  pin.innerHTML = '<img src="' + advert.author.avatar + '" class="rounded" width="40" height="40">';
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
  switch (lodge.offer.type) {
    case 'flat':
      lodgeType = 'Квартира';
      break;
    case 'bungalo':
      lodgeType = 'Бунгало';
      break;
    case 'house':
      lodgeType = 'Дом';
      break;
    default:
      lodgeType = 'Сарай';
  }
  lodgeElement.querySelector('.lodge__type').textContent = lodgeType;
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + lodge.offer.guests.toString() + ' гостей в ' + lodge.offer.rooms.toString() + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + lodge.offer.checkin + ', выезд до ' + lodge.offer.checkout;
  renderFeatures(lodge.offer.features, lodgeElement.querySelector('.lodge__features'));
  lodgeElement.querySelector('.lodge__description').textContent = lodge.offer.description;

  return lodgeElement;
};

var offerDialog = document.querySelector('#offer-dialog');
var dialogPanel = document.querySelector('.dialog__panel');
offerDialog.replaceChild(renderLodge(offers[0]), dialogPanel);

var dialogTitle = document.querySelector('.dialog__title');
var avatar = dialogTitle.querySelector('img');
avatar.setAttribute('src', offers[0].author.avatar);
