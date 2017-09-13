'use strict';

(function () {
  var TYPE_COST = {
    'flat': '1000',
    'bungalo': '0',
    'house': '5000',
    'palace': '10000'
  };
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var form = document.querySelector('.notice__form');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  typeChangeHandler(type, price, TYPE_COST);

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  roomNumberChangeHandler(roomNumber, capacity, ROOMS_CAPACITY);

  window.synchronizeFields(timein, timeout, timeChangeHandler);
  window.synchronizeFields(timeout, timein, timeChangeHandler);
  window.synchronizeFields(type, price, typeChangeHandler, TYPE_COST);
  window.synchronizeFields(roomNumber, capacity, roomNumberChangeHandler, ROOMS_CAPACITY);
  form.addEventListener('submit', formSubmitHandler);

  function formSubmitHandler(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), response, window.util.errorHandler);
  }

  function response(data) {
    window.util.successHandler('Объявление ' + data.title + ' успешно обработано');
    form.reset();
  }

  function roomNumberChangeHandler(firstField, secondField, valueSet) {
    if (secondField.options.length > 0) {
      [].forEach.call(secondField.options, function (item) {
        item.selected = (valueSet[firstField.value][0] === item.value) ? true : false;
        item.hidden = (valueSet[firstField.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  }

  function typeChangeHandler(firstField, secondField, valueSet) {
    var minValue = valueSet[firstField.value];
    secondField.setAttribute('min', minValue);
    secondField.setAttribute('value', minValue);
    secondField.setAttribute('placeholder', minValue);
  }

  function timeChangeHandler(firstField, secondField) {
    secondField.value = firstField.value;
  }

})();
