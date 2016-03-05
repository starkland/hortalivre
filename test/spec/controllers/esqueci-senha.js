'use strict';

describe('Controller: EsqueciSenhaCtrl', function () {

  // load the controller's module
  beforeEach(module('hortalivreApp'));

  var EsqueciSenhaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EsqueciSenhaCtrl = $controller('EsqueciSenhaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EsqueciSenhaCtrl.awesomeThings.length).toBe(3);
  });
});
