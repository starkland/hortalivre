'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:MapaCtrl
 * @description
 * # MapaCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('MapaCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    // obtém a localização do usuário
    function _getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(_initMap, error);
      } else {
        Notification.show('error', 'Hortalivre', 'Seu browser não suporta geolocalização.')
      }
    }

    function error(error) {
      console.warn('Error: ', error);
      Notification.show('error', 'Hortalivre', error);
    }

    // inicia o mapa
    var userPosition, map, marker, drawingManager, infowindow;

    function _initMap(position) {
      userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map = new google.maps.Map(document.getElementById('map-home'), {
        center: userPosition,
        zoom: 14,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        zoomControl: true,
        scrollwheel: false,
        draggable: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        }
      });

      marker = new google.maps.Marker({
        position: userPosition,
        map: map
      });

      infowindow = new google.maps.InfoWindow({
        content: 'Marker',
        maxWidth: 700
      });

      google.maps.event.addListener(marker, 'click', function() {
        map.setZoom(10);
        map.setCenter(marker.getPosition());

        infowindow.open(map, marker);
      });

      drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        },
        polygonOptions: {
          editable: true,
          clickable: true,
          draggable: true,
          strokeColor: '#16663b',
          strokeOpacity: 0.7,
          fillColor: '#16663b',
          fillOpacity: 0.2,
          strokeWeight: 2,
        }
      });

      drawingManager.setMap(map);


      // Eventos
      // carrega mais marcadores
      google.maps.event.addListener(map, 'idle', _showMarkers);

      // Permite o usuário desenhar no mapa
      google.maps.event.addListener(drawingManager, 'polygoncomplete', _getCoordinates);
    }

    // obtém mais marcadores quando move o mapa
    function _showMarkers() {
      var bounds, south, south_lat, south_lng, north,
      north_lat, north_lng, center_lat, center_lng,
      marker, latLng;

      bounds = map.getBounds();

      // south = map.getBounds().getSouthWest();
      south_lat = map.getBounds().getSouthWest().lat();
      south_lng = map.getBounds().getSouthWest().lng();

      // north = map.getBounds().getNorthEast();
      north_lat = map.getBounds().getNorthEast().lat();
      north_lng = map.getBounds().getNorthEast().lng();

      center_lat = (south_lat + north_lat) / 2;
      center_lng = (south_lng + north_lng) / 2;

      latLng = {
        'center_lat': center_lat,
        'center_lng': center_lng
      };

      console.warn('Latitude / Longitude: ', latLng);

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(center_lat, center_lng),
        map: map,
        icon: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-32.png'
      });

      infowindow = new google.maps.InfoWindow({
        content: 'lat: ' + center_lat + ', lng: ' + center_lng,
        maxWidth: 700
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    }

    // obtém as coordenadas de acordo com o desenho no mapa
    function _getCoordinates(polygon) {
      var coordinates;

      coordinates = (polygon.getPath().getArray());

      console.warn('Coordinates of drawing: ', coordinates);
    }
    // ====

    $scope.loadMap = function() {
      // _getLocation();

      // adiciona um user no rootScope pra poder esconder e exibir o header
      $rootScope.user = true;
    }

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

  }]);
