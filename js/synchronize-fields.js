'use strict';

(function () {
  window.synchronizeFields = function (firstField, secondField, synchronizeFunction, valueSet) {
    firstField.addEventListener('change', function () {
      synchronizeFunction(firstField, secondField, valueSet);
    });
  };
})();
