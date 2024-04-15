let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let newGameBtn = document.querySelector("#newG-btn");
let msg = document.querySelector("#msg");
let msgConatiner = document.querySelector(".msg-container");


let turnO = true; //playerX, player0
let movesCount = 0; // COunter to keep track of moves

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [6,7,8],
    [2,5,8],
    [1,4,7],
    [2,4,6]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    movesCount = 0; //Reset moves count
    msgConatiner.classList.add("hide");
}
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        // console.log("Box was clicked!!!");
        //playerO
        if(turnO){
            box.innerText = "O";
            turnO=false;
        } else{
        //playerX
            box.innerText = "X";
            turnO=true;
        }
        movesCount++; // Increment moves count
        box.disabled=true;
        checkWinner();
        drawMatch(); // Check for draw after each move
    });
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
      msg.innerText = `Congratulations, Winner is ${winner}`;
      msgConatiner.classList.remove("hide");
      disableBoxes();
}

const drawMatch = () => {
    if (movesCount === 9) {
        msg.innerText = "It's a Draw!";
        msgConatiner.classList.remove("hide");
        disableBoxes();
    }
}
const checkWinner = () =>{
    for(let pattern of winPatterns) {
        // console.log(pattern[0],pattern[1], pattern[2] )
        // console.log(boxes[pattern[0]].innerText, 
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText);

            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
                if (pos1Val === pos2Val && pos2Val === pos3Val){
                //    console.log("WINNER!!!", pos1Val);
                   showWinner(pos1Val);
                   drawMatch();
                }
            }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
