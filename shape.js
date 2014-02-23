var Shapes = require('./shapes');

module.exports = Shape;

function Shape(x, y, name, board) {
  this.board = board;
  this.colour = Shapes.colours[name];
  this.data = Shapes.shapes[name];
  this.name = name;
  this.x = x;
  this.y = y;
}

Shape.prototype.atBottom = function() {
  return this.y >= (this.board.height - 1) || this.board.checkCollision(this, 0);
};

Shape.prototype.moveDown = function() {
  if (!this.atBottom()) {
    this.y++;
  } else {
    this.makeStuck();
  }
};

Shape.prototype.makeBlankCells = function() {
  var cells = [];

  for (var y = 0; y < this.data.length; y++) {
    cells[y] = [];
    for (var x = 0; x < this.data[y].length; x++) {
      cells[y][x] = 0;
    }
  }

  return cells;
};

Shape.prototype.moveLeft = function() {
  if (this.board.checkMoveLeft()) {
    this.x--;
  }
};

Shape.prototype.moveRight = function() {
  if (this.board.checkMoveRight()) {
    this.x++;
  }
};

Shape.prototype.rotate = function() {
  if (this.name === 'O') return;

  var matrix = Shapes.rotations[this.data.length];
  var cells = this.makeBlankCells();
  var tx;
  var ty;

  for (var y = 0; y < this.data.length; y++) {
    for (var x = 0; x < this.data[y].length; x++) {
      if (this.data[y][x] === 1) {
        tx = x + matrix[y][x][0];
        ty = y + matrix[y][x][1];

        cells[ty][tx] = 1;
      }
    }
  }

  this.data = cells;
};

Shape.prototype.makeStuck = function() {
  this.board.addShape(this.board.currentShape);
  this.board.makeShape();
};

Shape.prototype.toString = function() {
  var str = '\n';

  this.data.forEach(function(cells, i) {
    str += i + '   ' + cells.join(', ') + '\n';
  });

  return str;
};
