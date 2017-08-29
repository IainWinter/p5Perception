var points = [];
var p;
function setup() {
  createCanvas(500, 500);

  p = new Perceptron([1, 1]);

  for (var i = 0; i < 100; i++) {
    points[i] = new Point();
  }
}

function draw() {
  stroke(0)
  fill(255);

  for (var i = 0; i < points.length; i++) {
    points[i].show();
  }
}

class Point {
  constructor() {
    this.x = random(width - 5);
    this.y = random(height - 5);
  }

  show() {
    ellipse(this.x, this.y, 10, 10);
  }
}

class Perceptron {
  constructor(weights) {
    this.weights = weights;
  }
}
