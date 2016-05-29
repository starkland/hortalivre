'use strict';

/**
 * @ngdoc overview
 * @name hortalivreApp
 * @description
 * # hortalivreApp
 *
 * Main module of the application.
 */
angular
  .module('hortalivreApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngProgress',
    'angularMoment',
    'ngMask',
    'ngFacebook'
  ])
  .config(function ($routeProvider, $facebookProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/components', {
        templateUrl: 'views/components.html',
        controller: 'ComponentsCtrl',
        controllerAs: 'components'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/cadastro', {
        templateUrl: 'views/cadastro.html',
        controller: 'CadastroCtrl',
        controllerAs: 'cadastro'
      })
      .when('/esqueci-senha', {
        templateUrl: 'views/esqueci-senha.html',
        controller: 'EsqueciSenhaCtrl',
        controllerAs: 'esqueciSenha'
      })
      .when('/perfil', {
        templateUrl: 'views/perfil.html',
        controller: 'PerfilCtrl',
        controllerAs: 'perfil'
        // ,resolve: { loggedin: checkLoggedOut }
      })
      .when('/mapa', {
        templateUrl: 'views/mapa.html',
        controller: 'MapaCtrl',
        controllerAs: 'mapa'
        // ,resolve: { loggedin: checkLoggedOut }
      })
      .when('/favoritos', {
        templateUrl: 'views/favoritos.html',
        controller: 'FavoritosCtrl',
        controllerAs: 'favoritos'
        // ,resolve: { loggedin: checkLoggedOut }
      })
      .otherwise({
        redirectTo: '/login'
      });

    $facebookProvider.setAppId('351112045059351');
  })
  .run(['$window', '$rootScope', 'Notification', 'ngProgressFactory', function ($window, $rootScope, Notification, ngProgressFactory) {

    // ====
    // Offline status
    $rootScope.online = navigator.onLine;

    $window.addEventListener("offline", function () {
      $rootScope.$apply(function() {
        $rootScope.online = false;
        $rootScope.$emit('network_changed');
      });
    }, false);

    $window.addEventListener("online", function () {
      $rootScope.$apply(function() {
        $rootScope.online = true;
        $rootScope.$emit('network_changed');
      });
    }, false);

    function _setOnlineFavicon() {
      var link;

      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = 'https://angrytaxis.com/favicon.ico';

      document.getElementsByTagName('head')[0].appendChild(link);
    }

    function _setOfflineFavicon() {
      var link;

      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = 'https://angrytaxis.com/favicon-off.ico';

      document.getElementsByTagName('head')[0].appendChild(link);
    }

    $rootScope.$on('network_changed', function() {
      if ($rootScope.online === true) {
        Notification.show('UHUL!', 'Sua internet voltou a funcionar :)');
        // _setOnlineFavicon();
      } else {
        Notification.show('OPS!', 'Você parece está com problemas de internet :(');
        // _setOfflineFavicon();
      }
    })
    // ====

    // ====
    // Barra de progresso
    $rootScope.progressbar = ngProgressFactory.createInstance();
    $rootScope.progressbar.setColor('#16663B');
    $rootScope.progressbar.setHeight('4px');
    // ====

    // ====
    // Facebook access
    // ====

  }]);

  var checkLoggedOut = function($q, $timeout, $location, $rootScope) {
    // ====
    var deferred = $q.defer();

    if ($rootScope.userInfo) {
      deferred.resolve();
    } else {
      $timeout(deferred.reject);
      return $location.url('/login');
    }

    return deferred.promise;
    // ====
  };
