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

class BouncingBall {
  constructor(speed, angle, point) {
    this.angle = angle;
    this.ball = {x: point.x, y: point.y};
    this.mainCanvas = document.getElementById("canvas");
    this.mainContext = this.mainCanvas.getContext("2d");
    this.canvasWidth = this.mainCanvas.width;
    this.canvasHeight = this.mainCanvas.height;
    this.radians = 0;
    this.speed = speed;
    this.xUnits = 0;
    this.yUnits = 0;
  }

  drawCircle() {
    this.ball.x += this.xUnits;
    this.ball.y += this.yUnits;
    this.mainContext.clearRect(0, 0, 450, 450);
    this.setCanvasLayout();
    this.mainContext.beginPath();
    this.mainContext.arc(this.ball.x, this.ball.y, 15, 0, Math.PI*2, true);
    this.mainContext.closePath();
    this.mainContext.fill();
    this.virtualWall();
  }

  setCanvasLayout() {
    this.mainContext.strokeStyle = "#d4d4d4";
    this.mainContext.strokeRect(1, 1, this.canvasWidth - 2, this.canvasHeight - 2);
    this.mainContext.fillStyle = "#495663";
  }

  updateBall() {
    this.radians = this.angle * Math.PI / 180;
    this.xUnits = Math.cos(this.radians) * this.speed;
    this.yUnits = Math.sin(this.radians) * this.speed;
  }

  virtualWall() {
    if (this.ball.x > this.canvasWidth || this.ball.x < 0) {
      this.angle = 180 - this.angle;
      this.updateBall();
    } else if (this.ball.y > this.canvasHeight || this.ball.y < 0) {
      this.angle = 360 - this.angle;
      this.updateBall();
    }
  }

  gameLoop() {
   requestAnimFrame(() => { this.gameLoop(); });
   this.drawCircle();
  }
}

window.onload = function() {
  var point = new Point(2, 4);
  var bouncingBall = new BouncingBall(8, 25, point);
  bouncingBall.setCanvasLayout();
  bouncingBall.updateBall();
  bouncingBall.gameLoop();
}
