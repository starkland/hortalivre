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
      $http.get(apiUrl + '/api/v1/favorite/', { headers: { 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorization') }}).then(function (data) {
          callback(data);
        }, function (error) {
          callback(error);
        });
    };

    obj.Add = function(data, callback) {
      $http.post(apiUrl + '/api/v1/favorite/', data, { headers: { 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorization') }}).then(function (data) {
          callback(data);
        }, function (error) {
          callback(error);
        });
    };

    return obj;

  }]);
