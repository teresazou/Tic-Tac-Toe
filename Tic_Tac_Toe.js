var origBoard
const HumPlayer="O"
const AiPlayer="X"
const winCombs=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

function define(){
    const cell=document.querySelectorAll('.box');
    
    return cell
}



// After clicking the start game button, Change the page to the board 
function toggle() {
    var x = document.getElementById("t");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    document.getElementById("game-name").style.margintop="1rem";
    startover=document.querySelector('.startover')
    startover.style.display="flex";
    document.getElementById("landing-page").appendChild(startover);
    
    grids()
    
    startgame()
    }

function grids(){
for (var i = 0; i < 3; i++) {
    var row = document.createElement('div');
    row.className = "row";
    for (var j = 0; j < 3; j++) {
        var box = document.createElement('div');
        box.className = "box";
        if(i===0){box.id=j;
        }else if(i===1){box.id=j+3;
        }else{box.id=j+6}
        row.appendChild(box);
    }                
    document.getElementById('landing-page').appendChild(row);
}
}


function startgame(){ 
const cell=define();
for(var i=0;i<cell.length;i++){
    cell[i].innerText=null;
    document.getElementById(i).style.backgroundColor=null;
    document.querySelector('.endgame').style.display=null;
    origBoard=Array.from(Array(9).keys())//just created an array with 0-8 numbers in a fancy way
    cell[i].addEventListener('click',Turnclick,false);
    
}
}



function Turnclick(square){
    if(typeof origBoard[square.target.id]=="number"){
        turn(square.target.id,HumPlayer)
     if(turn(square.target.id,HumPlayer)!=true){
       if(!checkTie()) { turn(bestSpot(),AiPlayer)}

       else{ declareWinner("Tie Game!")};
       
    }

    
}
}


function turn(sqareID,player){
origBoard[sqareID]=player;
document.getElementById(sqareID).innerText=player;
let Gamewon=checkWin(origBoard,player)

if(Gamewon){
    Gameover(Gamewon)
    return true
}
}




function checkWin(board, player){
    
let plays=board.reduce((prev,current,index)=>{
    if(current==player){
        prev.push(index)
    }
return prev},[])

let Gamewon=null;

for(let[index, win] of winCombs.entries()){
    if(win.every(element=>plays.indexOf(element)>-1)){
        Gamewon={index:index,player:player}
        break;}
    }

return Gamewon

}


function Gameover(Gamewon){
    const cell=define();
    for(let index of winCombs[Gamewon.index]){
        document.getElementById(index).style.backgroundColor=
            Gamewon.player==HumPlayer?"blue":"red";}
    for(var i=0;i<cell.length;i++){
        cell[i].removeEventListener("click",Turnclick,false)
    }
    
    declareWinner(Gamewon.player==HumPlayer ? "You Win!" : "You Loose!")
}

function declareWinner(Who){
     document.querySelector('.endgame').style.display="flex"
     document.querySelector('.endgame .text').innerText=Who
}
function emptySquares(board){
    return board.filter(s=>typeof s==="number") //return an array with only number items, all the squares with numbers are empty and we need to find them
}

function bestSpot(){
return minimax(origBoard,AiPlayer).index;
}

function checkTie(){
    const cell=define();
    if (emptySquares(origBoard).length==0){
        for ( var i; i<cell.length;i++){
            cell[i].style.backgroundColor="green"
            cell[i].removeEventListener('click',Turnclick,false)
        }
        
        //declareWinner("Tie Game!")
        return true
    }
    return false
}

function minimax(newboard,player){
    var availspot= emptySquares(newboard)
    //check for termial states such as win, loose or tie
    //accordingly return a value
    if (checkWin(newboard,HumPlayer)){
        return {score:-10}
    }else if(checkWin(newboard,AiPlayer)){
        return {score:10}
    }else if(availspot.length==0){
        return {score:0}
    }
var moves=[]

    //loop through avalibale spots
    for(var i=0;i<availspot.length;i++){
    //create an object for each and store the index of that spot
        var move={}
        move.index=newboard[availspot[i]]
    // set the empty spot to the current player
    newboard[availspot[i]] = player;
    
/*collect the score resulted from calling minimax 
      on the opponent of the current player*/
      if (player == AiPlayer){
        var result = minimax(newboard, HumPlayer);
        move.score = result.score;
      }
      else{
        var result = minimax(newboard, AiPlayer);
        move.score = result.score;
      }

// reset the spot to empty
newboard[availspot[i]] = move.index;
// push the object to the array
moves.push(move)
    }//forloop ends here

// if it is the computer's turn loop over the moves and choose the move with the highest score
var bestMove;
if(player === AiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
}else{
// else loop over the moves and choose the move with the lowest score
var bestScore = 10000;
for(var i = 0; i < moves.length; i++){
  if(moves[i].score < bestScore){
    bestScore = moves[i].score;
    bestMove = i;
  }
}
}
// return the chosen move (object) from the moves array
return moves[bestMove];

}