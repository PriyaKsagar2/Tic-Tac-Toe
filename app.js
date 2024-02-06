let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetButton");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turn0 = true; //player X player O 

function triggerConfetti() {
    // Configure confetti options
    var confettiConfig = {
      angle: 90,
      spread: 360,
      startVelocity: 40,
      elementCount: 50,
      decay: 0.9,
    };

    // Trigger confetti animation
    confetti(confettiConfig);
  }

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
  };

boxes.forEach((box)=>{

    box.addEventListener("click", ()=>{

        console.log("Box was clicked!")

        if(turn0){
            box.innerText = "O";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            turn0 = true;
        }

        box.disabled = true;

        checkWinner();
    });

});

const disableBoxes = ()=>{
    for(box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()=>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) =>{
    msg.innerText= `Congratulations, winner is ${winner}!`
    msgContainer.classList.remove("hide");
    document.querySelector("#resetButton").classList.add("hide");
    const boxes = document.getElementsByClassName("box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.add("hide");
    }

    disableBoxes();
};

let checkWinner = ()=>{
    for(let pattern of winPatterns){

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1===pos2 && pos2===pos3){
                showWinner(pos1);
                triggerConfetti();
                console.log(`Winner is ${pos1} !!`);
            }
        }
    }
};

const newGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    document.querySelector("#resetButton").classList.remove("hide");
    const boxes = document.getElementsByClassName("box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove("hide");
    }
  };

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);
