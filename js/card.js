'use strict';

(function () {
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
    lodgeType = window.data.ADVERT_OFFER_TYPES[lodge.offer.type];
    lodgeElement.querySelector('.lodge__type').textContent = lodgeType;
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + lodge.offer.guests.toString() + ' гостей в ' + lodge.offer.rooms.toString() + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + lodge.offer.checkin + ', выезд до ' + lodge.offer.checkout;
    renderFeatures(lodge.offer.features, lodgeElement.querySelector('.lodge__features'));
    lodgeElement.querySelector('.lodge__description').textContent = lodge.offer.description;

    return lodgeElement;
  };

  window.card = {
    offerDialog: document.querySelector('#offer-dialog'),
    fillDialog: function (offerNumber) {
      var dialogPanel = window.card.offerDialog.querySelector('.dialog__panel');
      window.card.offerDialog.replaceChild(renderLodge(window.data.offers[offerNumber]), dialogPanel);

      var dialogTitle = document.querySelector('.dialog__title');
      var avatar = dialogTitle.querySelector('img');
      avatar.setAttribute('src', window.data.offers[offerNumber].author.avatar);
    }
  };

})();
