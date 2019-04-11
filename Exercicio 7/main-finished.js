// setup canvas

var score = document.querySelector('p');
var ballsCount = -1;
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// define Shape constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// define EvilCircle constructor

function EvilCircle(x, y, velX, velY, color, size, exists) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
Object.defineProperty(EvilCircle.prototype, 'constructor', {
  value: EvilCircle,
  enumerable: false,
  writable: true
});

// define EvilCircle draw method
EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

// define EvilCircle check bounds method
EvilCircle.prototype.checkBounds = function () {
  if ((this.x + this.size) >= width) {
    this.x = this.x - this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x = this.x + this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y = this.y - this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y = this.y + this.size;
  }
}

// define EvilCircle set controls method
EvilCircle.prototype.setControls = function () {
  var _this = this;
  window.onkeydown = function (e) {
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  }
}

// define EvilCricle collision detect method
EvilCircle.prototype.collisionDetect = function () {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists === true) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
      }
    }
  }
}

// define Ball constructor

function Ball(x, y, velX, velY, color, size, exists) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Object.defineProperty(Ball.prototype, 'constructor', {
  value: Ball,
  enumerable: false,
  writable: true
});

// define ball draw method

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function () {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
      }
    }
  }
};

// define array to store balls

var balls = [];

// Instantiate the evil circle
var evilCircle = new EvilCircle(random(0,width), random(0,height), true);
evilCircle.setControls();

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);


  while (balls.length < 25) {
    var size = random(10, 20);
    var ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the adge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      size,
      true
    );
    balls.push(ball);
    score.textContent = "Ball count: " + balls.length;
  }

  ballsCount = 0;
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      ballsCount++;
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  score.textContent = "Ball count: " + ballsCount;

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}



loop();