//Images
const ground = new Image(); ground.src = "img/ground.png";
const red = new Image(); red.src = "img/red.png";
const yellow = new Image(); yellow.src = "img/yellow.png";
const green = new Image(); green.src = "img/green.png";
const pink = new Image(); pink.src = "img/pink.png";
const cyan = new Image(); cyan.src = "img/cyan.png";
const blue = new Image(); blue.src = "img/blue.png";
const orange = new Image(); orange.src = "img/orange.png";
const white = new Image(); white.src = "img/white.png";
const empty = new Image(); empty.src = "img/empty.png";
const select = new Image(); select.src = "img/select.png";


//Variables
const cvs = document.getElementById("board");
const ctx = cvs.getContext("2d");
const box = 24;

var colours = [red,yellow,green,pink,cyan,blue,orange,white,empty]
var selectedColour = undefined; 


var row = [];
row[0] = {h1:empty,h2:empty,h3:empty,h4:empty}
for (i=1;i<13;i++) {row[i] = {h1:empty,h2:empty,h3:empty,h4:empty,y:i*box*2-box,count:0}}
var selectedHole = {x:box,y:box,left:true,right:false,column:1}
var nbrOfRows = 1;
var count;
var correctPosition, correctColour;
var changeLineBtnDisplay = false;


//Functions

function firstRowSetting (){ //Generates the 4 colors secret combination
    var r1,r2,r3,r4;
    r1 = Math.floor(Math.random()*8)
    row[0].h1 = colours[r1]
    r2 = Math.floor(Math.random()*8)
    row[0].h2 = colours[r2]
    r3 = Math.floor(Math.random()*8)
    row[0].h3 = colours[r3]
    r4 = Math.floor(Math.random()*8)
    row[0].h4 = colours[r4]
}

function draw() { // Draws the 44 colors holes

for (i=1;i<12;i++){ //Draws the color of the 48 holes ("empty" by default)
    ctx.drawImage(row[i].h1,box,row[i].y,box,box);
    ctx.drawImage(row[i].h2,box*3,row[i].y,box,box);
    ctx.drawImage(row[i].h3,box*5,row[i].y,box,box);
    ctx.drawImage(row[i].h4,box*7,row[i].y,box,box);
}

ctx.drawImage(select,selectedHole.x,selectedHole.y,box,box) //Draws the red marker
}


//Moves the selected hole with keyboard keys
document.addEventListener("keydown", keyboard);

function keyboard(){
    let key = event.keyCode;
    if (key==37){selectedHoleLeft()}
    if (key==39){selectedHoleRight()}
    if (key==13 && changeLineBtnDisplay == true){changeLine()}
}

function selectedHoleRight(){
    if (selectedHole.right == false){
        selectedHole.x += box*2;
        selectedHole.column ++;
        ctx.drawImage(select,selectedHole.x,selectedHole.y,box,box);}
    else {ctx.drawImage(select,selectedHole.x,selectedHole.y,box,box)}
    if (selectedHole.x == box){selectedHole.left = true} else {selectedHole.left = false};
    if (selectedHole.x == box*7){selectedHole.right = true} else {selectedHole.right = false};
    draw();
}

function selectedHoleLeft(){
    if (selectedHole.left == false){
        selectedHole.x -= box*2;
        selectedHole.column --;
        ctx.drawImage(select,selectedHole.x,selectedHole.y,box,box);
        if (selectedHole.x == box*2){selectedHole.left = true};}
    else {ctx.drawImage(select,selectedHole.x,selectedHole.y,box,box)}
    if (selectedHole.x == box){selectedHole.left = true} else {selectedHole.left = false};
    if (selectedHole.x == box*7){selectedHole.right = true} else {selectedHole.right = false};
    draw();
}

//Compares the guess with the secret combination 
function comparison(){

    var a1,a2,a3,a4,b1,b2,b3,b4,hint1,hint2,hint3,hint4;
    a1 = row[nbrOfRows].h1;
    a2 = row[nbrOfRows].h2;
    a3 = row[nbrOfRows].h3;
    a4 = row[nbrOfRows].h4;
    b1 = row[0].h1;
    b2 = row[0].h2;
    b3 = row[0].h3;
    b4 = row[0].h4;


    correctPosition=0; //Nbr of correct colors on correct position
    if (a1 == b1){correctPosition++;a1=1;b1=0;hint1=1}
    if (a2 == b2){correctPosition++;a2=1;b2=0;hint2=1}
    if (a3 == b3){correctPosition++;a3=1;b3=0;hint3=1}
    if (a4 == b4){correctPosition++;a4=1;b4=0;hint4=1}

    correctColour=0; //Nbr of correct colors on wrong position
    if (a1 == b2){correctColour++;a1=1;b2=0}
    if (a1 == b3){correctColour++;a1=1;b3=0}
    if (a1 == b4){correctColour++;a1=1;b4=0}

    if (a2 == b1){correctColour++;a2=1;b1=0}
    if (a2 == b3){correctColour++;a2=1;b3=0}
    if (a2 == b4){correctColour++;a2=1;b4=0}

    if (a3 == b1){correctColour++;a3=1;b1=0}
    if (a3 == b2){correctColour++;a3=1;b2=0}
    if (a3 == b4){correctColour++;a3=1;b4=0}

    if (a4 == b1){correctColour++;a4=1;b1=0}
    if (a4 == b2){correctColour++;a4=1;b2=0}
    if (a4 == b3){correctColour++;a4=1;b3=0}

    //Draw the hints on the side of the board
    var p = 9*box+4.8;
    for (i=0;i<4;i++){
        if (i<correctPosition){
        ctx.drawImage(red,p,selectedHole.y+8,box/2.5,box/2.5)}
        else if (i<correctPosition+correctColour){ctx.drawImage(white,p,selectedHole.y+8,box/2.5,box/2.5)}
        else {ctx.drawImage(empty,p,selectedHole.y+8,box/2.5,box/2.5)}
        p += 16.8;
    }
    
    if (correctPosition == 4){ // If colors correspond than we display the "victory" box
        document.getElementById("victoryMenu").style.visibility="visible";
        ctx.drawImage(row[0].h1,box*3,box*23,box,box);
        ctx.drawImage(row[0].h2,box*5,box*23,box,box);
        ctx.drawImage(row[0].h3,box*7,box*23,box,box);
        ctx.drawImage(row[0].h4,box*9,box*23,box,box);
        selectedHole.y = undefined; selectedHole.x = undefined;
        }
    else if (nbrOfRows == 11) { //If the colors are wrong and the it's the 11th row we display the "defeat" box
    document.getElementById("defeatMenu").style.visibility="visible";
    ctx.drawImage(row[0].h1,box*3,box*23,box,box);
    ctx.drawImage(row[0].h2,box*5,box*23,box,box);
    ctx.drawImage(row[0].h3,box*7,box*23,box,box);
    ctx.drawImage(row[0].h4,box*9,box*23,box,box);
    selectedHole.y = undefined; selectedHole.x = undefined;

    }

    document.getElementById("pts").innerHTML=(-nbrOfRows+12)
}