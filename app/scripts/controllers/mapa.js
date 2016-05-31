'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:MapaCtrl
 * @description
 * # MapaCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('MapaCtrl', ['$scope', '$rootScope', 'Notification', 'LocalStorage', 'GardenApi', 'UserApi', 'FavoriteApi', function ($scope, $rootScope, Notification, LocalStorage, GardenApi, UserApi, FavoriteApi) {

    // ====
    $scope.link = function(param) { link(param); };

    function link(args) {
      var win;

      win = window.open(args, '_blank');
      return win.focus();
    }
    // ====

    // ====
    // Método para geolocalização
    function _getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition, error);
      } else {
        Notification.show('Atenção', 'Geolocalização não é suportado pelo seu navegador.');
      }
    }

    function savePosition(position) {
      var ls_position, fake_position;

      LocalStorage.SaveUserPosition(position);
      ls_position = LocalStorage.getItem('HRTLVR_POS');

      if (ls_position !== null) {
        $scope.$emit('position_ok');
      } else {
        Notification.show('Atenção', 'É necessário alterar as configurações de privacidade do seu GPS para um perfeito funcionamento do Hortalivre.');

        fake_position = {
          'latitude': -13.569368,
          'longitude': -56.5357314
        };

        LocalStorage.SaveFakePosition(fake_position);
        $scope.$emit('position_fake');
      }
    }

    function error(err) {
      Notification.show('Atenção', err);
    }
    // ====

    // ====
    // Métodos do mapa
    function _initialize(args) {
      var ls_position, userPosition, map, userMarker, userRadius, styles, styledMap, drawingManager;

      ls_position = LocalStorage.getItem('HRTLVR_POS');

      userPosition = new google.maps.LatLng(ls_position.lat, ls_position.lng);

      map = new google.maps.Map(document.getElementById('map-primary'), {
        center: userPosition,
        zoom: 15,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        zoomControl: true,
        scrollwheel: false,
        draggable: true,
        zIndex: 100,
        title: 'Você está aqui',
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      });

      userMarker = new google.maps.Marker({
        position: userPosition,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-32.png'
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
      ];

      styledMap = new google.maps.StyledMapType(styles, {
        name: "Horta Map"
      });

      userRadius.bindTo('center', userMarker, 'position');

      $scope.bounds = new google.maps.LatLngBounds();

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

      if (args === 'zoom') {
        map.setZoom(4);
        userMarker.setMap(null);
      }

      // Aplicando as configurações do mapa
      map.mapTypes.set('horta_map', styledMap);
      map.setMapTypeId('horta_map');

      // Eventos
      // carrega mais marcadores
      // google.maps.event.addListener(map, 'idle', _showMarkers);

      // Permite o usuário desenhar no mapa
      // google.maps.event.addListener(drawingManager, 'polygoncomplete', _getCoordinates);

      // setando alguns métodos no $scope
      $scope.map = map;
      $rootScope.map = map;
      $scope.userMarker = userMarker;

      $scope.$emit('hortamap_ok');
    }

    // obtém os marcadores da api
    function _getMarkersByApi() {
      var arr_gardens, arr_markets, all_arr, params, user_position;

      user_position = LocalStorage.getItem('HRTLVR_POS');

      arr_gardens = [];
      arr_markets = [];

      params = {
        lat: user_position.lat,
        lng: user_position.lng,
      };

      GardenApi.All(function(response) {
        var gardens, markets;

        if (response.status === 200) {
          gardens = response.data.gardens;
          markets = response.data.markets;

          if (gardens.length > 0){
            angular.forEach(gardens, function(i) {
              arr_gardens.push({
                id: i._id,
                lat: i.geolocation[1],
                lng: i.geolocation[0],
                garden: i.garden,
                type: 'garden',
                email: i.email,
                fullName: i.fullName
              });
            });
          } else { console.warn('nenhuma horta'); }

          if (markets.length > 0){
            angular.forEach(markets, function(i) {
              arr_markets.push({
                id: i._id,
                title: i.title,
                lat: i.geolocation[1],
                lng: i.geolocation[0],
                rating_value: i.rating_value,
                type: i.type,
                link: i.link
              });
            });
          } else { console.warn('nenhuma feira'); }

          all_arr = arr_gardens.concat(arr_markets);

          $scope.arr_gardens = arr_gardens;
          $scope.arr_markets = arr_markets;
          $scope.all_arr = all_arr;

          // console.warn('todos os arrays:', all_arr);

          $scope.$emit('pins_ok');
        } else {
          Notification.show('Atenção', 'Tivemos um problema no nosso servidor, tente em instantes.');
        }
      });
    }

    // obtém todos os marcadores e insere no mapa
    function _addMarkers() {
      var arrayMarkers, marker;

      arrayMarkers = [];

      $scope.infowindow = new google.maps.InfoWindow();

      arrayMarkers = $scope.all_arr;

      $scope.mapsMarkers = [];
      $scope.marker_click = '';

      for(var i = 0; i < arrayMarkers.length; i++ ) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(arrayMarkers[i].lat, arrayMarkers[i].lng),
          map: $scope.map,
          clickable: true,
          title: arrayMarkers[i].title,
          zIndex: 90,
          icon: _checkIcon(arrayMarkers[i].type),
          animation: google.maps.Animation.DROP,
          data: {
            "title": arrayMarkers[i].title,
            "geolocation": [arrayMarkers[i].lat, arrayMarkers[i].lng],
            "type": arrayMarkers[i].type,
            "link": arrayMarkers[i].link,
            "rating_value": arrayMarkers[i].rating_value,

            "email": arrayMarkers[i].email,
            "fullName": arrayMarkers[i].fullName,
            "garden": arrayMarkers[i].garden,
            "address": arrayMarkers[i].address,
            "id": arrayMarkers[i].id
          }
        });

        $scope.mapsMarkers.push(marker);

        // agrupa os marcadores na view
        $scope.bounds.extend(new google.maps.LatLng(arrayMarkers[i].lat, arrayMarkers[i].lng));
        $scope.map.fitBounds($scope.bounds);

        // Infowindow com o título da denúncia
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {

            $scope.$emit('marker_click', { marker: marker, id: i });

            if (marker.data.type !== 'garden') {
              // feiras
              var string = "<h5>" + marker.data.title + "</h5>" + "<p>Avaliações: " + "<b>" + marker.data.rating_value + "</b>" + "<p>" + "Mais informações: " + "<b>" + "<a href=" + marker.data.link + " target='_blank'>link</a>" + "</b>" + "</p>";

              $scope.infowindow.setContent(string);
            } else {
              // hortas
              $scope.infowindow.setContent(marker.data.fullName);
            }

            $scope.infowindow.open($scope.map, marker);

            // centraliza o mapa no marcador clicado
            $scope.map.panTo(marker.position);
          };
        })(marker, i));
      }
    }

    // obtém mais marcadores quando move o mapa
    // function _showMarkers() {
    //   var bounds, south, south_lat, south_lng, north,
    //   north_lat, north_lng, center_lat, center_lng,
    //   marker, latLng, map, params;

    //   map = $scope.map;

    //   bounds = map.getBounds();

    //   // south = map.getBounds().getSouthWest();
    //   south_lat = map.getBounds().getSouthWest().lat();
    //   south_lng = map.getBounds().getSouthWest().lng();

    //   // north = map.getBounds().getNorthEast();
    //   north_lat = map.getBounds().getNorthEast().lat();
    //   north_lng = map.getBounds().getNorthEast().lng();

    //   center_lat = (south_lat + north_lat) / 2;
    //   center_lng = (south_lng + north_lng) / 2;

    //   latLng = {
    //     'lat': center_lat,
    //     'lng': center_lng
    //   };

    //   params = latLng;

    //   GardenApi.ByLatLng(params, function(response) {
    //     // console.warn('response', response);

    //     var gardens, markets, arr_gardens, arr_markets, all_arr;

    //     arr_gardens = [];
    //     arr_markets = [];

    //     if (response.status === 200) {
    //       gardens = response.data.gardens;
    //       markets = response.data.markets;

    //       if (gardens.length > 0){
    //         angular.forEach(gardens, function(i) {
    //           arr_gardens.push({
    //             id: i._id,
    //             lat: i.geolocation[1],
    //             lng: i.geolocation[0],
    //             garden: i.garden,
    //             type: 'garden',
    //             email: i.email,
    //             fullName: i.fullName,
    //             address: 'Av cruz de rebouças, 1222, TIJIPIÓ - PE'
    //           });
    //         });
    //       } else { console.warn('nenhuma horta'); }

    //       if (markets.length > 0){
    //         angular.forEach(markets, function(i) {
    //           arr_markets.push({
    //             id: i._id,
    //             title: i.title,
    //             lat: i.geolocation[1],
    //             lng: i.geolocation[0],
    //             rating_value: i.rating_value,
    //             type: i.type,
    //             link: i.link
    //           });
    //         });
    //       } else { console.warn('nenhuma feira'); }

    //       all_arr = arr_gardens.concat(arr_markets);

    //       $scope.arr_gardens = arr_gardens;
    //       $scope.arr_markets = arr_markets;
    //       $scope.all_arr = all_arr;

    //       // console.warn('aqui caralho de asa voador', all_arr);

    //       $scope.$emit('pins_ok');
    //     } else {
    //       Notification.show('Atenção', 'Tivemos um problema no nosso servidor, tente em instantes.');
    //     }
    //   });

    //   // marker = new google.maps.Marker({
    //   //   position: new google.maps.LatLng(latLng.lat, latLng.lng),
    //   //   map: map,
    //   //   icon: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-64.png'
    //   // });

    //   // $scope.infowindow = new google.maps.InfoWindow({
    //   //   content: 'lat: ' + center_lat + ', lng: ' + center_lng,
    //   //   maxWidth: 700
    //   // });

    //   // google.maps.event.addListener(marker, 'click', function(e, i) {
    //   //   console.warn('EEE -> ', e);
    //   //   console.warn('III -> ', i);

    //   //   $scope.infowindow.open(map, marker);
    //   // });
    // }

    // obtém as coordenadas de acordo com o desenho no mapa
    // function _getCoordinates(polygon) {
    //   var coordinates;

    //   coordinates = (polygon.getPath().getArray());

    //   console.warn('Coordenadas que foram desenhadas: ', coordinates);
    // }


    function _checkIcon(type) {
      if (type === 'garden') {
        return '../../images/marker-garden.svg';
      } else {
        return '../../images/marker-fairs.svg';
      }
    }
    // ====


    $scope.loadMap = function() {
      _initialize();
    };

    $scope.$on('hortamap_ok', function() {
      _getMarkersByApi();
    });

    $scope.$on('pins_ok', function() {
      _addMarkers();
    });

    $scope.$on('marker_click', function(event, args) {
      console.log(args.marker.data);

      $scope.$apply(function() {
        $scope.markerInfo = args.marker.data;
      });
    });

    // ====
    // float buttons do mapa
    $scope.viewAllMarkers = function() {
      var element = $('.wrapper-box-map').hasClass('active');

      if (element !== false) {
        $('.wrapper-box-map').toggleClass('active');
      }

      $scope.infowindow.close();

      $scope.map.fitBounds($scope.bounds);

      angular.forEach($scope.mapsMarkers, function(i) {
        i.setVisible(true);
      });

      delete $scope.markerInfo;
    };

    $scope.backMyLocation = function() {
      $scope.infowindow.close();

      $scope.map.setZoom(14);
      $scope.map.setCenter($scope.userMarker.getPosition());
    };

    $scope.searchByGarden = function() {
      $scope.infowindow.close();

      angular.forEach($scope.mapsMarkers, function(i) {
        if (i.data.type !== 'garden') {
          i.setVisible(false);
        } else {
          i.setVisible(true);
        }
      });
    };

    $scope.searchByFairs = function() {
      $scope.infowindow.close();

      angular.forEach($scope.mapsMarkers, function(i) {
        if (i.data.type !== 'feira') {
          i.setVisible(false);
        } else {
          i.setVisible(true);
        }
      });
    };
    // ====

    // ====
    // adicionar aos favoritos
    $scope.addToFavorite = function(id) {
      var params = { favID: id };

      FavoriteApi.Add(params, function(response) {
        if (response.status === 201) {
          Notification.show('Atenção', 'O usuário foi adicionado aos favoritos.');

          UserApi.lookup(function(response) {
            if (response.status === 200) {
              LocalStorage.SaveUser(response.data);
            } else {
              console.warn('lookup: ', response);
              Notification.show('Atenção', 'Tivemos um problema no nosso servidor. Tente novamente em instantes.');
            }
          });

        } else {
          console.warn('status: ', response.status);
          Notification.show('Atenção', 'Tivemos um problema ao adicionar o usuário como favorito. Tente novamente em instantes.');
        }
      });
    };
    // ====

  }]);
