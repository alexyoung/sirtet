var assert = require('assert');
var Board = require('./../board');

describe('The game board', function() {
  describe('Initialisation', function() {
    var board = new Board(10, 10);

    it('should create a shape', function() {
      assert(board.currentShape);
    });
  });

  describe('Falling', function() {
    var board = new Board(10, 10);

    it('should stop moving the shape when it hits the botton, and add a new one', function(done) {
      board.once('shape', function(newShape) {
        assert(true, 'Shape added!');
        done();
      });

      for (var y = 0; y < board.height; y++) {
        board.moveDown = true;
        board.currentShape.moveDown();
      }
    });
  });

  describe('Player movement', function() {
    it('should stop the shape moving at the left edge', function() {
      var board = new Board(10, 10);
      var lastX = board.currentShape.x;

      board.makeShape('I');

      for (var i = 1; i < 3; i++) {
        board.currentShape.moveLeft();
        assert.equal(board.currentShape.x, lastX - i);
      }

      board.currentShape.moveLeft();
      assert.equal(board.currentShape.x, lastX - 2);
    });

    it('should stop the shape moving at the right edge', function() {
      var board = new Board(10, 10);
      var lastX = board.currentShape.x;

      board.makeShape('I');

      for (var i = 1; i < 3; i++) {
        board.currentShape.moveRight();
        assert.equal(board.currentShape.x, lastX + i);
      }

      board.currentShape.moveRight();
      assert.equal(board.currentShape.x, lastX + 2);
    });
  });
});
