var input = "null";

setData("welcome");

document.getElementById("searchbar").onkeypress = function(e) {
    var event = e || window.event;
    var charCode = event.which || event.keyCode;

    if ( charCode == '13' ) {
      search();
    }
};

function search() {
    input = document.getElementById('searchbar').value;
    input = input.replace(/'/g, '');
    input = input.replace(/,/g, '');
    input = input.replace(/A/g, 'a');
    input = input.replace(/B/g, 'b');
    input = input.replace(/C/g, 'c');
    input = input.replace(/D/g, 'd');
    input = input.replace(/E/g, 'e');
    input = input.replace(/F/g, 'f');
    input = input.replace(/G/g, 'g');
    input = input.replace(/H/g, 'h');
    input = input.replace(/I/g, 'i');
    input = input.replace(/J/g, 'j');
    input = input.replace(/K/g, 'k');
    input = input.replace(/L/g, 'l');
    input = input.replace(/M/g, 'm');
    input = input.replace(/N/g, 'n');
    input = input.replace(/O/g, 'o');
    input = input.replace(/P/g, 'p');
    input = input.replace(/Q/g, 'q');
    input = input.replace(/R/g, 'r');
    input = input.replace(/S/g, 's');
    input = input.replace(/T/g, 't');
    input = input.replace(/U/g, 'u');
    input = input.replace(/V/g, 'v');
    input = input.replace(/W/g, 'w');
    input = input.replace(/X/g, 'x');
    input = input.replace(/Y/g, 'y');
    input = input.replace(/Z/g, 'z');
    input = input.replace(/ /g, '_');

    
    setData(input);
}

function setData(file) {
    var head = findFile("files/"+file+".txt", 0);
    var txt = findFile("files/"+file+".txt", 1);
    
    if (txt === undefined) {
        alert("404: Entry not found!");
        document.getElementById("header").innerHTML = "Faceless Old Woman";
        document.getElementById("content").innerHTML = "'That file does not exist.'";
    } else {
        document.getElementById("header").innerHTML = head;
        document.getElementById("content").innerHTML = txt;
    }
}

function findFile(file, content) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.send(null);
    var allText = rawFile.responseText;
    
    var output = allText.split("--:--");
    console.log(output);
    return output[content];
}
