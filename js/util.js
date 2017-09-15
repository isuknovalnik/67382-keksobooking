'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 300;

  var lastTimeout;
  var messagePopup;
  createMessagePopup();

  function createMessagePopup() {
    var node = document.createElement('div');
    node.classList.add('message-popup');
    node.style.zIndex = '100';
    node.style.width = '100%';
    node.style.textAlign = 'center';
    node.style.display = 'none';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.top = '50%';
    node.style.fontSize = '20px';
    node.style.lineHeight = '48px';
    document.body.insertAdjacentElement('afterbegin', node);
    messagePopup = document.querySelector('.message-popup');
  }

  function displayMessage(message, color) {
    messagePopup.style.backgroundColor = color;
    messagePopup.textContent = message;
    messagePopup.style.display = 'block';
  }

  function keyPressHandler() {
    messagePopup.style.display = 'none';
    document.removeEventListener('keydown', keyPressHandler);
    document.removeEventListener('click', mouseClickHandler);
  }

  function mouseClickHandler() {
    messagePopup.style.display = 'none';
    document.removeEventListener('click', mouseClickHandler);
    document.removeEventListener('keydown', keyPressHandler);
  }

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(evt);
      }
    },
    errorHandler: function (message) {
      displayMessage(message, '#ffaa99');
      document.addEventListener('keydown', keyPressHandler);
      document.addEventListener('click', mouseClickHandler);
    },
    successHandler: function (message) {
      displayMessage(message, '#b5f5a8');
      document.addEventListener('keydown', keyPressHandler);
      document.addEventListener('click', mouseClickHandler);
    },
    getUniqueRandomElement: function (arr) {
      if (arr.length === 1) {
        return [arr[0], []];
      }
      var randomIndex = Math.floor(Math.random() * arr.length);
      var selectedElement = arr.splice(randomIndex, 1);
      return [selectedElement, arr];
    },
    debounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };
})();
