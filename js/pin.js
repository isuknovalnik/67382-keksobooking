'use strict';

(function () {
  var renderPin = function (advert) {
    var pin = document.createElement('div');
    pin.classList.add('pin');
    pin.setAttribute('style', 'left: ' + (advert.location.x - 20).toString() + 'px; top: ' + (advert.location.y - 40).toString() + 'px');
    pin.innerHTML = '<img src="' + advert.author.avatar + '" class="rounded" width="40" height="40" tabindex="0">';
    return pin;
  };

  window.pin = {
    insertPins: function (pinMap) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.offers.length; i++) {
        fragment.appendChild(renderPin(window.data.offers[i]));
      }
      pinMap.appendChild(fragment);
    }
  };

})();