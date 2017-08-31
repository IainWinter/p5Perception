function Perceptron(weightCount, rate) {
  this.weights = new Array(weightCount);
  this.rate = rate;

  //Add random weights
  for (var i = 0; i < weightCount; i++) {
    this.weights[i] = random(-1, 1);
  }
}

Perceptron.prototype.train = function(inputs, target) {
  var guess = this.guess(inputs);
  var error = target - guess;

  //Change weights by error * rate
  for (var i = 0; i < this.weights.length; i++) {
    this.weights[i] += this.rate * error * inputs[i];
  }
}

Perceptron.prototype.guess = function(inputs) {
  var sum = 0;
  for (var i = 0; i < this.weights.length; i++) {
    sum += this.weights[i] * inputs[i];
  }

  return this.activate(sum);
}

Perceptron.prototype.activate = function(n) {
  return n > 0 ? 1 : -1;
}
