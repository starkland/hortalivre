'use strict';

/**
 * @ngdoc service
 * @name hortalivreApp.LocalStorage
 * @description
 * # LocalStorage
 * Service in the hortalivreApp.
 */
angular.module('hortalivreApp')
  .service('LocalStorage', function ($rootScope) {

    var obj = {},
    user_storage = {},
    user_position = {},
    fake_position = {};

    obj.getItem = function(key) {
      return JSON.parse(localStorage.getItem(key));
    };

    obj.remove = function(key) {
      localStorage.removeItem(key);
    };

    obj.SaveUser = function(obj) {
      user_storage = obj;

      localStorage.setItem('HRTLVR', JSON.stringify(user_storage));

      $rootScope.userInfo = user_storage;
    };

    obj.SaveUserPosition = function(obj) {
      user_position.lat = obj.coords.latitude;
      user_position.lng = obj.coords.longitude;

      localStorage.setItem('HRTLVR_POS', JSON.stringify(user_position));
    };

    obj.SaveFakePosition = function(obj) {
      fake_position.lat = obj.latitude;
      fake_position.lng = obj.longitude;

      localStorage.setItem('HRTLVR_POS_FAKE', JSON.stringify(fake_position));
    };

    return obj;
  });
