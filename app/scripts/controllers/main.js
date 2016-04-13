'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('MainCtrl', ['$scope', 'Notification', function ($scope, Notification) {

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
    var userPosition, map, userMarker, drawingManager, infowindow, userRadius, styles, styledMap;

    function _initMap(position) {
      userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map = new google.maps.Map(document.getElementById('map-home'), {
        center: userPosition,
        zoom: 15,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        zoomControl: true,
        scrollwheel: false,
        draggable: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      });

      userMarker = new google.maps.Marker({
        position: userPosition,
        map: map,
        animation: google.maps.Animation.DROP
      });

      userRadius = new google.maps.Circle({
        map: map,
        radius: 500,
        fillColor: '#16663a',
        fillOpacity: 0.11,
        strokeOpacity: 0.8,
        strokeColor: '#16663a',
        strokeWeight: 1
      });

      userRadius.bindTo('center', userMarker, 'position');

      infowindow = new google.maps.InfoWindow({
        content: 'Marker',
        maxWidth: 700
      });

      google.maps.event.addListener(userMarker, 'click', function() {
        map.setZoom(10);
        map.setCenter(userMarker.getPosition());

        infowindow.open(map, userMarker);
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

    styles =[
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#CECECE"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
]

      styledMap = new google.maps.StyledMapType(styles, {
        name: "Hortalivre"
      });

      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');


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
      _getLocation();
    }


    // Pesquisar as feiras
    $scope.map = {};

    $scope.searchHortas = function() {
      $scope.map.type = 'hortas';
    };

    $scope.searchFeiras = function() {
      $scope.map.type = 'feiras';
    };

    $scope.search = function() {
      var params = $scope.map;

      console.warn('Enviando -> ', params);
    }
    // ====

  }]);
