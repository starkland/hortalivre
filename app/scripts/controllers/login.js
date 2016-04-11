'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('LoginCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

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
    $scope.login = {};

    $scope.loginEmail = function() {
      var params = $scope.login;
      console.log('Enviando -> ', params);

      // adiciona um user no rootScope pra poder esconder e exibir o header
      $rootScope.user = true;

      $location.path('/mapa');
    }
    // ====


  }]);
