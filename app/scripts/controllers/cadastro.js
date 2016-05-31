'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('CadastroCtrl', ['$scope', '$http', 'UserApi', 'LocalStorage', '$location', '$rootScope', function ($scope, $http, UserApi, LocalStorage, $location, $rootScope) {

    // ====
    $scope.fbCadastro = function() {
      facebookLogin();
    };

    function facebookLogin() {
      $scope.progressbar.start();

      var user_fb_data = {};

      UserApi.authFacebook(function(result) {
        user_fb_data.email = result.user_fb_data.email;
        user_fb_data.gender = result.user_fb_data.gender;
        user_fb_data.id = result.user_fb_data.id;
        user_fb_data.name = result.user_fb_data.name;
        user_fb_data.picture = result.user_fb_data.picture.data.url;
        user_fb_data.access_token = result.access_token;

        $scope.user_fb_data = user_fb_data;

        $scope.$emit('fb_ok');
      });
    }

    $scope.$on('fb_ok', function() {
      var params = {};
      var ls = LocalStorage.getItem('HRTLVR_POS');

      params = {
        gender: $scope.user_fb_data.gender,
        fullName: $scope.user_fb_data.name,
        email: $scope.user_fb_data.email,
        lat: ls.lat.toString(),
        lng: ls.lng.toString(),
        // fullAddress: '',
        platform: 'web',
        social : {
          email: $scope.user_fb_data.email,
          gender: $scope.user_fb_data.gender,
          id: $scope.user_fb_data.id,
          name: $scope.user_fb_data.name,
          picture: $scope.user_fb_data.picture,
          accessToken: $scope.user_fb_data.access_token
        }
      };

      // console.log(params);

      UserApi.createFb(params, function(result) {
        if (result.status === 201) {
          LocalStorage.SaveUser(result.data);

          $rootScope.user_logged = true; // altera o header
          $scope.$emit('user_created');
          $scope.progressbar.complete();

          $location.path('/mapa');
        } else if (result.status === 422) {
          Notification.show('Atenção', 'Já existe um usuário cadastrado para este e-mail!')
        } else {
          $scope.error.status = result.status;
          $scope.error.type = 'create-user';

          $scope.progressbar.complete();
        }
      })
    });
    // ====

    // ====
    // $scope.twCadastro = function() {
    //   console.log('Twitter')
    // };
    // ====

    // ====
    // Cadastro via e-mail
    $scope.cadastro = {};
    $scope.error = {};

    $scope.cadastroEmail = function() {
      $scope.progressbar.start();

      var params = $scope.cadastro;

      // verifica se existe endereço
      // e pega a lat/lng do endereço fornecido
      if (params.address) {
        delete params.address;

        params.lat = $scope.formatted_address_location.lat.toString();
        params.lng = $scope.formatted_address_location.lng.toString();
        params.fullAddress = $scope.formatted_address;
      } else {
        $scope.error.type = 'address';
        return $scope.progressbar.complete();
      }

      // verifica se termos foi marcado
      // realiza o cadastro
      if (!params.termos) {
        $scope.error.type = 'terms';
        return $scope.progressbar.complete();
      } else {
        delete params.termos;

        UserApi.create(params, function(response) {
          if (response.status === 201) {
            LocalStorage.SaveUser(response.data);

            $rootScope.user_logged = true; // altera o header
            $scope.$emit('user_created');
            $scope.progressbar.complete();

            $location.path('/mapa');
          } else {
            $scope.error.status = response.status;
            $scope.error.type = 'create-user';

            $scope.progressbar.complete();
          }
        });
      }
    }
    // ====

    // ====
    // Autocomplete para pesquisa do endereço
    $scope.autoComplete = function(address) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          sensor: false,
          language: 'pt-BR'
        }
      }).then(function(response){
        return response.data.results.map(function(item){
          $scope.formatted_address = item.formatted_address;
          $scope.formatted_address_location = item.geometry.location;
          return item.formatted_address;
        });
      });
    };
    // ====

  }]);
