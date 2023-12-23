/* ******* background ****** */
let board;
let boardWidth=360;
let boardHeight=640;
let context;

/* ******* rocket ****** */
let rocketWidth=95;
let rocketHeight=60;
let rocket_X=boardWidth/8;
let rocket_Y=boardHeight/2;
let rocketImg;

let rocket={
    x: rocket_X,
    y: rocket_Y,
    width: rocketWidth,
    height: rocketHeight
}

let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

window.onload=function(){
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context=board.getContext("2d");

    //rocket
    rocketImg = new Image();
    rocketImg.src = "../Assets/Ku-default.PNG";
    rocketImg.onload = function() {
        context.drawImage(rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);
    }
}



