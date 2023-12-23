/* ******* background ****** */
let board;
let boardwidth=360;
let boardHeight=640;
let context;



window.onload=function(){
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardwidth;
    context=board.getContext("2d");


}