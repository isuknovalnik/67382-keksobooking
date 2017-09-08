'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  pinMap.setAttribute('style', 'user-select: none');
  var dialogClose = window.card.offerDialog.querySelector('.dialog__close');
  closePopup();

  window.pin.insertPins(pinMap);
  var pins = document.querySelectorAll('.pin');
  var pinMain = pins[0];
  var currentPin = null;
  var addressInput = document.querySelector('#address');

  var pinMainCoordBounds = {
    'left': window.data.PINS_BOUNDS.left - 37,
    'right': window.data.PINS_BOUNDS.right - 37,
    'top': window.data.PINS_BOUNDS.top - 94,
    'bottom': window.data.PINS_BOUNDS.bottom - 94
  };

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }

  var pinMapLeft = Math.round(pinMap.getBoundingClientRect().left);

  keepNewAddress();

  pinMap.addEventListener('click', pinMapClickHandler);
  pinMap.addEventListener('keydown', pinMapKeyPressHandler);
  dialogClose.addEventListener('click', dialogCloseClickHandler);
  dialogClose.addEventListener('keydown', dialogCloseKeyPressHandler);
  document.addEventListener('keydown', PopupEscPressHandler);
  pinMain.addEventListener('mousedown', dragMainPin);


  function dialogCloseClickHandler() {
    closePopup();
  }

  function dialogCloseKeyPressHandler(evt) {
    window.util.isEnterEvent(evt, closePopup);
  }

  function pinMapClickHandler(evt) {
    selectPin(evt);
  }

  function pinMapKeyPressHandler(evt) {
    window.util.isEnterEvent(evt, selectPin);
  }

  function PopupEscPressHandler(evt) {
    window.util.isEscEvent(evt, closePopup);
  }

  function closePopup() {
    window.card.offerDialog.classList.add('hidden');
    if (window.pin.currentPin) {
      window.pin.currentPin.classList.remove('pin--active');
    }
    document.removeEventListener('keydown', PopupEscPressHandler);
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
    for (var i = 1; i < pins.length; i++) {
      if (currentPin === pins[i]) {
        window.card.fillDialog(i - 1);
        break;
      }
    }
    openPopup();
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
      'left': Math.round(pinCoords.left) - pinMapLeft + 37,
      'top': Math.round(pinCoords.top) + 94
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
