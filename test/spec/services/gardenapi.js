'use strict';

describe('Service: GardenApi', function () {

  // load the service's module
  beforeEach(module('hortalivreApp'));

  // instantiate service
  var GardenApi;
  beforeEach(inject(function (_GardenApi_) {
    GardenApi = _GardenApi_;
  }));

  it('should do something', function () {
    expect(!!GardenApi).toBe(true);
  });

});
