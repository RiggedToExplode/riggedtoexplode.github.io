var now, dt;
var ctx = canvas.ctx;



var System = new World();
System.addObject(new Star([0, 0]));

temp2 = rand(3, 12);
for (var a = 1; a < temp2; a++) {
  System.addObject(new Planet(System.objects[0], System.objects[a-1].dist, System.objects[a-1].size));
}

temp = rand(0, 360);
var Player = new PlayerShip([System.objects[0].pos[0] + (System.objects[0].size + rand(40, 80)) * Math.cos(temp * Math.PI / 180), System.objects[0].pos[1] + (System.objects[0].size + rand(40, 80)) * Math.sin(temp * Math.PI / 180)], rand(0, 360));
System.addObject(Player);


var Camera1 = new Camera(canvas, System, {
    left: 0,
    top: 0,
    right: canvas.width,
    bottom: canvas.height
}, [0, 0]);

var Camera2 = new Camera(canvas, System, {
  left: canvas.width - 400,
  top: 0,
  right: canvas.width,
  bottom: 200
}, [-2666, -1333], [0.01, 0.01], "#1e1e1e", "#1e1e1e");
Camera2.afterDraw = function (ctx) {
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(this.width/2 + this.bounds.left, this.height/2 + this.bounds.top, 1, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}


window.setInterval(function () {
  ctx.fillStyle = "black";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  Camera1.changePos(Player.pos[0] - Camera1.width / 2, Player.pos[1] - Camera1.height / 2);
  Camera1.draw();
  Camera2.changePos(Player.pos[0] - Camera2.width / 2 / Camera2.scale[0], Player.pos[1] - Camera2.height / 2 / Camera2.scale[1]);
  Camera2.draw();
}, 33);

var lastUpdate = Date.now();
window.setInterval(function() {
  now = Date.now();
  dt = now - lastUpdate;
  lastUpdate = now;

  System.objects.forEach(function(e) {
    e.update(dt);
  });

  //console.log([ply.velocity, ply.pos])
}, 0);


window.addEventListener("resize", function () {
  canvas.changeWidth(window.innerWidth);
  canvas.changeHeight(window.innerHeight);

  Camera1.changeBounds(0, 0, canvas.width, canvas.height);
});


var keystates = {};
window.onkeyup = function(e) {
  keystates[e.keyCode] = false;
};
window.onkeydown = function(e) {
  keystates[e.keyCode] = true;
};
