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
      LocalStorage.remove('HRTLVR');
      LocalStorage.remove('HRTLVR_POS');
      LocalStorage.remove('HRTLVR_POS_FAKE');

      $rootScope.user_logged = false;
      delete $rootScope.userInfo;

      $location.path('/');
    };
    // ====


    $scope.logout = function() {
      _logout();
    };
    // ====

  }]);
