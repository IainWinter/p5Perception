var training = new Array(1000);
var perceptron;
var count = 0;

var xymin = -1;
var xymax =  1;

var trgtx1, trgty1, trgtx2, trgty2;

var m, b;
function f(x) {
  return m * x + b;
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  //Set correct line slope and y-int
  m = random(-5, 5);
  b = random(-1, 1);

  //Map correct line to canvas
  trgtx1 = map(xymin, xymin, xymax, 0, width);
  trgty1 = map(f(xymin), xymin, xymax, height, 0);
  trgtx2 = map(xymax, xymin, xymax, 0, width);
  trgty2 = map(f(xymax), xymin, xymax, height, 0);

  perceptron = new Perceptron(3, .01);

  //Add training data
  for (var i = 0; i < training.length; i++) {
    var x = random(xymin, xymax);
    var y = random(xymin, xymax);
    var answer = y > f(x) ? 1 : -1;
    training[i] = {
      input: [x, y, 1],
      answer: answer
    };
  }
}

function draw() {
  background(255);

  //Correct line
  stroke(0);
  strokeWeight(1);
  line(trgtx1, trgty1, trgtx2, trgty2);

  //Guess line
  strokeWeight(2);
  var weights = perceptron.weights;
  var x1 = xymin;
  var y1 = (-weights[2] - weights[0] * xymin) / weights[1];
  var x2 = xymax;
  var y2 = (-weights[2] - weights[0] * xymax) / weights[1];

  var guessedSlope = (y2 - y1) / (x2 - x1);
  var guessedYInt  = (y1 + y2) / 2

  x1 = map(x1, xymin, xymax, 0, width);
  y1 = map(y1, xymin, xymax, height, 0);
  x2 = map(x2, xymin, xymax, 0, width);
  y2 = map(y2, xymin, xymax, height, 0);

  line(x1, y1, x2, y2);

  //Update training data
  perceptron.train(training[count].input, training[count].answer);
  count = (count + 1) % training.length;

  for (var i = 0; i < training.length; i++) {
    fill(0);
    var guess = perceptron.guess(training[i].input);
    if(guess > 0) noFill();

    stroke(255, 0, 0);
    if(guess == training[i].answer) {
      stroke(0, 255, 0);
    }

    var x = map(training[i].input[0], xymin, xymax, 0, width);
    var y = map(training[i].input[1], xymin, xymax, height, 0);
    ellipse(x, y, 10, 10);
  }

  noStroke();
  fill(0, 0, 0, 150);
  rect(0, height - 185, width, height);

  fill(255);
  textSize(35);
  text("Guess Slope = " + guessedSlope,  10, height - 45 * 4, width, 35);
  text("Actual Slope = " + m,            10, height - 45 * 3, width, 35);
  text("Guess y-int   = " + guessedYInt, 10, height - 45 * 2, width, 35);
  text("Actual y-int   = " + b,          10, height - 45 * 1, width, 35);
}
