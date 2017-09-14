'use strict';

(function () {
  // - pinMap временно!!!!!!!!!!!!!!
  var pinMap = document.querySelector('.tokyo__pin-map');
  var filters = document.querySelector('.tokyo__filters');
  var housingType = filters.querySelector('#housing_type');
  var housingPrice = filters.querySelector('#housing_price');
  var roomNumber = filters.querySelector('#housing_room-number');
  var guestsNumber = filters.querySelector('#housing_guests-number');

  var filterState = {
    housingType: 'any',
    housingPrice: 'any',
    roomNumber: 'any',
    guestsNumber: 'any'
  };

  var newFilterState = {
    housingType: 'any',
    housingPrice: 'any',
    roomNumber: 'any',
    guestsNumber: 'any'
  };

  housingType.addEventListener('change', housingTypeChangeHandler);
  housingPrice.addEventListener('change', housingPriceChangeHandler);
  roomNumber.addEventListener('change', roomNumberChangeHandler);
  guestsNumber.addEventListener('change', guestsNumberChangeHandler);

  function housingTypeChangeHandler() {
    newFilterState.housingType = housingType.value;
    if (newFilterState.housingType !== filterState.housingType) {
      window.util.debounce(updateVisibleOffers);
    }
  }

  function housingPriceChangeHandler() {
    newFilterState.housingPrice = housingPrice.value;
    if (newFilterState.housingPrice !== filterState.housingPrice) {
      window.util.debounce(updateVisibleOffers);
    }
  }

  function roomNumberChangeHandler() {
    newFilterState.roomNumber = roomNumber.value;
    if (newFilterState.roomNumber !== filterState.roomNumber) {
      window.util.debounce(updateVisibleOffers);
    }
  }

  function guestsNumberChangeHandler() {
    newFilterState.guestsNumber = guestsNumber.value;
    if (newFilterState.guestsNumber !== filterState.guestsNumber) {
      window.util.debounce(updateVisibleOffers);
    }
  }

  function updateVisibleOffers() {
    if (newFilterState.housingType === 'any' && newFilterState.housingPrice === 'any' && newFilterState.roomNumber === 'any' && newFilterState.guestsNumber === 'any') {
      window.map.visibleOffers = window.map.offers.slice();
    } else {
      var filteredOffers;

      if (newFilterState.housingType !== 'any') {
        filteredOffers = window.map.offers.filter(function (it) {
          return it.offer.type === newFilterState.housingType;
        });
      } else {
        filteredOffers = window.map.offers.slice();
      }

      if (newFilterState.housingPrice !== 'any') {
        switch (newFilterState.housingPrice) {
          case 'low':
            filteredOffers = filteredOffers.filter(function (it) {
              return it.offer.price <= 10000;
            });
            break;
          case 'middle':
            filteredOffers = filteredOffers.filter(function (it) {
              return (it.offer.price > 10000) && (it.offer.price <= 50000);
            });
            break;
          case 'high':
            filteredOffers = filteredOffers.filter(function (it) {
              return it.offer.price > 50000;
            });
            break;
        }
      }

      if (newFilterState.roomNumber !== 'any') {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.rooms === +newFilterState.roomNumber;
        });
      }

      if (newFilterState.guestsNumber !== 'any') {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.guests === +newFilterState.guestsNumber;
        });
      }

      window.map.visibleOffers = filteredOffers;
    }
    window.pin.insertPins(pinMap);
    for (var prop in filterState) {
      if (filterState.hasOwnProperty(prop)) {
        filterState[prop] = newFilterState[prop];
      }
    }
  }

})();
