'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:MapaCtrl
 * @description
 * # MapaCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('MapaCtrl', function ($scope) {

    // ====
    // Get user location
    function getLocation() {
      if (navigator.geolocation) {
        console.log('Get userlocation...');
        navigator.geolocation.getCurrentPosition(initMap, error);
      } else {
        window.alert('Geolocation is not supported.');
      }
    }

    function error(err) {
      window.alert('Error: ', err);
    }

    getLocation();
    // ====

    // ====
    // Initialize map with user location
    function initMap(position) {
      var userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var map = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 12,
        center: userPosition,
        scrollwheel: false
      });

      var marker = new google.maps.Marker({
        map: map,
        position: userPosition
      });
    }
    // ====

    // ====
    // Search into map
    $scope.map = {};

    $scope.search = function() {
      console.log($scope.map)
    };

    $scope.searchHortas = function() {
      console.log('Hortas');
    }

    $scope.searchFeiras = function() {
      console.log('Feiras');
    }

  });
