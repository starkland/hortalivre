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
      // FavoriteApi.All(function(response) {
      //   // console.log(response)
      // })

      $scope.favorites = [
        {
          image: 'http://dummyimage.com/165x165/4d494d/686a82.gif&text=placeholder+image',
          name: 'pedro borges',
          address: 'Av da consolação, algum lugar - PT',
          phone: '081 00000.0000',
          fb_link: 'http://www.facebook.com',
          tw_link: 'http://www.twitter.com'
        },
        {
          image: 'http://dummyimage.com/165x165/4d494d/686a82.gif&text=placeholder+image',
          name: 'pedro borges 2',
          address: 'Av da consolação, algum lugar - PT',
          phone: '081 00000.0000',
          fb_link: 'http://www.facebook.com',
          tw_link: 'http://www.twitter.com'
        }
      ]
    }

    function link(args) {
      var win;

      win = window.open(args, '_blank');
      return win.focus();
    }

  }]);
