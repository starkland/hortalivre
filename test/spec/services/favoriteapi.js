'use strict';

describe('Service: FavoriteApi', function () {

  // load the service's module
  beforeEach(module('hortalivreApp'));

  // instantiate service
  var FavoriteApi;
  beforeEach(inject(function (_FavoriteApi_) {
    FavoriteApi = _FavoriteApi_;
  }));

  it('should do something', function () {
    expect(!!FavoriteApi).toBe(true);
  });

});
