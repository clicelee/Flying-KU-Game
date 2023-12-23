/* ******* background ****** */
let board;
let boardWidth=360;
let boardHeight=640;
let context;

/* ******* rocket ****** */
let rocketWidth=74;
let rocketHeight=48;
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
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;



let velocityX = -2; //pipes moving left speed
let velocityY = 0; //rocket jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;

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


    topPipeImg=new Image();
    topPipeImg.src="../Assets/Top-pipe.png";
    bottomPipeImg=new Image();
    bottomPipeImg.src="../Assets/Bottom-pipe.png";


    requestAnimationFrame(update);
    setInterval(placePipes,1500);
    document.addEventListener("keydown", moverocket);
}


function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //rocket
    velocityY += gravity;
    // rocket.y += velocityY;
    rocket.y = Math.max(rocket.y + velocityY, 0); //apply gravity to current rocket.y, limit the rocket.y to top of the canvas
    context.drawImage(rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);

    if (rocket.y > board.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && rocket.x > pipe.x + pipe.width) {
            score += 0.5; //0.5 because there are 2 pipes! so 0.5*2 = 1, 1 for each set of pipes
            pipe.passed = true;
        }

        if (detectCollision(rocket, pipe)) {
            gameOver = true;
        }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //removes first element from the array
    }

    //score
    context.fillStyle = "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
}

function placePipes(){
    if (gameOver) {
        return;
    }


    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;


    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}



function moverocket(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        //jump
        velocityY = -6;

        //reset game
        if (gameOver) {
            rocket.y = rocketY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}