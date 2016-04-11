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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
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
      })
      .when('/mapa', {
        templateUrl: 'views/mapa.html',
        controller: 'MapaCtrl',
        controllerAs: 'mapa'
      })
      .when('/favoritos', {
        templateUrl: 'views/favoritos.html',
        controller: 'FavoritosCtrl',
        controllerAs: 'favoritos'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
