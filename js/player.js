/*==========*\
|   PLAYER   |
\*==========*/

var ply = {
    x: 45,
    y: 10,
    onBoat: false,
    wood: 0,
    stone: 0,
    metal: 0
}


function plySpawn() {
    while (map.tiles[ply.x][ply.y].elev < 10) {
        map.generate();
        ply.x = rand(0, map.tiles.length);
        ply.y = rand(0, map.tiles[ply.x].length);
    }
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38' || e.keyCode == '87') {
        if (map.tiles[ply.x][ply.y-1]) {
            if (map.tiles[ply.x][ply.y-1].elev >= 10 && map.tiles[ply.x][ply.y-1].elev < 20 && map.tiles[ply.x][ply.y].elev - map.tiles[ply.x][ply.y-1].elev > -2 && map.tiles[ply.x][ply.y-1].cliffs != [1, 1, 1, 1]) {
                ply.y--;
            } else if (ply.onBoat == true && map.tiles[ply.x][ply.y-1].elev < 20 && map.tiles[ply.x][ply.y-1].biome == Ocean) {
                ply.y--;
            }
        }
    }
    else if (e.keyCode == '40' || e.keyCode == '83') {
        if (map.tiles[ply.x][ply.y+1]) {
            if (map.tiles[ply.x][ply.y+1].elev >= 10 && map.tiles[ply.x][ply.y+1].elev < 20 && map.tiles[ply.x][ply.y].elev - map.tiles[ply.x][ply.y+1].elev > -2 && map.tiles[ply.x][ply.y+1].cliffs != [1, 1, 1, 1]) {
                ply.y++;
            } else if (ply.onBoat == true && map.tiles[ply.x][ply.y+1].elev < 20 && map.tiles[ply.x][ply.y+1].biome == Ocean) {
                ply.y++;
            }
        }
    }
    else if (e.keyCode == '37' || e.keyCode == '65') {
       if (map.tiles[ply.x-1]) {
           if (map.tiles[ply.x-1][ply.y].elev >= 10 && map.tiles[ply.x-1][ply.y].elev < 20 && map.tiles[ply.x][ply.y].elev - map.tiles[ply.x-1][ply.y].elev > -2 && map.tiles[ply.x-1][ply.y].cliffs != [1, 1, 1, 1]) {
               ply.x--;
           } else if (ply.onBoat == true && map.tiles[ply.x-1][ply.y].elev < 20 && map.tiles[ply.x-1][ply.y].biome == Ocean) {
               ply.x--;
           }
       }
    }
    else if (e.keyCode == '39' || e.keyCode == '68') {
       if (map.tiles[ply.x+1]) {
           if (map.tiles[ply.x+1][ply.y].elev >= 10 && map.tiles[ply.x+1][ply.y].elev < 20 && map.tiles[ply.x][ply.y].elev - map.tiles[ply.x+1][ply.y].elev > -2 && map.tiles[ply.x+1][ply.y].cliffs != [1, 1, 1, 1]) {
               ply.x++;
           } else if (ply.onBoat == true && map.tiles[ply.x+1][ply.y].elev < 20 && map.tiles[ply.x+1][ply.y].biome == Ocean) {
               ply.x++;
           }
       }
    }

}
