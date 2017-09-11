'use strict';

(function () {
  window.synchronizeFields = function (firstField, secondField, synchronizeFunction, valueSet) {
    firstField.addEventListener('click', function () {
      synchronizeFunction(firstField, secondField, valueSet);
    });
  };
})();
