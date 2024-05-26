let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let playerTurnRef = document.getElementById("player-turn");

// Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// Jucatorul 'x' joaca primul
let xTurn = true;
let count = 0;
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  // Enable popup
  popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  // Disable popup
  popupRef.classList.add("hide");
  updatePlayerTurn();
};

// This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' A castigat!";
    scoreX++;
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' A castigat!";
    scoreO++;
  }
  updateScoreboard();
};

// Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> Este egalitate!";
  scoreDraw++;
  updateScoreboard();
};

// Update scoreboard
const updateScoreboard = () => {
  document.getElementById("score-x").innerText = scoreX;
  document.getElementById("score-o").innerText = scoreO;
  document.getElementById("score-draw").innerText = scoreDraw;
};

// Update player turn display
const updatePlayerTurn = () => {
  playerTurnRef.innerText = `Rândul jucătorului: ${xTurn ? "X" : "O"}`;
};

// New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  // Menținem scorurile curente
});

// Restart
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  // Resetăm scorurile
  scoreX = 0;
  scoreO = 0;
  scoreDraw = 0;
  updateScoreboard();
});

// Win Logic
const winChecker = () => {
  // Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    // Check if elements are filled
    // If 3 elements are same and not empty
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        // If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

// Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      // Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      // Display O
      element.innerText = "O";
      element.disabled = true;
    }
    // Increment count on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    // Check for win on every click
    winChecker();
    // Update player turn
    updatePlayerTurn();
  });
});

// Enable Buttons and disable popup on page load
window.onload = enableButtons;
