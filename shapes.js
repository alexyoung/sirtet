var shapes = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  O: [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]
};

var colours = {
  I: '#5BFDFF',
  J: '#F6AF00',
  L: '#3E00FF',
  O: '#FAFF00',
  S: '#44FF00',
  T: '#9C00FF',
  Z: '#F32100'
};

var rotations = {
  3: [
    [[2,  0], [ 1,  1], [ 0, 2]],
    [[1, -1], [ 0,  0], [-1, 1]],
    [[0, -2], [-1, -1], [-2, 0]]
  ],
  4: [
    [[ 0, 0], [ 2, 1], [ 1, 2], [ 0, 0]],
    [[ 2,-1], [ 1, 0], [ 0, 1], [-1, 2]],
    [[ 1,-2], [ 0,-1], [-1, 0], [-2, 1]],
    [[ 0, 0], [-1,-2], [-2,-1], [ 0, 0]]
  ]
};

var names = Object.keys(shapes);

function randomShapeName() {
  return names[Math.floor(Math.random() * names.length)];
};

module.exports = {
  shapes: shapes,
  colours: colours,
  names: names,
  random: randomShapeName,
  rotations: rotations
};
