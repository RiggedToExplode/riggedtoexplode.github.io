/*======*\
|  SHIP  |
\*======*/

/* description pending */

class Ship extends GameObject {
  constructor(pos, degrees, hitbox, world) {
    try {
      super(pos, degrees, hitbox, world);
    } catch (e) {
      throw new Error("Ship failed to construct due to failure in parent: " + e.message);
    }

    this.velocity = [0, 0];
    this.velocityDecay = 0.00005;
    this.velocityCap = 1;
    this.speed = 0.00025;

    this.angularVelocity = 0;
    this.angularDecay = 0.00001;
    this.angularCap = 0.5;
    this.angularSpeed = 0.0005;
  }

  set velocity(velocity) {
    let temp;

    if ((temp = typeof velocity) !== "object") {
      throw new Error("Ship expected array for velocity, but got " + temp + "!");
    }

    if (typeof(velocity[0] + velocity[1]) !== "number") {
      throw new Error("Ship did not get number values for both velocity values!");
    }

    this._velocity = [velocity[0], velocity[1]];
  }

  get velocity() {
    return this._velocity;
  }


  update(dt) {
    let force = [0, 0], pol = 1, temp;

    if (keystates["32"]) {
      this.angularDecay = 0.00008;
      this.velocityDecay = 0.0004;
    } else {
      this.angularDecay = 0.00001;
      this.velocityDecay = 0.00005;
    }

    if (this.angularVelocity < 0) {
      pol = -1;
    }

    temp = Math.abs(this.angularVelocity) - this.angularDecay * dt;

    if (temp < 0) {
      temp = 0;
    }
    if (temp > this.angularCap) {
      this.angularVelocit = this.angularCap;
    }

    this.angularVelocity = temp * pol;

    if (keystates["37"]) {
      this.angularVelocity -= this.angularSpeed * dt;
      pol = 1;
      if (this.angularVelocity < 0) {
        pol = -1;
      }
      if (Math.abs(this.angularVelocity) > this.angularCap) {
        this.angularVelocity = this.angularCap * pol;
      }
    }
    if (keystates["39"]) {
      this.angularVelocity += this.angularSpeed * dt;
      pol = 1;
      pol = 1;
      if (this.angularVelocity < 0) {
        pol = -1;
      }
      if (Math.abs(this.angularVelocity) > this.angularCap) {
        this.angularVelocity = this.angularCap * pol;
      }
    }

    this.degrees += this.angularVelocity * dt;

    pol = 1;
    if (this.velocity[0] < 0) {
      pol = -1;
    }

    temp = Math.abs(this.velocity[0]) - this.velocityDecay * dt;

    if (temp < 0) {
      temp = 0;
    }

    if (temp > this.velocityCap) {
      temp = this.velocityCap;
    }

    this.velocity[0] = temp * pol;

    pol = 1;
    if (this.velocity[1] < 0) {
      pol = -1;
    }

    temp = Math.abs(this.velocity[1]) - this.velocityDecay * dt;

    if (temp < 0) {
      temp = 0;
    }

    if (temp > this.velocityCap) {
      temp = this.velocityCap;
    }

    this.velocity[1] = temp * pol;



    if (keystates["38"]) {
      force = [this.speed * dt * Math.sin(this.degrees * Math.PI / 180), -this.speed * dt * Math.cos(this.degrees * Math.PI / 180)];
    }
    if (keystates["40"]) {
      force = [-this.speed * dt * Math.sin(this.degrees * Math.PI / 180), this.speed * dt * Math.cos(this.degrees * Math.PI / 180)];
    }

    this.velocity = [this.velocity[0] + force[0], this.velocity[1] + force[1]];
    this.pos = [this.pos[0] + this.velocity[0] * dt, this.pos[1] + this.velocity[1] * dt];
  }

  draw(ctx, rel) {
    let size = 20;

    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "black"
    ctx.save();
    ctx.translate(rel[0], rel[1]);
    ctx.rotate(this.degrees * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(size / 2, size * 0.75);
    ctx.lineTo(0, size / 2);
    ctx.lineTo(-size / 2, size * 0.75);
    ctx.lineTo(0, -size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
