'use strict';

(function () {
  window.showCard = function (elementNumber, elements, outerElement, renderElement, onRenderCompleted) {
    var dialogPanel = outerElement.querySelector('.dialog__panel');
    outerElement.replaceChild(renderElement(elements[elementNumber]), dialogPanel);

    var dialogTitle = outerElement.querySelector('.dialog__title');
    var avatar = dialogTitle.querySelector('img');
    avatar.setAttribute('src', elements[elementNumber].author.avatar);
    onRenderCompleted();
  };

})();
