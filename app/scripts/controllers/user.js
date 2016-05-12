'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('UserCtrl', ['$scope', '$rootScope', '$location', 'LocalStorage', function ($scope, $rootScope, $location, LocalStorage) {

    // ====
    // Logout
    function _logout() {
      $rootScope.user_logged = false;
      $location.path('/');
      LocalStorage.remove('HRTLVR');
    };
    // ====


    $scope.logout = function() {
      _logout();
    };
    // ====

  }]);
