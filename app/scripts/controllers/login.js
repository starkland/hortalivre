'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'UserApi', 'LocalStorage', function ($scope, $location, $rootScope, UserApi, LocalStorage) {

    // ====
    $scope.fbLogin = function() {
      console.log('Facebook')
    }
    // ====

    // ====
    $scope.twLogin = function() {
      console.log('Twitter')
    }
    // ====

    // ====
    // Login
    $scope.login = {};
    $scope.error = {};

    $scope.loginEmail = function() {
      $scope.progressbar.start();

      var params = $scope.login;

      UserApi.authEmail(params, function(response) {
        if(response.status === 200) {
          LocalStorage.SaveUser(response.data);

          $rootScope.user_logged = true; // altera o header
          $scope.$emit('user_logged');
          $scope.progressbar.complete();

          $location.path('/mapa');
        } else if (response.status === 401) {
          $scope.error.type = 'unauthorized';

          $scope.progressbar.complete();
        } else {
          $scope.error.type = 'login-user';

          $scope.progressbar.complete();
        }
      })
    }
    // ====


  }]);
