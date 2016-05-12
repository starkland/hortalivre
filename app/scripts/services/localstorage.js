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

    obj.getItem = function (key) {
      return JSON.parse(localStorage.getItem(key));
    };

    obj.remove = function (key) {
      localStorage.removeItem(key);
    };

    obj.SaveUser = function (obj) {
      user_storage._id = obj._id;
      user_storage.createdAt = obj.createdAt;
      user_storage.email = obj.email;
      user_storage.favorites = obj.favorites;
      user_storage.fullName = obj.fullName;
      user_storage.garden = obj.garden;
      user_storage.geolocation = obj.geolocation;
      user_storage.updatedAt = obj.updatedAt;

      localStorage.setItem('HRTLVR', JSON.stringify(user_storage));
    };

    return obj;
  });
