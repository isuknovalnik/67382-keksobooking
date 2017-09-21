'use strict';

(function () {
  var filters = document.querySelector('.tokyo__filters');
  var housingType = filters.querySelector('#housing_type');
  var housingPrice = filters.querySelector('#housing_price');
  var roomNumber = filters.querySelector('#housing_room-number');
  var guestsNumber = filters.querySelector('#housing_guests-number');

  var filterState = {
    housingType: 'any',
    housingPrice: 'any',
    roomNumber: 'any',
    guestsNumber: 'any',
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false
  };

  var newFilterState = {
    housingType: 'any',
    housingPrice: 'any',
    roomNumber: 'any',
    guestsNumber: 'any',
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false
  };

  filters.addEventListener('change', filtersChangeHandler);

  function filtersChangeHandler(evt) {
    var changedElement = evt.target;
    var filterName;
    if (changedElement.nodeName === 'SELECT') {
      switch (changedElement) {
        case housingType:
          filterName = 'housingType';
          break;
        case housingPrice:
          filterName = 'housingPrice';
          break;
        case roomNumber:
          filterName = 'roomNumber';
          break;
        case guestsNumber:
          filterName = 'guestsNumber';
      }
      newFilterState[filterName] = changedElement.value;
    } else {
      filterName = changedElement.value;
      newFilterState[filterName] = changedElement.checked;
    }
    if (newFilterState[filterName] !== filterState[filterName]) {
      window.util.debounce(updateVisibleOffers);
    }
  }

  function updateVisibleOffers() {
    if (newFilterState.housingType === 'any' &&
      newFilterState.housingPrice === 'any' &&
      newFilterState.roomNumber === 'any' &&
      newFilterState.guestsNumber === 'any' &&
      !newFilterState.wifi &&
      !newFilterState.dishwasher &&
      !newFilterState.parking &&
      !newFilterState.washer &&
      !newFilterState.elevator &&
      !newFilterState.conditioner
    ) {
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

      if (newFilterState.wifi) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'wifi';
          });
        });
      }

      if (newFilterState.dishwasher) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'dishwasher';
          });
        });
      }

      if (newFilterState.parking) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'parking';
          });
        });
      }

      if (newFilterState.washer) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'washer';
          });
        });
      }

      if (newFilterState.elevator) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'elevator';
          });
        });
      }

      if (newFilterState.conditioner) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'conditioner';
          });
        });
      }

      window.map.visibleOffers = filteredOffers;
    }
    window.map.closePopup();
    window.pin.insertPins(window.map.pinMap);
    for (var prop in filterState) {
      if (filterState.hasOwnProperty(prop)) {
        filterState[prop] = newFilterState[prop];
      }
    }
  }

})();
