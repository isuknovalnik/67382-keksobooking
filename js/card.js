'use strict';

(function () {
  var ADVERT_OFFER_TYPES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var lodgeTemplate = document.querySelector('#lodge-template').content;

  var renderPictures = function (pictures, picturesElement) {
    var pictureImg;
    for (var i = 0; i < pictures.length; i++) {
      pictureImg = document.createElement('img');
      pictureImg.setAttribute('src', pictures[i]);
      pictureImg.setAttribute('alt', 'Lodge photo');
      pictureImg.setAttribute('width', '52');
      pictureImg.setAttribute('width', '42');
      picturesElement.appendChild(pictureImg);
    }
    return picturesElement;
  };

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

  window.card = {
    offerDialog: document.querySelector('#offer-dialog'),
    renderLodge: function (lodge) {
      var lodgeElement = lodgeTemplate.cloneNode(true);
      var lodgeType;

      lodgeElement.querySelector('.lodge__title').textContent = lodge.offer.title;
      lodgeElement.querySelector('.lodge__address').textContent = lodge.offer.address;
      lodgeElement.querySelector('.lodge__price').textContent = lodge.offer.price.toString() + '₽/ночь';
      lodgeType = ADVERT_OFFER_TYPES[lodge.offer.type];
      lodgeElement.querySelector('.lodge__type').textContent = lodgeType;
      lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + lodge.offer.guests.toString() + ' гостей в ' + lodge.offer.rooms.toString() + ' комнатах';
      lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + lodge.offer.checkin + ', выезд до ' + lodge.offer.checkout;
      renderFeatures(lodge.offer.features, lodgeElement.querySelector('.lodge__features'));
      lodgeElement.querySelector('.lodge__description').textContent = lodge.offer.description;
      renderPictures(lodge.offer.photos, lodgeElement.querySelector('.lodge__photos'));

      return lodgeElement;
    }
  };

})();
