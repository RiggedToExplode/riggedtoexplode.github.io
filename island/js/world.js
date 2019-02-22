/*==========*\
|   WORLD    |
\*==========*/



function Biome(id, name, baseColor, lowElev) {
    this.id = id;
    this.name = name;
    this.baseColor = baseColor;
    this.lowElev = lowElev;
}

var Ocean = new Biome(0, "Ocean", "#5B96BA", 0);

var Beach = new Biome(1, "Beach", "#FFEEBB", 10);

var Plains = new Biome(2, "Plains", "#81FF78", 11);

var Forest = new Biome(3, "Forest", "#42E142", 12);

var Desert = new Biome(4, "Desert", "#FFFC7A", 13);

var Mountain = new Biome(5, "Mountain", "#98969C", 18);

var biomes = [[Ocean, Ocean, Ocean, Ocean], //0
            [Ocean, Ocean, Ocean, Ocean], //1
            [Ocean, Ocean, Ocean, Ocean], //2
            [Ocean, Ocean, Ocean, Ocean], //3
            [Ocean, Ocean, Ocean, Ocean], //4
            [Ocean, Ocean, Ocean, Ocean], //5
            [Ocean, Ocean, Ocean, Ocean], //6
            [Ocean, Ocean, Ocean, Ocean], //7
            [Ocean, Ocean, Ocean, Ocean], //8
            [Ocean, Ocean, Ocean, Ocean], //9
            [Beach, Beach, Beach, Beach], //10
            [Plains, Plains, Plains, Plains], //11
            [Plains, Plains, Plains, Desert], //12
            [Plains, Plains, Forest, Desert], //13
            [Plains, Forest, Forest, Desert], //14
            [Forest, Forest, Forest, Desert], //15
            [Forest, Forest, Forest, Plains], //16
            [Forest, Forest, Mountain, Mountain], //17
            [Forest, Mountain, Mountain, Mountain], //18
            [Mountain, Mountain, Mountain, Mountain]]; //19



function Tile(elev, x, y, biomeNum) {
    this.x = x;
    this.y = y;
    this.elev = elev;
    this.biome = biomes[this.elev][biomeNum];
    this.hidden = true;
    
    if (this.biome != Ocean) {
        this.color = shadeBlend(-0.05*(this.elev-this.biome.lowElev), this.biome.baseColor);
    } else {
        this.color = shadeBlend(0.05*(this.elev-this.biome.lowElev), this.biome.baseColor);
    }
    
    
    this.cliffs = [0, 0, 0, 0];
    this.cliff = function(map) {
        if (this.biome != Ocean) {
            if (map.tiles[this.x][this.y-2] !== undefined) {
                if (Math.abs(map.tiles[this.x][this.y-1].elev - this.elev) > 1) {
                    this.cliffs[0] = 1;
                }
            }
            
            if (map.tiles[this.x+1] !== undefined) {
                if (Math.abs(map.tiles[this.x+1][this.y].elev - this.elev) > 1) {
                    this.cliffs[1] = 1;
                }
            }
            
            if (map.tiles[this.x][this.y+1] !== undefined) {
                if (Math.abs(map.tiles[this.x][this.y+1].elev - this.elev) > 1) {
                    this.cliffs[2] = 1;
                }
            }
            if (map.tiles[this.x-1] !== undefined) {
                if (Math.abs(map.tiles[this.x-1][this.y].elev - this.elev) > 1) {
                    this.cliffs[3] = 1;
                }
            }
        }
    }
}



function Map(w, h, freq, runs, maxElev, biomeFreq, biomes) {
    this.w = w;
    this.h = h;
    this.freq = freq;
    this.runs = runs;
    this.maxElev = maxElev;
    this.biomeFreq = biomeFreq;
    this.biomes = biomes;
    
    this.tiles = [];
    
    this.generate = function() {
        this.tiles = [];
        
        for (var x = 0; x < w; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < h; y++) {
                this.tiles[x][y] = [];
            }
        }
        
        noise.seed(Math.random());
        
        for (var x = 0; x < this.w; x++) {
            for (var y = 0; y < this.h; y++) {
                var value = 0;
                var freq = this.freq;
                var div = 1;
                var biomeVal = 0;
                
                for (var t = this.runs; t >= 1; t--) {
                    var temp = Math.abs(noise.perlin2(x / freq, y / freq));
                    temp *= this.maxElev-1;
                    value += (temp/div);
                    div *= 2;
                    freq = Math.round(freq/3);
                    
                    var biomeVal = Math.abs(noise.perlin2(x/this.biomeFreq, y/this.biomeFreq));
                    biomeVal *= this.biomes;
                    biomeVal = Math.round(biomeVal);
                }
                value = Math.round(value);
                
                if (value > 19) {
                    value = 19;
                }
                
                this.tiles[x][y] = new Tile(value, x, y, biomeVal);
            }
        }
        for (var x = 0; x < w; x++) {
            for (var y = 0; y < h; y++) {
                this.tiles[x][y].cliff(this);
            }
        }
    }
    
    this.generate();
}
