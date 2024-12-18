var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
    document.getElementById('restartButton').addEventListener('click', restartGame); // Add restart button event listener
}

function setGame() {
    board =[
       [0,0,0,0],
       [0,0,0,0],
       [0,0,0,0],
       [0,0,0,0]
    ]

    for (let r=0; r<rows; r++){
        for (let c=0;c<columns;c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for (let r=0; r < rows; r++){
        for (let c=0; c < columns; c++){
            if (board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    if(!hasEmptyTile()){
        return;
    }

    let found = false;
    while(!found){
        let r= Math.floor(Math.random() * rows); 
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] ==0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found= true;
        }
    }
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value =""; //clear the class list
    tile.classList.add("tile");
    if(num>0){
        tile.innerText=num;
        if(num <=4096){
            tile.classList.add("x" +num.toString());
        } else{
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup",(e) => {
    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
    
    if (!canMove()) {
        document.getElementById("gameOverMessage").style.display = 'block'; // Show "You lose" message
    }
})

function filterZero(row){
    return row.filter(num => num !=0); // create a new array without zero
}

function slide(row){
    row = filterZero(row); // get rid of zeroes -> [2,2,2]

    for(let i=0; i< row.length-1; i++) {
        if (row[i] == row[i+1]){
            row[i] *=2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row); //[4,2]

    while(row.length < columns){
        row.push(0);
    }

    return row;
}

function slideLeft() {
    for(let r=0; r<rows; r++){
        let row = board[r];
        row =slide(row);
        board[r] =row;

        for (let c=0; c<columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideRight() {
    for(let r=0; r<rows; r++){
        let row = board[r];
        row.reverse();
        row =slide(row);
        row.reverse();
        board[r] =row;

        for (let c=0; c<columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideUp(){
    for (let c=0; c<columns; c++){
        let row =[board[0][c],board[1][c],board[2][c],board[3][c]];
        row = slide(row);
        for (let r=0; r<rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    } 
}

function slideDown(){
    for (let c=0; c<columns; c++){
        let row =[board[0][c],board[1][c],board[2][c],board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r=0; r<rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    } 
}

// Check if any moves are possible
function canMove() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
            if (c < columns - 1 && board[r][c] == board[r][c + 1]) {
                return true;
            }
            if (r < rows - 1 && board[r][c] == board[r + 1][c]) {
                return true;
            }
        }
    }
    return false;
}

// Restart the game
function restartGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("board").innerHTML = ""; // Clear the board
    setGame();
    document.getElementById("gameOverMessage").style.display = 'none'; // Hide "You lose" message
}
