var assert = require('assert');
var Shapes = require('./../shapes');

describe('shapes', function() {
  it('should return random shape names', function() {
    assert(Shapes.random());
  });
});
