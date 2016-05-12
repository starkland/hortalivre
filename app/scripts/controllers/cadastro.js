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
      console.log('Facebook')
    }
    // ====

    // ====
    $scope.twCadastro = function() {
      console.log('Twitter')
    }
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
