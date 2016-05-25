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
      var params = { itemID: id };

      UserApi.removeItemOfMyGarden(params, function(response) {
        console.log('retorno da fn', response);

        if (response.status === 200) {
          Notification.show('Atenção', 'Item removido com sucesso!');

          UserApi.lookup(function(response) {
            console.log('retornou isso de lookup', response);

            if (response.status === 200) {
              LocalStorage.SaveUser(response.data);
            } else {
              console.warn('status: ', response.status);
              Notification.show('Atenção', 'Tivemos um problema no nosso servidor. Tente novamente em instantes.');
            }
          })
        } else {
          console.warn('status: ', response.status);
          Notification.show('Atenção', 'Tivemos um problema para remover este ítem, tente novamente em alguns minutos.');
        }
      });
    }

    // ====
    $scope.inputs = [];

    $scope.addInput = function() {
      $scope.inputs.push({
        inPlaceholder: "nome",
        inModel: ""
      });
    };
    // ====

  }]);
