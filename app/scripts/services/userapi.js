'use strict';

/**
 * @ngdoc service
 * @name hortalivreApp.UserApi
 * @description
 * # UserApi
 * Service in the hortalivreApp.
 */
angular.module('hortalivreApp')
  .service('UserApi', function ($http, ApiConfig, $facebook) {

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
          sessionStorage.setItem('authorization', data.headers()['authorization']);
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

    obj.lookup = function(callback) {
      $http.get(apiUrl + '/api/v1/me/', { headers: { 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorization') }}).then(function (data) {
          callback(data);
        }, function (error) {
          callback(error);
        });
    };

    obj.addItemToMyGarden = function(data, callback) {
      $http.post(apiUrl + '/api/v1/garden/', data, { headers: { 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorization') }}).then(function (data) {
          callback(data);
        }, function (error) {
          callback(error);
        });
    };

    obj.removeItemOfMyGarden = function(data, callback) {
      var obj = data;
      var config = {
        data: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('authorization')
          }
      };

      $http.delete(apiUrl + '/api/v1/garden/', config).then(function(data) {
        callback(data);
        }, function (error) {
          callback(error);
        });
    };

    obj.authFacebook = function(callback) {
      var params = {};

      $facebook.login().then(function(data) {
        params.access_token = data.authResponse.accessToken;

        if (data.status === 'connected') {
          $facebook.api('me', { fields: 'name,email,gender,ids_for_business,picture' }).then(function(response) {
            params.user_fb_data = response;
            callback(params);
          });
        } else {
          console.warn('Não conseguimos nos conecta ao facebook, tente novamente em alguns instantes!');
        }
      });
    };

    obj.createFb = function(data, callback) {
      $http.post(apiUrl + '/api/v1/users/', data, { headers: { 'Content-Type': 'application/json' }}).then(function (data) {
          sessionStorage.setItem('authorization', data.headers()['authorization']);
          callback(data);
        }, function (error) {
          callback(error);
        });
    };

    obj.loginFb = function(data, callback) {
      $http.post(apiUrl + '/api/v1/auth/fb/', data, { headers: { 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('authorization') }}).then(function (data) {
          callback(data);
        }, function (error) {
          callback(error);
        });
    };

    // obj.authTwitter = function(callback) {
    //   var params = {};

    //   OAuth.initialize('VrRWgnnAU3aUm5PNeaBM42oj5Cs');

    //   OAuth.popup('twitter').done(function(result) {
    //     console.log(result);
    //   }).fail(function (err) {
    //     console.log(err);
    //   });
    // };

    return obj;

  });
