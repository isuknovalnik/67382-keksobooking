'use strict';

(function () {
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

  var ADVERT_OFFER_CHECK = ['12:00', '13:00', '14:00'];
  var ADVERT_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.data = {
    ADVERT_OFFER_TYPES: {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    },
    PINS_BOUNDS: {
      'left': 300,
      'right': 900,
      'top': 180,
      'bottom': 580
    },
    offers: []
  };

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
    var featuresNumber = window.util.getRandomNumber(features.length);
    var featuresList = [];
    var selectedFeature;
    for (var i = 0; i < featuresNumber; i++) {
      selectedFeature = window.util.getUniqueRandomElement(features);
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
      var locationX = getRandomCoord(window.data.PINS_BOUNDS.left, window.data.PINS_BOUNDS.right);
      var locationY = getRandomCoord(window.data.PINS_BOUNDS.top, window.data.PINS_BOUNDS.bottom);
      selectedAvatar = window.util.getUniqueRandomElement(avatars);
      avatars = selectedAvatar[1];
      selectedTitle = window.util.getUniqueRandomElement(titles);
      titles = selectedTitle[1];
      window.data.offers[k] = {
        'author': {
          'avatar': 'img/avatars/user0' + selectedAvatar[0] + '.png'
        },

        'offer': {
          'title': selectedTitle[0],
          'address': locationX.toString() + ', ' + locationY.toString(),
          'price': getRandomPrice(),
          'type': window.util.getRandomElement(Object.keys(window.data.ADVERT_OFFER_TYPES)),
          'rooms': window.util.getRandomNumber(5),
          'guests': window.util.getRandomNumber(30),
          'checkin': window.util.getRandomElement(ADVERT_OFFER_CHECK),
          'checkout': window.util.getRandomElement(ADVERT_OFFER_CHECK),
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

})();
