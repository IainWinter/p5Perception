function Point() {
  this.x = random(-1, 1);
  this.y = random(-1, 1);
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.mapToCanvas = function(xmin, xmax, ymin, ymax) {
  this.x = map(this.x, xmin, xmax, 0, width);
  this.y = map(this.y, ymin, ymax, height, 0);
}
