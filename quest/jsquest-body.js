//JSQuest Body Script

var lvl = 1;
var xp = 0;
var hp = 100;

var xpcap = 100;
var hpcap = 100;

var action = 0;
var nilvar;
var mchance;
var chance;

var mod = 0;
var owned_mod = 0;

var gold = 0;
var potion = 0;

var elvl;
var exp;
var egold;
var epen;
var edex;

var saveString;
var loadString;
var arr;

window.setInterval(tick, 1);

function save() {
  saveString = hp+";"+xp+";"+lvl+";"+xpcap+";"+hpcap+";"+owned_mod+";"+gold+";"+potion+";";
  console.log("Printed save string as: "+saveString);
  
  document.getElementById("box").value = saveString;
  
  say("Printed save code.", 0);
}

function load() {
  loadString = prompt("Enter save code:");
  
  arr = loadString.split(';');
  console.log(arr);
  
  if (isNaN(arr[0]) || isNaN(arr[1]) || isNaN(arr[2]) || isNaN(arr[3]) || isNaN(arr[4]) || isNaN(arr[5]) || isNaN(arr[6]) || isNaN(arr[7])) {
    if (confirm("Something is wrong with your save code. Press OK for help.")) {
      alert("The code should consist only of numbers and semicolons, no spaces. There should be 8 sets of numbers, seperated by the semicolons.");
    }
  } else {
    hp = Number(arr[0]);
    xp = Number(arr[1]);
    lvl = Number(arr[2]);
    xpcap = Number(arr[3]);
    hpcap = Number(arr[4]);
    owned_mod = Number(arr[5]);
    gold = Number(arr[6]);
    potion = Number(arr[7]);
  
    say("Loaded from save code.", 0);
}
}


function say(txt, line) {
  var div = document.getElementById("action"); //We're talking about this div.
  var note = document.createElement("P"); //Create a paragraph element.
  var text = document.createTextNode(txt); //Create a text node with our custom text.

  note.appendChild(text); //Add the text to the "note" node
  div.insertBefore(note,div.childNodes[line]); //Add the paragraph where we want it.
}

function rand(lo, hi) {
  output = Math.floor((Math.random() * hi) + lo);
  return output;
}

function tick() {
  document.getElementById("hp").innerHTML = "HP: "+hp;
  document.getElementById("xp").innerHTML = "XP: "+xp;
  document.getElementById("lvl").innerHTML = "Level "+lvl;
  document.getElementById("mod").innerHTML = "Modifier: +"+owned_mod;
  document.getElementById("gold").innerHTML = "Gold: "+gold;
  document.getElementById("potion").innerHTML = "Potions: "+potion;
  
  if (action == 1) {
    document.getElementById("b2").innerHTML = "Attack";
    document.getElementById("b1").innerHTML = "Run Away";
  } else if (action == 2) {
    document.getElementById("b2").innerHTML = "Accept";
    document.getElementById("b1").innerHTML = "Leave";
  } else {
    document.getElementById("b2").innerHTML = "Practice";
    document.getElementById("b1").innerHTML = "Explore";
  }
  
  if (hp > hpcap) {
    hp = hpcap;
  }
  
  if (xp >= xpcap) {
    lvlup();
  }
  
  if (gold < 0) {
    gold = 0;
  }
  
  if (hp <= 0) {
    die();
  }
  
  if (xp < 0) {
    xp = 0;
  }
  
  if (owned_mod < 0) {
    owned_mod = 0;
  }
}


function lvlup() {
  say("Level Up!", 0);
  
  hpcap = hpcap + 5;
  hp = hpcap;
  
  xp = xp - xpcap;
  xpcap = xpcap + 20;
  
  lvl = lvl + 1;
}

function die() {
  say("You Died!", 0);
  say("- Lost all XP!", 1);
  say("- Lost all gold!", 2);
  say("- Lost all potions!", 3);
  say("- Weapon modifier reset!", 4);
  
  xp = 0;
  gold = 0;
  potion = 0;
  owned_mod = 0;
  hp = hpcap;
}


function battle(mlvl, mgold, mpen, mdex, note) {
  action = 1;
  elvl = mlvl;
  exp = (mlvl * 100) / 5;
  egold = mgold;
  epen = mpen;
  edex = mdex;
  
  say(note, 0);
  
  document.getElementById("b2").innerHTML = "Attack";
  document.getElementById("b1").innerHTML = "Run Away";
}

function fight() {
  nilvar = rand(1, 200);
  chance = nilvar + (lvl * 20) + owned_mod;
  
  console.log("Chance is "+chance);
  
  nilvar = rand(1, 200);
  mchance = nilvar + (elvl * 10);
  
  console.log("Mchance is "+mchance)
  
  if (chance >= mchance) {
    say("You Win!", 0);
    say("- You got "+egold+" gold!", 1);
    say("- You gained "+exp+" XP!", 2);
    
    xp = xp + exp;
    gold = gold + egold;
  } else {
    say("You Lose...", 0);
    say("- You lost "+epen+" HP.", 1);
    
    hp = hp - epen;
  }
  
  if (owned_mod > 0) {
    nilvar = rand(1, 5);
    
    if (nilvar == 5) {
    nilvar = rand(1, 5);
    
    if (chance >= mchance) {
    say("You damage your weapon. -"+nilvar+" Modifier", 3);
    } else {
    say("You damage your weapon. -"+nilvar+" Modifier", 2);
    }
    
    owned_mod = owned_mod - nilvar;
    }
  }
  
  action = 0;
}

