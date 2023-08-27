// Coding Steps:
// Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
// Create a Tic-Tac-Toe game grid using your HTML element of choice.
// When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
// A heading should say whether it is X's or O's turn and change with each move made.
// A button should be available to clear the grid and restart the game.
// When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.

//what I want to add to this is a way to keep score and show that at the bottom as a continual addition each time 
//also refactor using bootstrap and jQuery
  

const boxs = document.querySelectorAll('.box');
const statusText = document.querySelector('#status');
const btnRestart = document.querySelector('#restart'); 

//these are the images of the X and O for the game board
let x = "<img src='images/redXptbrush.png'>";

let o = "<img src='images/blackOptbrush.png'>"; 

//these are the winning combinations to determine whose the winner or if it's a draw
const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["", "", "", "", "", "", "", "", "" ];
let currentPlayer = x;
let player = "X"; 

let running = false;


//this will 
start();

function start() {
    boxs.forEach(box => box.addEventListener("click", boxClick));
    btnRestart.addEventListener("click", restartGame); 
    statusText.textContent = `${player} Your Turn`;
    running=true;
}
function boxClick() {
    const index = this.dataset.index;
    if(options[index]!= "" || !running) {
        return; 
    }
    updateBox(this,index);
    checkWinner(); 
}
function updateBox(box, index) {
    options[index] = player; 
    box.innerHTML = currentPlayer; 
}

function changePlayer () {
    player = (player == 'X') ? "O" : "X";
    currentPlayer = (currentPlayer == x) ? o : x; 
    statusText.textContent = `${player} Your Turn`; //if doesn't work could be textContent
}

function checkWinner () {
    let isWon = false; 
    for(let i = 0; i < win.length; i++) {
        const condition = win[i]; //[0,1,2,]
        const box1 = options[condition[0]]; //x
        const box2 = options[condition[1]]; //''
        const box3 = options[condition[2]]; //''
        if(box1 == "" || box2 == "" || box3 == "") {
            continue;
        }
        if(box1 == box2 && box2 == box3) {
            isWon = true; 
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
        }
    }

        if(isWon) {
            statusText.textContent = `${player} Won!!`; 
            running = false;
        } else if (!options.includes("")) {
            statusText.textContent = `Game Draw..!`; 
            running = false;
        } else {
            changePlayer(); 
        }

}


function restartGame () {
    options = ["", "", "", "", "", "", "", "", ""]; 
    currentPlayer = x; 
    player = "X"; 
    running = true;
    statusText.text = `${player} Your Turn`; 

    boxs.forEach(box => {
        box.innerHTML = ""; //this will reset the cell back to blank
        //another way of refactoring is put .html()
        box.classList.remove('win');
    });
}













