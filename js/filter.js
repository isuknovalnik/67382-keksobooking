'use strict';

(function () {
  var filters = document.querySelector('.tokyo__filters');
  var housingType = filters.querySelector('#housing_type');
  var housingPrice = filters.querySelector('#housing_price');
  var roomNumber = filters.querySelector('#housing_room-number');
  var guestsNumber = filters.querySelector('#housing_guests-number');
  var featureWifi = filters.querySelector('#wifi');
  var featureDishwasher = filters.querySelector('#dishwasher');
  var featureParking = filters.querySelector('#parking');
  var featureWasher = filters.querySelector('#washer');
  var featureElevator = filters.querySelector('#elevator');
  var featureConditioner = filters.querySelector('#conditioner');

  var filterState = {
    housingType: 'any',
    housingPrice: 'any',
    roomNumber: 'any',
    guestsNumber: 'any',
    featureWifi: false,
    featureDishwasher: false,
    featureParking: false,
    featureWasher: false,
    featureElevator: false,
    featureConditioner: false
  };

  var newFilterState = {
    housingType: 'any',
    housingPrice: 'any',
    roomNumber: 'any',
    guestsNumber: 'any',
    featureWifi: false,
    featureDishwasher: false,
    featureParking: false,
    featureWasher: false,
    featureElevator: false,
    featureConditioner: false
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
      switch (changedElement) {
        case featureWifi:
          filterName = 'featureWifi';
          break;
        case featureDishwasher:
          filterName = 'featureDishwasher';
          break;
        case featureParking:
          filterName = 'featureParking';
          break;
        case featureWasher:
          filterName = 'featureWasher';
          break;
        case featureElevator:
          filterName = 'featureElevator';
          break;
        case featureConditioner:
          filterName = 'featureConditioner';
      }
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
      !newFilterState.featureWifi &&
      !newFilterState.featureDishwasher &&
      !newFilterState.featureParking &&
      !newFilterState.featureWasher &&
      !newFilterState.featureElevator &&
      !newFilterState.featureConditioner
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

      if (newFilterState.featureWifi) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'wifi';
          });
        });
      }

      if (newFilterState.featureDishwasher) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'dishwasher';
          });
        });
      }

      if (newFilterState.featureParking) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'parking';
          });
        });
      }

      if (newFilterState.featureWasher) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'washer';
          });
        });
      }

      if (newFilterState.featureElevator) {
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.features.some(function (feature) {
            return feature === 'elevator';
          });
        });
      }

      if (newFilterState.featureConditioner) {
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
