'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('LoginCtrl', function ($scope) {

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
      console.log($scope.login);
    }
    // ====


  });
