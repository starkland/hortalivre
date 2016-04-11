'use strict';

describe('Controller: FavoritosCtrl', function () {

  // load the controller's module
  beforeEach(module('hortalivreApp'));

  var FavoritosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FavoritosCtrl = $controller('FavoritosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FavoritosCtrl.awesomeThings.length).toBe(3);
  });
});
