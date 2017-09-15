'use strict';

(function () {
  // - pinMap временно!!!!!!!!!!!!!!
  var pinMap = document.querySelector('.tokyo__pin-map');
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

  var handleFilters = function (filterField, filterName, handlerFunction, isFeature) {
    filterField.addEventListener('change', function () {
      handlerFunction(filterField, filterName, isFeature);
    });
  };

  handleFilters(housingType, 'housingType', filtersChangeHandler, false);
  handleFilters(housingPrice, 'housingPrice', filtersChangeHandler, false);
  handleFilters(roomNumber, 'roomNumber', filtersChangeHandler, false);
  handleFilters(guestsNumber, 'guestsNumber', filtersChangeHandler, false);
  handleFilters(featureWifi, 'featureWifi', filtersChangeHandler, true);
  handleFilters(featureDishwasher, 'featureDishwasher', filtersChangeHandler, true);
  handleFilters(featureParking, 'featureParking', filtersChangeHandler, true);
  handleFilters(featureWasher, 'featureWasher', filtersChangeHandler, true);
  handleFilters(featureElevator, 'featureElevator', filtersChangeHandler, true);
  handleFilters(featureConditioner, 'featureConditioner', filtersChangeHandler, true);

  function filtersChangeHandler(filterField, filterName, isFeature) {
    if (isFeature) {
      newFilterState[filterName] = filterField.checked;
    } else {
      newFilterState[filterName] = filterField.value;
    }
    if (newFilterState[filterName] !== filterState[filterName]) {
      window.util.debounce(updateVisibleOffers);
    }
  }

  function updateVisibleOffers() {
    if (newFilterState.housingType === 'any' && newFilterState.housingPrice === 'any' && newFilterState.roomNumber === 'any' && newFilterState.guestsNumber === 'any' && !newFilterState.featureWifi && !newFilterState.featureDishwasher && !newFilterState.featureParking && !newFilterState.featureWasher && !newFilterState.featureElevator && !newFilterState.featureConditioner) {
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
    window.pin.insertPins(pinMap);
    for (var prop in filterState) {
      if (filterState.hasOwnProperty(prop)) {
        filterState[prop] = newFilterState[prop];
      }
    }
  }

})();
