'use strict';

/**
 * @ngdoc service
 * @name hortalivreApp.FavoriteApi
 * @description
 * # FavoriteApi
 * Service in the hortalivreApp.
 */
angular.module('hortalivreApp')
  .service('FavoriteApi', ['$http', 'ApiConfig', function ($http, ApiConfig) {

    var obj = {};
    var apiUrl = ApiConfig.API_URL;

    obj.All = function(callback) {
      $http.get(apiUrl + '/api/v1/favorite/', { headers: {
          'Content-Type': 'application/json',
          'Authorization': null,
        }}).then(function (data) {
          callback(data);
        }, function (error) {
          callback(error);
        });
    };


    return obj;

  }]);
