'use strict';

/**
 * @ngdoc service
 * @name hortalivreApp.GardenApi
 * @description
 * # GardenApi
 * Service in the hortalivreApp.
 */
angular.module('hortalivreApp')
  .service('GardenApi', function ($http, ApiConfig) {

    var obj = {};
    var apiUrl = ApiConfig.API_URL;

    obj.All = function(callback) {
      $http.get('https://form-location-jsday-recife.firebaseio.com/veggies.json').then(function (result) {
          callback(result);
        }, function (error) {
          callback(error);
        });
    };

    obj.ByLatLng = function(data, callback) {
      $http.get(apiUrl + '/api/v1/markets/' + data.lat + ',' + data.lng, data, { headers: { 'Content-Type': 'application/json' }}).then(function (data) {
          callback(data);
        }, function (error) {
          callback(error);
        });
    };


    return obj;

  });
