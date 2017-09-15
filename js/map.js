'use strict';

(function () {
  window.map = {
    offers: [],
    visibleOffers: [],
    pinMap: {},
    dataResetHandler: function () {
      keepNewAddress();
    },
    closePopup: function () {
      window.card.offerDialog.classList.add('hidden');
      if (window.pin.currentPin) {
        window.pin.currentPin.classList.remove('pin--active');
      }
      document.removeEventListener('keydown', PopupEscPressHandler);
    }
  };

  var PINS_BOUNDS = {
    'left': 300,
    'right': 1100,
    'top': 180,
    'bottom': 580
  };
  var MAIN_PIN_HEIGHT = 94;
  var MAIN_PIN_HF_WIDTH = 37;
  var VISIBLE_PINS_NUMBER = 3;
  var currentPin = null;

  window.map.pinMap = document.querySelector('.tokyo__pin-map');
  window.map.pinMap.setAttribute('style', 'user-select: none');
  var pinMapLeft = Math.round(window.map.pinMap.getBoundingClientRect().left);
  var dialogClose = window.card.offerDialog.querySelector('.dialog__close');
  var pinMain = window.map.pinMap.querySelector('.pin__main');
  window.map.closePopup();

  var addressInput = document.querySelector('#address');

  window.backend.load(offersLoadHandler, window.util.errorHandler);

  var pinMainCoordBounds = {
    'left': PINS_BOUNDS.left - MAIN_PIN_HF_WIDTH,
    'right': PINS_BOUNDS.right - MAIN_PIN_HF_WIDTH,
    'top': PINS_BOUNDS.top - MAIN_PIN_HEIGHT,
    'bottom': PINS_BOUNDS.bottom - MAIN_PIN_HEIGHT
  };

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }

  keepNewAddress();

  window.map.pinMap.addEventListener('click', pinMapClickHandler);
  window.map.pinMap.addEventListener('keydown', pinMapKeyPressHandler);
  dialogClose.addEventListener('click', dialogCloseClickHandler);
  dialogClose.addEventListener('keydown', dialogCloseKeyPressHandler);
  document.addEventListener('keydown', PopupEscPressHandler);
  pinMain.addEventListener('mousedown', dragMainPin);
  window.addEventListener('resize', resizeHandler);

  function offersLoadHandler(data) {
    window.map.offers = data;
    var tempOffers = window.map.offers.slice();
    var selectedOffer;
    for (var k = 0; k < VISIBLE_PINS_NUMBER; k++) {
      selectedOffer = window.util.getUniqueRandomElement(tempOffers);
      tempOffers = selectedOffer[1];
      window.map.visibleOffers[k] = selectedOffer[0][0];
    }
    window.pin.insertPins(window.map.pinMap);
  }

  function dialogCloseClickHandler() {
    window.map.closePopup();
  }

  function dialogCloseKeyPressHandler(evt) {
    window.util.isEnterEvent(evt, window.map.closePopup);
  }

  function pinMapClickHandler(evt) {
    selectPin(evt);
  }

  function pinMapKeyPressHandler(evt) {
    window.util.isEnterEvent(evt, selectPin);
  }

  function PopupEscPressHandler(evt) {
    window.util.isEscEvent(evt, window.map.closePopup);
  }

  function openPopup() {
    window.card.offerDialog.classList.remove('hidden');
    document.addEventListener('keydown', PopupEscPressHandler);
  }

  function selectPin(evt) {
    var clickedElement = evt.target;
    if (clickedElement.nodeName === 'IMG') {
      clickedElement = clickedElement.parentElement;
    }
    if (clickedElement.classList.contains('pin__main')) {
      return;
    }
    if (clickedElement.classList.contains('tokyo__pin-map')) {
      return;
    }

    if (currentPin) {
      currentPin.classList.remove('pin--active');
    }
    currentPin = clickedElement;
    currentPin.classList.add('pin--active');
    for (var i = 1; i < window.pin.pins.length; i++) {
      if (currentPin === window.pin.pins[i]) {
        window.showCard(i - 1, window.map.visibleOffers, window.card.offerDialog, window.card.renderLodge, openPopup);
        break;
      }
    }
  }

  function resizeHandler() {
    pinMapLeft = Math.round(window.map.pinMap.getBoundingClientRect().left);
  }

  function pinMove(X, Y, shiftX, shiftY) {
    var newX = X - shiftX - pinMapLeft;
    if (newX < pinMainCoordBounds.left) {
      newX = pinMainCoordBounds.left;
    } else if (newX > pinMainCoordBounds.right) {
      newX = pinMainCoordBounds.right;
    }
    var newY = Y - shiftY;
    if (newY < pinMainCoordBounds.top) {
      newY = pinMainCoordBounds.top;
    } else if (newY > pinMainCoordBounds.bottom) {
      newY = pinMainCoordBounds.bottom;
    }
    pinMain.style.left = newX + 'px';
    pinMain.style.top = newY + 'px';
  }

  function keepNewAddress() {
    var pinCoords = getCoords(pinMain);
    var addressCoords = {
      'left': Math.round(pinCoords.left) - pinMapLeft + MAIN_PIN_HF_WIDTH,
      'top': Math.round(pinCoords.top) + MAIN_PIN_HEIGHT
    };
    addressInput.value = 'x: ' + addressCoords.left.toString() + ', y: ' + addressCoords.top.toString();
  }

  function dragMainPin(evt) {
    evt.preventDefault();
    var pinCoords = getCoords(pinMain);
    var shiftX = evt.pageX - pinCoords.left;
    var shiftY = evt.pageY - pinCoords.top;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      pinMove(moveEvt.pageX, moveEvt.pageY, shiftX, shiftY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      keepNewAddress();
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

})();
