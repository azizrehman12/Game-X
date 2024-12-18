let boxes = document.querySelectorAll(".but");
let line = document.querySelector(".line");

const winpatterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top-left
    [2, 4, 6]  // diagonal from top-right
];

let turnO = true;
let count = 0;

const resetGame = () => {
    count = 0;
    turnO = true;
    enableBoxes();
    line.classList.add("hide");
    line.classList.remove("horizontal", "vertical", "diagonal-right", "diagonal-left");
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        const isWinner = checkWinner();

        if (count == 9 && !isWinner) {
            draw();
        }
    });
});

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const draw = () => {
    alert("Draw!");
    setTimeout(resetGame, 2000);
};

const showWinner = (winner, pattern) => {

    drawWinningLine(pattern);


    setTimeout(resetGame, 5000); // Restart game after 5 seconds
};

const drawWinningLine = (pattern) => {
    line.classList.remove("hide");

    if (pattern[0] === 0 && pattern[1] === 1 && pattern[2] === 2 || 
        pattern[0] === 3 && pattern[1] === 4 && pattern[2] === 5 || 
        pattern[0] === 6 && pattern[1] === 7 && pattern[2] === 8) {
        line.classList.add("horizontal");
    } else if (pattern[0] === 0 && pattern[1] === 3 && pattern[2] === 6 || 
               pattern[0] === 1 && pattern[1] === 4 && pattern[2] === 7 || 
               pattern[0] === 2 && pattern[1] === 5 && pattern[2] === 8) {
        line.classList.add("vertical");
    } else if (pattern[0] === 0 && pattern[1] === 4 && pattern[2] === 8) {
        line.classList.add("diagonal-right");
    } else if (pattern[0] === 2 && pattern[1] === 4 && pattern[2] === 6) {
        line.classList.add("diagonal-left");
    }
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1, pattern);
                return true;
            }
        }
    }
    return false;
};

document.querySelector("#reset-but").addEventListener("click", resetGame);