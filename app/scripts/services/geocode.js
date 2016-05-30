(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name hortalivreApp.geocode
   * @description
   * # geocode
   * Factory in the hortalivreApp.
   */
  angular
    .module('hortalivreApp')
    .factory('geocode', geocode);

    geocode.$inject = ['$http', '$log', '$q'];

    function geocode($http, $log, $q) {

      return {
        byLatLng: byLatLng,
        byAddress: byAddress
      };

      function byLatLng(obj) {
        var latlng = obj.lat + ',' + obj.lng;

        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
          params: {
            latlng: latlng, // lat/lng
            sensor: false,
            language: 'pt-BR'
          }
        }).then(success).catch(error);

        function success(response) {
          response.data.results.map(function(item){
            console.warn(item.formatted_address);
            return item.formatted_address;
          });

          // return response.data;
        }

        function error(error) {
          return $q.reject(error.status)
        }
      }

      function byAddress(address) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
          params: {
            latlng: address, // address
            sensor: false,
            language: 'pt-BR'
          }
        }).then(success).catch(error);

        function success(response) {
          return response.data;
        }

        function error(error) {
          return $q.reject(error.status)
        }
      }
    }

})();
