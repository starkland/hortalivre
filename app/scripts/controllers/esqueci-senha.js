'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:EsqueciSenhaCtrl
 * @description
 * # EsqueciSenhaCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('EsqueciSenhaCtrl', ['$scope', 'UserApi', '$location', function ($scope, UserApi, $location) {

    // ====
    // Recuperar senha
    $scope.screen = {};
    $scope.error = {};

    $scope.recuperarSenha = function() {
      $scope.progressbar.start();

      var params = $scope.screen;

      // return console.log(params);

      UserApi.recoverPass(params, function(response) {
        if(response.status === 200) {
          $scope.$emit('recover_pass_ok');
          $scope.progressbar.complete();

          $location.path('/login');
        } else if (response.status === 404) {
          $scope.error.type = 'not-found';

          $scope.progressbar.complete();
        } else {
          $scope.error.type = 'recover-pass'; // unknown error

          $scope.progressbar.complete();
        }
      })
    };
    // ====

  }]);
