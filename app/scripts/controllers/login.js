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
      console.log('login')
      // facebookLogin();
    };
    // ====

    // ====
    // Login Twiteer
    $scope.twLogin = function() {
      twitterLogin();
    };
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
    // function facebookLogin() {
    //   $scope.progressbar.start();

    //   var user_fb_data = {};

    //   UserApi.authFacebook(function(result) {
    //     user_fb_data.email = result.user_fb_data.email;
    //     user_fb_data.gender = result.user_fb_data.gender;
    //     user_fb_data.id = result.user_fb_data.id;
    //     user_fb_data.name = result.user_fb_data.name;
    //     user_fb_data.picture = result.user_fb_data.picture.data.url;
    //     user_fb_data.access_token = result.access_token;

    //     $scope.user_fb_data = user_fb_data;

    //     $scope.$emit('fb_ok');
    //   });
    // }

    // $scope.$on('fb_ok', function() {
    //   var params = {};
    //   var ls = LocalStorage.getItem('HRTLVR_POS');

    //   params = {
    //     gender: $scope.user_fb_data.gender,
    //     fullName: $scope.user_fb_data.name,
    //     email: $scope.user_fb_data.email,
    //     password: "",
    //     lat: ls.lat,
    //     lng: ls.lng,
    //     fullAddress: '',
    //     platform: 'web',
    //     social : {
    //       email: $scope.user_fb_data.email,
    //       gender: $scope.user_fb_data.gender,
    //       id: $scope.user_fb_data.id,
    //       name: $scope.user_fb_data.name,
    //       picture: $scope.user_fb_data.picture,
    //       accessToken: $scope.user_fb_data.access_token
    //     }
    //   };

    //   console.log(params);

    //   UserApi.create(params, function(result) {
    //     if (result.status === 201) {
    //         LocalStorage.SaveUser(result.data);

    //         $rootScope.user_logged = true; // altera o header
    //         $scope.$emit('user_created');
    //         $scope.progressbar.complete();

    //         $location.path('/mapa');
    //       } else {
    //         $scope.error.status = result.status;
    //         $scope.error.type = 'create-user';

    //         $scope.progressbar.complete();
    //       }
    //   })
    // });
    // ====

    // ====
    function twitterLogin() {
      UserApi.authTwitter(function(result) {
        console.log(result);
      });
    }
    // ====

  }]);
