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

  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  typeChangeHandler();

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  roomNumberChangeHandler();

  timein.addEventListener('change', timeinChangeHandler);
  timeout.addEventListener('change', timeoutChangeHandler);
  type.addEventListener('change', typeChangeHandler);
  roomNumber.addEventListener('change', roomNumberChangeHandler);

  function roomNumberChangeHandler() {
    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomNumber.value][0] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  }

  function typeChangeHandler() {
    var minPrice = TYPE_COST[type.value];
    price.setAttribute('min', minPrice);
    price.setAttribute('value', minPrice);
    price.setAttribute('placeholder', minPrice);
  }

  function timeinChangeHandler() {
    timeout.selectedIndex = timein.selectedIndex;
  }

  function timeoutChangeHandler() {
    timein.selectedIndex = timeout.selectedIndex;
  }

})();
