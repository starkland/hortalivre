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

    obj.recoverPass = function(data, callback) {
      $http.post(apiUrl + '/api/v1/users/password_recover/', data, { headers: { 'Content-Type': 'application/json' }}).then(function (data) {
          callback(data);
        }, function (error) {
          callback(error);
        });
    };

    return obj;

  });
