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
const emptyBoard = new Image(); emptyBoard.src = "img/emptyBoard.png";
const hiddenBoard = new Image(); hiddenBoard.src = "img/hiddenBoard.png";

//Variables
const cvs = document.getElementById("board");
const ctx = cvs.getContext("2d");
var player1, player2, nbrRounds, winningPlayer;
var hideColors = false;
var pts;
var score1 = [];
var score2 = [];
var totalScore1 = 0, totalScore2 = 0;
var table = document.getElementById("table");
const box = 24;

var row = [];
row[0] = {h1:empty,h2:empty,h3:empty,h4:empty}
for (i=1;i<13;i++) {row[i] = {h1:empty,h2:empty,h3:empty,h4:empty,y:i*box*2-box,count:0}}
var selectedHole = {x:box*3,y:box*23,left:true,right:false,column:1}
var nbrOfRows = 12;
var count;
var turn = 1; round = 1;
var correctPosition, correctColour;


document.addEventListener("keydown", keyboard);

function keyboard(){
    let key = event.keyCode;
    if (key==37){selectedHoleLeft()}
    if (key==39){selectedHoleRight()}
}

function selectedHoleRight(){
    if (selectedHole.right == false){
        selectedHole.x += box*2;
        selectedHole.column ++;
        ctx.drawImage(select,selectedHole.x,selectedHole.y,box,box);}
    else {ctx.drawImage(select,selectedHole.x,selectedHole.y,box,box)}

    if (selectedHole.x == box && selectedHole.y != box*23){selectedHole.left = true} 
    else if (selectedHole.x == box*3 && selectedHole.y == box*23){selectedHole.left = true}
    else {selectedHole.left = false};

    if (selectedHole.x == box*7 && selectedHole.y != box*23){selectedHole.right = true} 
    else if (selectedHole.x == box*9 && selectedHole.y == box*23){selectedHole.right = true}
    else {selectedHole.right = false};
    draw();
}

function selectedHoleLeft(){
    if (selectedHole.left == false){
        selectedHole.x -= box*2;
        selectedHole.column --;
        ctx.drawImage(select,selectedHole.x,selectedHole.y,box,box);
        if (selectedHole.x == box*2){selectedHole.left = true};}
    else {ctx.drawImage(select,selectedHole.x,selectedHole.y,box,box)}
    
    if (selectedHole.x == box && selectedHole.y != box*23){selectedHole.left = true} 
    else if (selectedHole.x == box*3 && selectedHole.y == box*23){selectedHole.left = true}
    else {selectedHole.left = false};

    if (selectedHole.x == box*7 && selectedHole.y != box*23){selectedHole.right = true} 
    else if (selectedHole.x == box*9 && selectedHole.y == box*23){selectedHole.right = true}
    else {selectedHole.right = false};
    draw();
}

function changeLine(){
    
    if (nbrOfRows == 12) {
        selectedHole.x = box;
        selectedHole.y = box;
        selectedHole.right = false;
        nbrOfRows = 1;
        selectedHole.column = 1;
        hideColors=true;
        document.getElementById("text1").innerHTML = "Pick a color";
        document.getElementById("changeLineButton").style.visibility="hidden"

        if(turn == 1){
            document.getElementById("player").innerHTML = player1;
            document.getElementById("player").className = "player1";
            }
        else {
            document.getElementById("player").innerHTML = player2;
            document.getElementById("player").className = "player2";
        }

        draw();
    }
    else{
    comparison();

    selectedHole.y += box*2;
    selectedHole.x = box;
    selectedHole.right = false;
    selectedHole.left = true;
    selectedHole.column = 1;
    nbrOfRows++;
    count = 0;
    document.getElementById("changeLineButton").style.visibility="hidden"


    draw();
    }
}

//Compare guess with solution
function comparison(){

    var a1,a2,a3,a4,b1,b2,b3,b4,hint1,hint2,hint3,hint4;
    a1 = row[nbrOfRows].h1;
    a2 = row[nbrOfRows].h2;
    a3 = row[nbrOfRows].h3;
    a4 = row[nbrOfRows].h4;
    b1 = row[12].h1;
    b2 = row[12].h2;
    b3 = row[12].h3;
    b4 = row[12].h4;


    correctPosition=0;
    if (a1 == b1){correctPosition++;a1=1;b1=0;hint1=1}
    if (a2 == b2){correctPosition++;a2=1;b2=0;hint2=1}
    if (a3 == b3){correctPosition++;a3=1;b3=0;hint3=1}
    if (a4 == b4){correctPosition++;a4=1;b4=0;hint4=1}

    correctColour=0;
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
    
    pts = -nbrOfRows+12;
    document.getElementById("pts").innerHTML= pts;

    if (correctPosition == 4){// If colors correspond than we display the "victory" box
        selectedHole.y = undefined; selectedHole.x = undefined;
        document.getElementById("victoryMenu").style.visibility="visible";
        table.rows[round].cells[turn].textContent = pts;
        hideColors=false;
        if(turn==1){
            totalScore1 = totalScore1 + pts;
            document.getElementById("total1").textContent = totalScore1;}
        else{
            totalScore2 = totalScore2 + pts;}
            document.getElementById("total2").textContent = totalScore2;}



    else if (nbrOfRows == 11) { //If the colors are wrong and the it's the 12th row we display the "defeat" box
    document.getElementById("defeatMenu").style.visibility="visible";
    hideColors=false;

    selectedHole.y = undefined; selectedHole.x = undefined;
    }


    




}

//Draw
function draw() {




    for (i=1;i<12;i++){ //This sets the color of the 48 holes ("empty" by default)
        ctx.drawImage(row[i].h1,box,row[i].y,box,box);
        ctx.drawImage(row[i].h2,box*3,row[i].y,box,box);
        ctx.drawImage(row[i].h3,box*5,row[i].y,box,box);
        ctx.drawImage(row[i].h4,box*7,row[i].y,box,box);
    }
    if (hideColors == true){ctx.drawImage(hiddenBoard,box*0.8,box*22.7,box*11.2,box*1.65)}
    else{
    ctx.drawImage(row[12].h1,box*3,box*23,box,box);
    ctx.drawImage(row[12].h2,box*5,box*23,box,box);
    ctx.drawImage(row[12].h3,box*7,box*23,box,box);
    ctx.drawImage(row[12].h4,box*9,box*23,box,box);}


    

    ctx.drawImage(select,selectedHole.x,selectedHole.y,box,box) //Draw the red marker
    
    }
