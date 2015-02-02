class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(point) {
    var dx = point.x - this.x;
    var dy = piont.y - this.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}

