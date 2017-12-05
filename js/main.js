/*==========*\
|    MAIN    |
\*==========*/



var mapW = 80;
var mapH = 45;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var map = new Map(mapW, mapH, 75, 4, 22, 100, 4);
plySpawn();

/*RENDERING*/
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight;

var tileW = Math.round(canvas.width/mapW);
var tileH = Math.round(canvas.height/mapH);


window.onresize = function() {
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight;
    
    tileW = Math.round(canvas.width/mapW);
    tileH = Math.round(canvas.height/mapH);
}

var render = setInterval(function() {
    for (var x = 0; x < map.w; x++) {
        for (var y = 0; y < map.h; y++) {
            if (Math.abs(x-ply.x) <= 1 && Math.abs(y-ply.y) <= 1) {
                map.tiles[x][y].hidden = false;
            }
            
            if (map.tiles[x][y].hidden == false) {
                ctx.fillStyle = map.tiles[x][y].color;
                
                if (map.tiles[x][y].cliffs[0] == 1) {
                     ctx.beginPath();
                     ctx.moveTo(x*tileW, y*tileH-1);
                     ctx.lineTo((x*tileW)+tileW, y*tileH-1);
                     ctx.strokeStyle = shadeBlend(-0.75, map.tiles[x][y].color);
                     ctx.stroke();
                     ctx.closePath();
                 }
                 
                 if (map.tiles[x][y].cliffs[1] == 1) {
                     ctx.beginPath();
                     ctx.moveTo((x*tileW)+tileW+1, y*tileH);
                     ctx.lineTo((x*tileW)+tileW+1, (y*tileH)+tileH);
                     ctx.strokeStyle = shadeBlend(-0.75, map.tiles[x][y].color);;
                     ctx.stroke();
                     ctx.closePath();
                 }
                 
                 if (map.tiles[x][y].cliffs[2] == 1) {
                     ctx.beginPath();
                     ctx.moveTo(x*tileW, (y*tileH)+tileH+1);
                     ctx.lineTo((x*tileW)+tileW, (y*tileH)+tileH+1);
                     ctx.strokeStyle = shadeBlend(-0.75, map.tiles[x][y].color);;
                     ctx.stroke();
                     ctx.closePath();
                 }
                 
                 if (map.tiles[x][y].cliffs[3] == 1) {
                     ctx.beginPath();
                     ctx.moveTo(x*tileW-1, y*tileH);
                     ctx.lineTo(x*tileW-1, (y*tileH)+tileH);
                     ctx.strokeStyle = shadeBlend(-0.75, map.tiles[x][y].color);;
                     ctx.stroke();
                     ctx.closePath();
                 }
            } else {
                ctx.fillStyle = "black";
            }
            
            
            ctx.beginPath();
            ctx.rect(x*tileW, y*tileH, tileW, tileH);
            ctx.fill();
            ctx.closePath();
            
            
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.rect(ply.x*tileW+1, ply.y*tileH+1, tileW-2, tileH-2);
            ctx.fill();
            ctx.closePath();
        }
    }
    
    document.getElementById("biome").innerHTML = "Biome: " + map.tiles[ply.x][ply.y].biome.name;
    document.getElementById("elev").innerHTML = "Elevation: " + map.tiles[ply.x][ply.y].elev;
    document.getElementById("wood").innerHTML = "Stone: " + ply.stone;
    document.getElementById("stone").innerHTML = "Wood: " + ply.wood;
    document.getElementById("metal").innerHTML = "Metal: " + ply.metal;
}, 15);
