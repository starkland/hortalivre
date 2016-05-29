'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'UserApi', 'LocalStorage', 'Notification', '$twitterApi',function ($scope, $location, $rootScope, UserApi, LocalStorage, Notification, $twitterApi) {

    // ====
    // Login facebook
    $scope.fbLogin = function() {
      facebookLogin();
    }
    // ====

    // ====
    // Login Twiteer
    $scope.twLogin = function() {
      twitterLogin();
    }
    // ====

    // ====
    // Login email
    $scope.login = {};
    $scope.error = {};

    $scope.loginEmail = function() {
      $scope.progressbar.start();

      var params = $scope.login;

      UserApi.authEmail(params, function(response) {
        if(response.status === 200) {
          LocalStorage.SaveUser(response.data);

          $rootScope.user_logged = true; // altera o header
          $scope.$emit('user_logged');
          $scope.progressbar.complete();

          $location.path('/mapa');
        } else if (response.status === 401) {
          $scope.error.type = 'unauthorized';

          $scope.progressbar.complete();
        } else {
          $scope.error.type = 'login-user';

          $scope.progressbar.complete();
        }
      })
    }
    // ====

    // ====
    function facebookLogin() {
      var user_fb_data = {};

      UserApi.authFacebook(function(result) {
        user_fb_data.email = result.user_fb_data.email;
        user_fb_data.gender = result.user_fb_data.gender;
        user_fb_data.id = result.user_fb_data.id;
        user_fb_data.name = result.user_fb_data.name;
        user_fb_data.picture = result.user_fb_data.picture.data.url;

        console.warn(user_fb_data);

        // envia pra api os dados e autentica o usuário
      });
    }
    // ====

    // ====
    function twitterLogin() {
      OAuth.initialize('VrRWgnnAU3aUm5PNeaBM42oj5Cs');

      OAuth.popup('twitter').done(function(result) {
        console.log(result);
      }).fail(function (err) {
        console.log(err);
      });
    }
    // ====

  }]);
