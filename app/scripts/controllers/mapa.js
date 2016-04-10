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
    var map, userPosition, marker, infowindow, bounds, south_lat, south_lng,
        north_lat, north_lng, center_lat, center_lng;

    function initMap(position) {
      userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      map = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 12,
        center: userPosition,
        scrollwheel: false
      });

      marker = new google.maps.Marker({
        map: map,
        position: userPosition,
        icon: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-32.png'
      });

      infowindow = new google.maps.InfoWindow({
        content: 'Hey You',
        maxWidth: 700
      });

      // evento para quando mexer no mapa
      // google.maps.event.addListener(map, 'idle', showMarkers);

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    }

    // Show new marker when move map
    function showMarkers() {
     bounds = map.getBounds();

     // south = map.getBounds().getSouthWest();
     south_lat = map.getBounds().getSouthWest().lat();
     south_lng = map.getBounds().getSouthWest().lng();

     // north = map.getBounds().getNorthEast();
     north_lat = map.getBounds().getNorthEast().lat();
     north_lng = map.getBounds().getNorthEast().lng();

     center_lat = (south_lat + north_lat) / 2;
     center_lng = (south_lng + north_lng) / 2;

      // console.warn('center_lat -> ', center_lat);
      // console.warn('center_lng -> ', center_lng);

      infowindow = new google.maps.InfoWindow({
        content: 'lat: ' + center_lat + ', lng: ' + center_lng,
        maxWidth: 700
      });

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(center_lat, center_lng),
        map: map
      });


      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
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
