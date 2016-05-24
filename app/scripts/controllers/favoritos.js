'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:FavoritosCtrl
 * @description
 * # FavoritosCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('FavoritosCtrl', ['$scope', 'FavoriteApi', function ($scope, FavoriteApi) {

    getAllFavorites();

    $scope.link = function(param) {
      link(param)
    };

    function getAllFavorites() {
      var favorites;

      FavoriteApi.All(function(response) {
        if (response.status === 200) {
          favorites = response.data.favorites;

          if (favorites.length > 0) {
            $scope.favorites = favorites;
          } else {
            Notification.show('Atenção', 'Você ainda não possui nenhum usuário favorito.');
          }
        }
      })
    }

    function link(args) {
      var win;

      win = window.open(args, '_blank');
      return win.focus();
    }

  }]);
