function rand(lo, hi) {
  return Math.floor(Math.random() * hi) + lo;
}

var ctx, pos, bounds, scale, temp, temp2;
var colors = ["red", "green", "blue"];



var canvas = {
  el: document.getElementById("canvas"),
  ctx: null,
  width: 0,
  height: 0,
  changeWidth: function (w) {
    this.width = w;

    this.el.width = w;
    return this.width;
  },
  changeHeight: function (h) {
    this.height = h;

    this.el.height = h;
    return this.width;
  }
};
canvas.ctx = canvas.el.getContext("2d");
canvas.changeWidth(window.innerWidth);
canvas.changeHeight(window.innerHeight);

function Camera (target, world, bounds, pos, scale = [1, 1], backColor, strokeColor) {
  this.target = target; //What canvas (object) we are drawing on.
  this.world = world; //What world we are looking at.
  this.bounds = bounds; //The rectangle area that this camera "paints" onto.
  this.width = this.bounds.right - this.bounds.left;
  this.height = this.bounds.bottom - this.bounds.top;
  this.pos = pos; //The top-left position of what this camera looks at.
  this.scale = scale; //The scale that we are drawing at.
  this.backColor = backColor; //A background color for this camera. Can be nothing to not draw a background.
  this.strokeColor = strokeColor; //A stroke color for this camera. Can be nothing to not draw a stroke.

  this.changeTarget = function(newTarget) {
    this.target = newTarget;

    return this.target;
  }

  this.changeWorld = function(newWorld) {
    this.world = newWorld;

    return this.world;
  }

  this.changeBounds = function(left = this.bounds.left, top = this.bounds.top, right = this.bounds.right, bottom = this.bounds.bottom) {
    this.bounds.left = left;
    this.bounds.top = top;
    this.bounds.right = right;
    this.bounds.bottom = bottom;

    this.width = this.bounds.right - this.bounds.left;
    this.height = this.bounds.bottom - this.bounds.top;

    return this.bounds;
  }

  this.changePos = function (x = this.pos[0], y = this.pos[1]) {
    this.pos[0] = x;
    this.pos[1] = y;

    return this.pos;
  }

  this.changeScale = function (scale = this.scale) {
    this.scale = scale;

    return this.scale;
  }

  this.afterDraw = function (ctx) {

  }

  this.draw = function () {
    ctx = this.target.ctx;
    pos = this.pos;
    bounds = this.bounds;
    scale = this.scale;

    ctx.save();

    ctx.fillStyle = this.backColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.rect(bounds.left, bounds.top, bounds.right, bounds.bottom);
    if (this.backColor) {
      ctx.fill();
    }
    if (this.strokeColor) {
      ctx.stroke();
    }
    ctx.closePath();

    ctx.rect(bounds.left, bounds.top, bounds.right, bounds.bottom);
    ctx.clip();
    ctx.scale(scale[0], scale[1]); //Distort the context if need be.

    this.world.objects.forEach(function (e) {
      e.draw(ctx, [e.pos[0] - pos[0] + bounds.left / scale[0], e.pos[1] - pos[1] + bounds.top / scale[1]])
    });

    ctx.restore();

    this.afterDraw(ctx);
  }
}

function World () {
  this.objects = [];

  this.addObject = function (object) {
    this.objects.push(object);

    return this.objects;
  }
}

function PlayerShip (pos, degrees) {
  this.name = "Player";
  this.type = "ship";

  this.pos = pos;
  this.degrees = degrees;

  this.speed = 0.00025;
  this.velocity = 0;
  this.velocityDecay = 0;
  this.velocityLimit = 2;
  this.angularSpeed = 0.00015;
  this.angularVelocity = 0;
  this.angularDecay = 0.00001;
  this.angularLimit = 2;

  this.draw = function (ctx, rel) {
      size = 20;

      ctx.fillStyle = "#fff";
      ctx.save();
      ctx.translate(rel[0], rel[1]);
      ctx.rotate(this.degrees * Math.PI / 180);
      ctx.beginPath();
      ctx.moveTo(size/2, size*0.75);
      ctx.lineTo(0, size/2);
      ctx.lineTo(-size/2, size*0.75);
      ctx.lineTo(0, -size/2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
  }

  this.update = function (dt) {
      if (keystates["37"]) {
        this.angularVelocity -= this.angularSpeed * dt;
      }
      if (keystates["38"]) {
        this.velocity += this.speed * dt;
      }
      if (keystates["39"]) {
        this.angularVelocity += this.angularSpeed * dt;
      }
      if (keystates["40"]) {
        this.velocity -= this.speed * dt;
      }



      if (this.angularVelocity < 0) {
        pol = -1;
      } else {
        pol = 1;
      }

      temp = Math.abs(this.angularVelocity);
      temp -= this.angularDecay * dt;
      if (temp < 0) {
        temp = 0;
      } else if (temp > this.angularLimit) {
        temp = this.angularLimit;
      }
      this.angularVelocity = temp * pol;
      this.degrees += this.angularVelocity * dt;


      if (this.velocity < 0) {
        pol = -1;
      } else {
        pol = 1;
      }

      temp = Math.abs(this.velocity);
      temp -= this.velocityDecay * dt;
      if (temp < 0) {
        temp = 0;
      } else if (temp > this.angularVelocityLimit) {
        temp = this.angularVelocityLimit;
      }

      this.velocity = temp * pol;
      this.pos[0] = this.pos[0] + this.velocity * dt * Math.sin(this.degrees * Math.PI / 180);
      this.pos[1] = this.pos[1] - this.velocity * dt * Math.cos(this.degrees * Math.PI / 180);
  }
}

function Star (pos) {
  this.pos = pos;
  this.size = rand(800, 3200);
  this.dist = 0;

  this.draw = function (ctx, rel) {
    ctx.fillStyle = "yellow";

    ctx.beginPath();
    ctx.arc(rel[0], rel[1], this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  this.update = function () {

  }
}

function Planet (orbiting, prevDist, prevSize, size = [40, 200], dist = [800, 1600], isMoon = false) {
  this.orbiting = orbiting;
  this.pos = [0, 0];
  this.degrees = rand(0, 360);
  this.size = rand(size[0], size[1]);
  this.dist = prevDist + prevSize + rand(dist[0], dist[1]) + this.size;
  this.dir = rand(0, 1) - 1;
  this.speed = rand(3, 15) / this.dist;
  this.moons = [];

  temp = rand(0, 5);
  for (i = 0; i < temp; i++) {
    if (i == 0) {
      this.moons.push(new Planet(this, 0, this.size, [5, 20], [20, 40], true));
    } else {
      this.moons.push(new Planet(this, this.moons[i-1].dist, this.moons[i-1].size, [5, 20], [20, 40], true));
    }
  }

  this.color = colors[rand(0, colors.length - 1)];

  this.draw = function (ctx, rel) {
    pos = this.pos
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(rel[0], rel[1], this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    this.moons.forEach(function (e) {
      e.draw(ctx, [rel[0] + (e.pos[0] - pos[0]), rel[1] + (e.pos[1] - pos[1])]);
    })
  }

  this.update = function (dt) {
    this.degrees += this.speed * this.dir * dt;
    if (this.degrees > 360) {
      this.degrees -= 360;
    }

    this.pos[0] = this.orbiting.pos[0] + this.dist * Math.cos(this.degrees * Math.PI / 180);
    this.pos[1] = this.orbiting.pos[1] + this.dist * Math.sin(this.degrees * Math.PI / 180);

    this.moons.forEach(function (e) {
      e.update(dt);
    });
  }
}
