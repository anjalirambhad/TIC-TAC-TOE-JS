let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector(".msg");
let win = document.querySelector("#win");
let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
const resetGame = () => {
    turnO = true;
    count = 0;
    enabledBoxes();
    msg.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }

    });
});
const gameDraw =()=>{
    win.innerText = `GAME IS OVER! IT'S A TIE`;
    msg.classList.remove("hide");
    disabledBoxes();
};

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) => {
    win.innerText = `CONGRATULATIONS! WINNER IS ${winner}`;
    msg.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;
        if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                showWinner(posVal1);
                return true;
            }
        }
    }
};
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

