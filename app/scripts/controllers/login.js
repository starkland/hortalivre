'use strict';

/**
 * @ngdoc function
 * @name hortalivreApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hortalivreApp
 */
angular.module('hortalivreApp')
  .controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'UserApi', 'LocalStorage', 'Notification', function ($scope, $location, $rootScope, UserApi, LocalStorage, Notification) {

    // ====
    // Login facebook
    $scope.fbLogin = function() {
      // console.log('login')
      facebookLogin();
    };
    // ====

    // ====
    // Login Twiteer
    // $scope.twLogin = function() {
    //   twitterLogin();
    // };
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
    };
    // ====

    // ====
    function facebookLogin() {
      $scope.progressbar.start();

      var user_fb_data = {};

      UserApi.authFacebook(function(result) {
        user_fb_data.displayName = result.displayName;
        user_fb_data.email = result.email;
        user_fb_data.fbID = result.uid;
        user_fb_data.photo = result.photoURL;
        user_fb_data.last_access = new Date().getTime();

        $scope.user_fb_data = user_fb_data;

        $scope.$emit('fb_ok');
      });
    }

    $scope.$on('fb_ok', function() {
      var params;

      params = $scope.user_fb_data;

      LocalStorage.SaveUser(params);

      $rootScope.user_logged = true; // altera o header
      $scope.$emit('user_created');
      $scope.progressbar.complete();

      $location.path('/mapa');


      // UserApi.loginFb(params, function(result) {
      //   if (result.status === 200) {
      //       LocalStorage.SaveUser(result.data);

      //       $rootScope.user_logged = true; // altera o header
      //       $scope.$emit('user_created');
      //       $scope.progressbar.complete();

      //       $location.path('/mapa');
      //     } else {
      //       $scope.error.status = result.status;
      //       $scope.error.type = 'create-user';

      //       $scope.progressbar.complete();
      //     }
      // })
    });
    // ====

    // ====
    // function twitterLogin() {
    //   UserApi.authTwitter(function(result) {
    //     console.log(result);
    //   });
    // }
    // ====

  }]);