function prac() {
  nilvar = rand(1, 5);
  
  if (nilvar == 1) {
    say("You attack an innocent log.", 0);
    
    xp = xp + 1;
  } else if (nilvar == 2) {
    say("You swing at some dead trees.", 0);
    
    xp = xp + 2;
  } else if (nilvar == 3) {
    say("You read a book on martial arts.", 0);
    
    xp = xp + 3;
  } else if (nilvar == 4) {
    say("You lift heavy rocks.", 0);
    
    xp = xp + 4;
  } else if (nilvar == 5) {
    say("You do some pushups.", 0);
    
    xp = xp + 5;
  }
}

function run() {
  nilvar = rand(1, 100);
  
  if (nilvar > edex) {
    say("You escape unscathed.", 0);
  } else {
    say("You escape with a few scratches.", 0);
    
    hp = hp - Math.round(epen/10);
  }
  
  action = 0;
}


function trade() {
  nilvar = rand(1, 2);
  action = 2;
  
  say("You meet a wandering trader.", 0);
  
  if (nilvar == 1) {
    quant = rand(1,5);
    nilvar = rand(10, 30);
    price = nilvar * quant;
    
    say("- They offer "+quant+" potion(s) for "+price+" gold.", 1);
    
  } else if (nilvar == 2) {
    mod = rand(1, 20);
    nilvar = rand(1, 5);
    price = (mod * 10) * nilvar;
    
    say("- They offer a weapon mod that gives you +"+mod+" chance for "+price+" gold.", 1);
  }
}

function buy() {
  if (gold >= price) {
    say("You accept the item(s).", 0);
    say("- You pay "+price+" gold.", 1);
    
    if (mod > 0) {
      say("- It replaces your already existing modifier.", 2)
    }
    
    gold = gold - price;
    owned_mod = mod;
    potion = potion + quant;
    mod = 0;
  }
}

function magic() {
  if (lvl >= 15) {
    nilvar = rand(1,5);
    
    if (nilvar >= 1 && nilvar <= 4) {
      say("A hooded figure passes by you.", 0);
    } else if (nilvar == 5) {
      say("A hooded figure steals some of your XP. -25 XP", 0);
      
      xp = xp - 25;
    }
  } else {
    say("A hooded figure passes you, humming.", 0);
  }
}


function explore() {
  if (action != 1) {
    nilvar = rand(1, 20);
    
    if (nilvar == 1) {
      say("The sea of grass seems almost infinite.", 0);
    } else if (nilvar == 2) {
      say("The wind whistles in your ears.", 0);
    } else if (nilvar == 3) {
      say("A herd of buffalo pass by.", 0);
    } else if (nilvar == 4) {
      say("A creek gurgles nearby.", 0);
    } else if (nilvar == 5) {
      battle(0.5, 10, 5, 10, "A rabid squirrel comes out of the grass. (Lvl 1/2)");
    } else if (nilvar == 6) {
      battle(lvl, 25, Math.round(hpcap/10), 50, "You meet a bandit on the road. (Lvl "+lvl+")");
    } else if (nilvar == 7) {
      battle(lvl + 2, 25, Math.round(hpcap/5), 20, "A lone orc charges you. (Lvl "+(lvl + 2)+")");
    } else if (nilvar == 8) {
      battle(lvl + 1, 10, Math.round(hpcap/4), 75, "A Wolfbear roars in your face. (Lvl "+(lvl + 1)+")");
    } else if (nilvar == 9) {
      battle(Math.round(lvl/2), 10, Math.round(hpcap/20), 10, "You come across a goblin theif. (Lvl "+Math.round(lvl/2)+")");
    } else if (nilvar == 10) {
      nilvar = rand(1, 20);
      
      if(nilvar == 20) {
        battle(20, 2000, hpcap - 10, 50, "You find the Killer Rabbit of Karbanogg!");
      } else {
        say("Nothing happens.", 0);
      }
    } else if (nilvar == 11) {
      magic();
    } else if (nilvar == 12) {
      trade();
    } else if (nilvar == 13) {
      if (lvl < 15) {
        say("You are mugged by some orcs. -10 HP - 10 gold", 0);
        hp = hp - 10;
        gold = gold - 10;
      } else {
        say("A band of raiders passes you on the road.", 0);
      }
    } else if (nilvar == 14) {
      say("You find some supplies.", 0);
      nilvar = rand(1, 50);
      say("- You got "+nilvar+" gold.", 1);
      gold = gold + nilvar;
      nilvar = rand(1, 3);
      say("- You found "+nilvar+" potions.", 2);
      potion = potion + nilvar;
    } else if (nilvar == 15) {
      say("You leap around on some rocks. +10 XP", 0);
      xp = xp + 10;
    } else if (nilvar == 16) {
      say("You wade a small creek. +5 XP", 0);
      xp = xp + 5;
    } else if (nilvar == 17) {
      say("The dirt path winds through the fields.", 0);
    } else if (nilvar == 18) {
      say("You lose some gold in a stream. - 5 gold", 0);
      gold = gold - 5;
    } else if (nilvar == 19) {
      say("You spend some time tuning up your weapon. +2 Modifier", 0);
      owned_mod = owned_mod + 2;
    } else if (nilvar == 20) {
      say("You sit down for a quick meal. +5 HP", 0);
      hp = hp + 5;
    }
  } else {
    run();
  }
}

function engage() {
  if (action == 1) {
    fight();
  } else if (action == 2) {
    buy();
  } else {
    prac();
  }
}

function heal() {
  hp = hp + 10;
  potion = potion - 1;
  say("You drank a potion. +10 HP", 0);
}
