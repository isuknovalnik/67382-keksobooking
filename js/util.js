'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var messageNode;

  function displayMessage(message, color) {
    var node = document.createElement('div');
    node.classList.add('message');
    node.style = 'z-index: 100; width: 100%; text-align: center; background-color: ' + color + ';';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.top = '50%';
    node.style.fontSize = '20px';
    node.style.lineHeight = '48px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
    messageNode = document.querySelector('.message');
  }

  function keyPressHandler() {
    document.body.removeChild(messageNode);
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
    },
    successHandler: function (message) {
      displayMessage(message, '#b5f5a8');
      document.addEventListener('keydown', keyPressHandler);
    }
  };
})();
