'use strict';

describe('Service: geocode', function () {

  // load the service's module
  beforeEach(module('hortalivreApp'));

  // instantiate service
  var geocode;
  beforeEach(inject(function (_geocode_) {
    geocode = _geocode_;
  }));

  it('should do something', function () {
    expect(!!geocode).toBe(true);
  });

});
