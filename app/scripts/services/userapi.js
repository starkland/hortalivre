'use strict';

/**
 * @ngdoc service
 * @name hortalivreApp.UserApi
 * @description
 * # UserApi
 * Service in the hortalivreApp.
 */
angular.module('hortalivreApp')
  .service('UserApi', function ($http, ApiConfig) {

    var obj = {};
    var apiUrl = ApiConfig.API_URL;

    obj.create = function(data, callback) {
      $http.post(apiUrl + '/api/v1/users/', data, { headers: { 'Content-Type': 'application/json' }}).then(function (data) {
          callback(data);
        }, function (error) {
          callback(error);
        });
    };

    obj.authEmail = function(data, callback) {
      $http.post(apiUrl + '/api/v1/auth/', data, { headers: { 'Content-Type': 'application/json' }}).then(function (data) {
          callback(data);
        }, function (error) {
          callback(error);
        });
    };

    // obj.getList = function(callback) {
    //   $http.get(apiUrl + '/api/v1/complaint/')
    //     .then(function (result) {
    //       callback(result)
    //     }, function (error) {
    //       callback(error);
    //     });
    // };

    // obj.sendFeedback = function(data, callback) {
    //   $http.post('https://formspree.io/taxisangry@gmail.com', data, {headers: {'Accept': 'application/json'}}).then(
    //     function(data) { callback(data) },
    //     function(error) { callback(error) }
    //   );
    // };

    return obj;

  });
