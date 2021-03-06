'use strict';

(function () {
  var renderPin = function (advert) {
    var pin = document.createElement('div');
    pin.classList.add('pin');
    pin.setAttribute('style', 'left: ' + (advert.location.x - 28).toString() + 'px; top: ' + (advert.location.y - 75).toString() + 'px');
    var pinImg = document.createElement('img');
    pinImg.setAttribute('src', advert.author.avatar);
    pinImg.classList.add('rounded');
    pinImg.setAttribute('width', '40');
    pinImg.setAttribute('height', '40');
    pinImg.setAttribute('tabindex', '0');
    pin.appendChild(pinImg);
    return pin;
  };

  window.pin = {
    pins: {},
    insertPins: function (pinMap) {
      if (window.pin.pins !== {}) {
        for (var j = 1; j < window.pin.pins.length; j++) {
          pinMap.removeChild(window.pin.pins[j]);
        }
      }
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.map.visibleOffers.length; i++) {
        fragment.appendChild(renderPin(window.map.visibleOffers[i]));
      }
      pinMap.appendChild(fragment);
      window.pin.pins = document.querySelectorAll('.pin');
    }
  };

})();
