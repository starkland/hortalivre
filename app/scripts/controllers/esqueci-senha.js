'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:EsqueciSenhaCtrl
 * @description
 * # EsqueciSenhaCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('EsqueciSenhaCtrl', function ($scope) {

    // ====
    $scope.screen = {};

    $scope.recuperarSenha = function() {
      console.log($scope.screen)
    };
    // ====

  });
