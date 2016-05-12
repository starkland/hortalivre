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

    function _getFullAddress() {
      console.log('cheguei na funçào');

      var ls_position, geocoder;

      ls_position = LocalStorage.getItem('HRTLVR_POS');

      geocoder = new google.maps.Geocoder();

      geocoder.geocode({'latLng': ls_position}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            $rootScope.userInfo.garden_address = results[0].formatted_address;
            console.log($rootScope.userInfo.garden_address);

            $scope.$emit('user_garden_address');
          } else {
            console.warn('Não conseguimos localizar do seu endereço.');
            // Notification.show('Atenção', 'Não conseguimos localizar o seu endereço.');
          }
        } else {
          console.warn('Tivemos um problema para localização o seu endereço', status);
          // Notification.show('Atenção', 'Tivemos um problema para localização do seu endereço ' + status);
        }
      });
    };
    // ====


    $scope.logout = function() {
      _logout();
    };

    $rootScope.$on('user_logged', function() {
      _getFullAddress();
    })
    // ====

  }]);
