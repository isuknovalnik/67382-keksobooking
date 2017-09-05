'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var dialogClose = window.card.offerDialog.querySelector('.dialog__close');
  closePopup();

  window.pin.insertPins(pinMap);
  var pins = document.querySelectorAll('.pin');
  var currentPin = null;

  pinMap.addEventListener('click', pinMapClickHandler);
  pinMap.addEventListener('keydown', pinMapKeyPressHandler);
  dialogClose.addEventListener('click', dialogCloseClickHandler);
  dialogClose.addEventListener('keydown', dialogCloseKeyPressHandler);
  document.addEventListener('keydown', PopupEscPressHandler);

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

})();
