'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('CadastroCtrl', function ($scope) {

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
    $scope.cadastro = {};

    $scope.cadastroEmail = function() {
      console.log($scope.cadastro);
    }
    // ====
  });
