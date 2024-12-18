let boxes = document.querySelectorAll(".but");
let msg = document.querySelector("#msg");
let result = document.querySelector(".result");
let newBtn = document.querySelector("#new-but");
let resetBtn = document.querySelector("#reset-but");

const winpatterns = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8],  
    [0,3,6],  
    [1,4,7],  
    [2,5,8],  
    [0,4,8], 
    [2,4,6] ];

let turnO = true;
let count = 0;

const resetGame = () => {
    count = 0;
    turnO = true;
    enableBoxes();
    result.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true; // --- That box will be disabled that is choosen for marking O or X ---
        count++;
        
        const isWinner = checkWinner();

        if(count == 9 && !isWinner){
            draw();
        }
    });

});

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const draw = () => {
    result.classList.remove("hide");
    msg.innerText = `Draw`;
    disableBoxes();
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations ${winner} is Winner`;
    result.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winpatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
                return true;
            }
        }
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);