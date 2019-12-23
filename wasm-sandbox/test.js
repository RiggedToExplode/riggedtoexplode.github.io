function rand(lo, hi) {
    return Math.floor(Math.random() * hi) + lo;
}

function timedUpdate(stage, interval=4) {
    var lastUpdate = Date.now(); //Set the last update.

    window.setInterval(function() {
      let now = Date.now() //Get time now
      let dt = now - lastUpdate; //Find deltaTime
      lastUpdate = now; //Reset last update time

      stage.update(dt); //Update stage.
      //console.log(dt + " milliseconds since last update.");
    }, interval);
}

class Ball extends $P.Prop {
    constructor() {
        super(new $P.Coord(0, 0));

        this._velocity = new $P.Coord($P.Prop.perSecond(rand(0, 200) - 100), $P.Prop.perSecond(rand(0, 200) - 100));
    }

    update(dt) {
        this.move($P.Coord.multCoord(this._velocity, dt));
    }

    draw(ctx, rel) {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.strokeStyle = "black";

        ctx.arc(rel.x, rel.y, 5, 0, 2*Math.PI);

        ctx.fill();
        ctx.stroke();

        ctx.closePath();
    }
}

var stage = new $P.Stage();
var canvas = new $P.Canvas("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var cam = new $P.Camera(stage, canvas);
cam.dimensions = new $P.Coord(canvas.width, canvas.height);
cam.stagePos = new $P.Coord(-canvas.width/2, -canvas.height/2);

for (let i = 0; i < 10; i++) {
    stage.addProp(new Ball());
}

timedUpdate(stage);

window.setInterval(function () {
    cam.draw();
}, 13);