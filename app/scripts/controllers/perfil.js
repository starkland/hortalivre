'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:PerfilCtrl
 * @description
 * # PerfilCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('PerfilCtrl', ['$scope', 'UserApi', 'Notification', 'LocalStorage', function ($scope, UserApi, Notification, LocalStorage) {

    $scope.removeItem = function(id) {
      $scope.progressbar.start();

      var params = { itemID: id };

      UserApi.removeItemOfMyGarden(params, function(response) {
        if (response.status === 200) {
          Notification.show('Atenção', 'Item removido com sucesso!');

          UserApi.lookup(function(response) {
            if (response.status === 200) {
              LocalStorage.SaveUser(response.data);
              $scope.progressbar.complete();
            } else {
              Notification.show('Atenção', 'Tivemos um problema no nosso servidor. Tente novamente em instantes.');
              $scope.progressbar.complete();
            }
          });
        } else {
          Notification.show('Atenção', 'Tivemos um problema para remover este ítem, tente novamente em alguns minutos.');
          $scope.progressbar.complete();
        }
      });
    };

    // ====
    $scope.novoItem = {};

    $scope.addItemToGarden = function() {
      var params = $scope.novoItem;

      addItemToGarden(params);
    };
    // ====

    // ====
    // funções
    function addItemToGarden(params) {
      $scope.progressbar.start();

      UserApi.addItemToMyGarden(params, function(response) {
        if(response.status === 201) {
          Notification.show('Atenção', 'Item adicionado com sucesso!');

          UserApi.lookup(function(response) {
            if (response.status === 200) {
              LocalStorage.SaveUser(response.data);
              $scope.progressbar.complete();
            } else {
              // console.warn('status: ', response.status);
              Notification.show('Atenção', 'Tivemos um problema no nosso servidor, tente novamente em instantes.');
            }
          });
        } else {
          // console.warn('status: ', response.status);
          Notification.show('Atenção', 'Tivemos um problema para remover este ítem, tente novamente em instantes.');
          $scope.progressbar.complete();
        }
      });
    }
    // ====

  }]);
