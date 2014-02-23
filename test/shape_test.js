var assert = require('assert');
var Board = require('./../board');
var Shape = require('./../shape');
var Shapes = require('./../shapes');

describe('shape', function() {
  var board = new Board(10, 10);

  it('should rotate the L as expected', function() {
    var shape = new Shape(5, 5, 'L', board);
    shape.rotate();
    assert.deepEqual(shape.data, [[ 0, 1, 0 ], [ 0, 1, 0 ], [ 0, 1, 1 ]]);
    shape.rotate();
    assert.deepEqual(shape.data, [[ 0, 0, 0 ], [ 1, 1, 1 ], [ 1, 0, 0 ]]);
    shape.rotate();
    assert.deepEqual(shape.data, [[ 1, 1, 0 ], [ 0, 1, 0 ], [ 0, 1, 0 ]]);
    shape.rotate();
    assert.deepEqual(shape.data, [[ 0, 0, 1 ], [ 1, 1, 1 ], [ 0, 0, 0 ]]);
  });

  it('should rotate the I as expected', function() {
    var shape = new Shape(5, 5, 'I', board);
    shape.rotate();
    assert.deepEqual(shape.data, [[ 0, 0, 1, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 1, 0 ]]);
    shape.rotate();
    assert.deepEqual(shape.data, [[ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 1, 1, 1, 1 ], [ 0, 0, 0, 0 ]]);
    shape.rotate();
    assert.deepEqual(shape.data, [[ 0, 1, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 1, 0, 0 ]]);
  });

  it('should not rotate O', function() {
    var shape = new Shape(5, 5, 'O', board);
    shape.rotate();

    assert.deepEqual(shape.data, [[ 0, 1, 1, 0 ], [ 0, 1, 1, 0 ], [ 0, 0, 0, 0 ]]);
    shape.rotate();
    assert.deepEqual(shape.data, [[ 0, 1, 1, 0 ], [ 0, 1, 1, 0 ], [ 0, 0, 0, 0 ]]);
  });
});
