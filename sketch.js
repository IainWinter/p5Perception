var training = new Array(500);
var perceptron;

var count = 0;

var bmin = new Point(-1, -1);
var bmax = new Point(1, 1);

var s;
var b;

function f(x) {
  var y = s * x + b;
  return y;
}

function setup() {
  createCanvas(800, 800);

  s = random(.5);
  b = random(.5);

  perceptron = new Perceptron(3, .01);
  for (var i = 0; i < training.length; i++) {
    var x = random(bmin.x, bmax.x);
    var y = random(bmin.y, bmax.y);
    var answer = 1;
    if (y < f(x)) answer = -1;
    training[i] = {
      input: [x, y, 1],
      output: answer
    };
  }
}

function draw() {
  background(255);

  // Draw the line
  strokeWeight(1);
  stroke(0);

  var plotP1 = new Point(bmin.x, f(bmin.x));
  var plotP2 = new Point(bmax.x, f(bmax.x));
  plotP1.mapToCanvas(bmin.x, bmax.x, bmin.y, bmax.y);
  plotP2.mapToCanvas(bmin.x, bmax.x, bmin.y, bmax.y);
  line(plotP1.x, plotP1.y, plotP2.x, plotP2.y);

  // Draw the line based on the current weights
  // Formula is weights[0]*x + weights[1]*y + weights[2] = 0
  stroke(0);
  strokeWeight(2);
  var weights = perceptron.weights;
  var y1 = (-weights[2] - weights[0] * bmin.x) / weights[1];
  var y2 = (-weights[2] - weights[0] * bmax.x) / weights[1];
  var weightLineP1 = new Point(bmin.x, y1);
  var weightLineP2 = new Point(bmax.x, y2);
  weightLineP1.mapToCanvas(bmin.x, bmax.x, bmin.y, bmax.y);
  weightLineP2.mapToCanvas(bmin.x, bmax.x, bmin.y, bmax.y);
  line(weightLineP1.x, weightLineP1.y, weightLineP2.x, weightLineP2.y);

  // Train the Perceptron with one "training" point at a time
  perceptron.train(training[count].input, training[count].output);
  count = (count + 1) % training.length;

  // Draw all the points based on what the Perceptron would "guess"
  // Does not use the "known" correct answer
  for (var i = 0; i < training.length; i++) {
    strokeWeight(2);
    fill(0);
    var guess = perceptron.feedforward(training[i].input);
    if (guess > 0) noFill();

    stroke(255, 0, 0);
    if(guess == training[i].output) {
      stroke(0, 255, 0);
    }

    var x = map(training[i].input[0], bmin.x, bmax.x, 0, width);
    var y = map(training[i].input[1], bmin.y, bmax.y, height, 0);
    ellipse(x, y, 10, 10);
  }
}
