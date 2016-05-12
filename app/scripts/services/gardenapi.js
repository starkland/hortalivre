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
      $http.get('markers.json')
        .then(function (result) {
          callback(result)
        }, function (error) {
          callback(error);
        });
    };

    return obj;

  });
