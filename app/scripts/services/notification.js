'use strict';

/**
 * @ngdoc service
 * @name hortalivreApp.Notification
 * @description
 * # Notification
 * Service in the hortalivreApp.
 */
angular.module('hortalivreApp')
  .service('Notification', function () {
    function getStatus () {
      if (!window.Notification) {
        return "unsupported";
      }

      return window.Notification.permission;
    }

    function getPermission(params) {
      if (Notification.permission === 'granted') {
        spawnNotification(params);
      }

      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
          if (permission === 'granted') {
            spawnNotification(params);
          }
        });
      }
    }

    function spawnNotification(params) {
      var options = {
        body: params.message,
        icon: params.icon
      };

      var n = new Notification(params.title, options);
      setTimeout(n.close.bind(n), 5000);
    }

    var obj = {};

    // status == 'success' || 'error' || 'alert'
    obj.show = function(status,title, message) {
      var params = {
        title: title,
        message: message,
        icon: '../../images/icon-'+status+'.png'
      };

      if (getStatus() === "unsupported") { return; }
      getPermission(params);
    };

    return obj;
  });
