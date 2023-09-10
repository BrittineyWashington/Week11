//Coding Steps: 
//what I want to add to this is a way to keep score and show that at the bottom as a continual addition each time 
//also refactor using bootstrap and jQuery
//add a way to let the user enter their own name as a prompt and the option to play with the computer or another player. 
  

//these create the variables that will hold the value of the html element we have grabbed either by querySelector or querySelectorAll
const boxs = document.querySelectorAll('.box');
const statusText = document.querySelector('#status');
const btnRestart = document.querySelector('#restart'); 

//these are the images of the X and O for the game board
let x = "<img src='images/redXptbrush.png'>";

let o = "<img src='images/redOptbrush.png'>";
// let o = "<img src='images/blackOptbrush.png'>"; 

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

//these are the variables for the players and their options
let options = ["", "", "", "", "", "", "", "", "" ];
let currentPlayer = x;
let player = "X"; 

let playerOTurn = false;


//this will start the game
start();

function start() {
    boxs.forEach(box => box.addEventListener("click", boxClick));//this method will be on every boxs that's clicked or will wait fort that event
    btnRestart.addEventListener("click", restartGame); //waits for this btn to be clicked
    statusText.textContent = `${player} Your Turn`;
    playerOTurn=true;
}

//this adds the functionality to the above method named in our start() function
//this boxClick() function will updt the box with the current player's move and determine if there is a winner
 function boxClick() {
    const index = this.dataset.index;
    if(options[index]!= "" || !playerOTurn) {
        return; 
    }
    updateBox(this,index);
    checkWinner(); 
}
function updateBox(box, index) {
    options[index] = player; 
    box.innerHTML = currentPlayer; 
}

//this switches the player between X and O & updts the text accordingly
function changePlayer () {
    player = (player == 'X') ? "O" : "X";
    currentPlayer = (currentPlayer == x) ? o : x; 
    statusText.textContent = `${player} Your Turn`; //shows whos turn it is currently
}

//this will check the current state to see if any of the winning combos have been selected, determines if a winner or if its a draw
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
        //this will add the "win" class to the box if a winner is found
        if(box1 == box2 && box2 == box3) {
            isWon = true; 
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
        }
    }

    //this determines who is the winner or if the game is a draw
        if(isWon) {
            statusText.textContent = `${player} Won!!`; 
            playerOTurn = false;
        } else if (!options.includes("")) {
            statusText.textContent = `Game Draw..!`; 
            playerOTurn = false;
        } else {
            changePlayer(); 
        }

}

//this will reset the game board, options and game status to the intial state
function restartGame () {
    options = ["", "", "", "", "", "", "", "", ""]; 
    currentPlayer = x; 
    player = "X"; 
    playerOTurn = true;
    statusText.text = `${player} Your Turn`; 

    boxs.forEach(box => {
        box.innerHTML = ""; //this will reset the cell back to blank
        //another way of refactoring is put .html()
        box.classList.remove('win');
    });
}













