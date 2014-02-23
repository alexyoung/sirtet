var EventEmitter = require('events').EventEmitter;
var Shapes = require('./shapes');
var Shape = require('./shape');
var util = require('util');

module.exports = Board;

function Board(width, height) {
  EventEmitter.call(this);
  this.running = true;
  this.moveDown = false;

  this.width = width;
  this.height = height;

  this.cells = this.makeCells();
  this.addWalls();
  this.score = 0;

  this.updateScore();
  this.makeShape();
}

util.inherits(Board, EventEmitter);

Board.prototype.makeCells = function() {
  var cells = [];

  for (var y = 0; y < this.height; y++) {
    cells.push(this.makeLine());
  }

  return cells;
};

Board.prototype.makeLine = function() {
  var cells = [];

  for (var x = 0; x < this.width; x++) {
    cells.push(0);
  }

  return cells;
};

Board.prototype.addWalls = function() {
  var i;
  var x;
  var y;

  for (y = 0; y < this.height; y++) {
    for (x = 0; x < this.width; x++) {
      if (y === this.height - 1 || x === 0 || x === this.width - 1) {
        this.cells[y][x] = 1;
      }
    }
  }
};

Board.prototype.addShape = function(shape) {
  var x = shape.x;
  var y = shape.y;

  for (var i = 0; i < shape.data.length; i++) {
    this.copyCells(x, y + i - 1, shape.data[i], shape.colour);
  }
};

Board.prototype.toString = function() {
  var mapped;
  var str = '\n';

  this.cells.forEach(function(cells, i) {
    mapped = cells.map(function(c) {
      if (c === 0) {
        return ' ';
      } else if (c === 1) {
        return 'W';
      } else {
        return 'P';
      }
    }).join(', ');
    str += (i % 10) + '   ' + mapped + '\n';
  });

  return str;
};

Board.prototype.copyCells = function(x, y, data, colour) {
  var cells = this.cells;

  data.forEach(function(d, i) {
    if (cells && cells[y] && cells[y][i + x] === 0) {
      cells[y][i + x] = d !== 0 ? colour : 0;
    }
  });
};

Board.prototype.makeShape = function(nameOverride) {
  if (this.running) {
    var name = nameOverride || Shapes.random();
    this.removeFullLines();
    this.currentShape = new Shape((this.width / 2) - 2, 1, name, this);
    this.emit('shape', this.currentShape);
    this.checkGameOver();
  }
};

Board.prototype.checkGameOver = function() {
  if (this.checkCollision(this.currentShape, 0)) {
    this.running = false;
    this.emit('gameover');
  }
};

Board.prototype.checkCollision = function(shape, xOffset) {
  for (var i = 0; i < shape.data.length; i++) {
    if (this.checkLine(i, xOffset, i, shape)) {
      return true;
    }
  }

  return false;
};

Board.prototype.checkLine = function(i, xOffset, yOffset, shape) {
  var cells = this.cells;

  return shape.data[i].some(function(d, x) {
    return d !== 0 && cells[shape.y + yOffset][shape.x + x + xOffset] !== 0;
  });
};

Board.prototype.checkMoveRight = function() {
  var shape = new Shape(this.currentShape.x + 1, this.currentShape.y - 1, this.currentShape.name, this);
  shape.data = this.currentShape.data;
  return !this.checkCollision(shape, 0);
};

Board.prototype.checkMoveLeft = function() {
  var shape = new Shape(this.currentShape.x - 1, this.currentShape.y - 1, this.currentShape.name, this);
  shape.data = this.currentShape.data;
  return !this.checkCollision(shape, 0);
};

Board.prototype.checkRotation = function() {
  if (this.currentShape.name === 'O') return false;

  var shape = new Shape(this.currentShape.x, this.currentShape.y, this.currentShape.name, this);
  shape.data = this.currentShape.data;
  shape.rotate();
  return !this.checkCollision(shape, 0);
};

Board.prototype.removeFullLines = function() {
  this.cells.slice(0, this.cells.length - 1).some(function(cells, i) {
    if (cells.some(function(cell) { return cell === 0; })) {
      return false;
    } else {
      this.removeLine(i);
    }
  }.bind(this));
};

Board.prototype.removeLine = function(i) {
  this.score++;
  this.updateScore();

  this.cells.splice(i, 1);
  this.cells.unshift(this.makeLine());
  this.cells[0][0] = 1;
  this.cells[0][this.width - 1] = 1;
};

Board.prototype.updateScore = function(i) {
  this.emit('score', this.score);
};
