//-----------------------------------------------------------------------------------------------------------------
//Integrating rive characters:
//------------------------------------------------------------------------------------------------------------------
const Siddharth = new rive.Rive({
  src: "Characters/char-Siddharth.riv",
  // OR the path to a discoverable and public Rive asset
  // src: '/public/example.riv',
  canvas: document.getElementById("Siddharth"),
  autoplay: true,
  stateMachines: "StateMachine",
  onLoad: () => {
    Siddharth.resizeDrawingSurfaceToCanvas();
    console.log("loaded");
  },
});
const Dhaval = new rive.Rive({
  src: "Characters/char-Dhaval.riv",
  // OR the path to a discoverable and public Rive asset
  // src: '/public/example.riv',
  canvas: document.getElementById("Dhaval"),
  autoplay: true,
  stateMachines: "StateMachine",
  onLoad: () => {
    Dhaval.resizeDrawingSurfaceToCanvas();
    console.log("loaded");
  },
});
const Panth = new rive.Rive({
  src: "Characters/char-Panth.riv",
  // OR the path to a discoverable and public Rive asset
  // src: '/public/example.riv',
  canvas: document.getElementById("Panth"),
  autoplay: true,
  stateMachines: "StateMachine",
  onLoad: () => {
    Panth.resizeDrawingSurfaceToCanvas();
    console.log("loaded");
  },
});
//-----------------------------------------------------------------------------------------------------------------
//Integrating Krutarth
//------------------------------------------------------------------------------------------------------------------
const MightyVillain = new rive.Rive({
  src: "Characters/char-Villain.riv",
  // OR the path to a discoverable and public Rive asset
  // src: '/public/example.riv',
  canvas: document.getElementById("MightyVillain"),
  autoplay: true,
  stateMachines: "MightyVillainState",
  onLoad: () => {
    MightyVillain.resizeDrawingSurfaceToCanvas();
    console.log("loaded");
  },
});
//---------------------------------------------------------------------------------------------------------------------------------------
//Getting current selected player from local storage
//------------------------------------------------------------------------------------------------------------------------------------
selectedShape = localStorage.getItem("selectedShape");
console.log("Selected shape retrieved from localStorage:", selectedShape);
let currPlayer;
let action;
if (selectedShape === "Siddharth") {
  document.querySelector(`.boxSiddharth`).classList.remove("Hidden");
  currPlayer = Siddharth;
} else if (selectedShape === "Dhaval") {
  document.querySelector(`.boxDhaval`).classList.remove("Hidden");
  currPlayer = Dhaval;
} else if (selectedShape === "Panth") {
  document.querySelector(`.boxPanth`).classList.remove("Hidden");
  currPlayer = Panth;
} else if (selectedShape === "square") {
  document.querySelector(`.boxD`).classList.remove("Hidden");
}
//----------------------------------------------------------------------------------------------------------------------------------------
//Integrating rock paper sissor button and calling different function
//----------------------------------------------------------------------------------------------------------------------------------------
let allowAction = false;
const r = new rive.Rive({
  src: "Buttons/RockButton.riv",
  canvas: document.getElementById("canvasRock"),
  autoplay: true,
  stateMachines: "RockButton",
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
    //console.log("loaded");
  },
  onStateChange: (event) => {
    //console.log(event.data[0]);
    if (event.data[0] === "Clicked" && allowAction === false) {
      action = "rock";
      allowAction = true;
      currPlayer
        .stateMachineInputs(`StateMachine`)
        .find((i) => i.name === "Rock")
        .fire();
      //console.log(action);
      game(action);
      setTimeout(playAgain, 2000);
    }
  },
});

const p = new rive.Rive({
  src: "Buttons/PaperButton.riv",

  canvas: document.getElementById("canvasPaper"),
  autoplay: true,
  stateMachines: "PaperButton",
  onLoad: () => {
    p.resizeDrawingSurfaceToCanvas();
    //console.log("loaded");
  },
  onStateChange: (event) => {
    //console.log(event.data[0]);
    if (event.data[0] === "Clicked" && allowAction === false) {
      action = "paper";
      allowAction = true;
      currPlayer
        .stateMachineInputs(`StateMachine`)
        .find((i) => i.name === "Paper")
        .fire();
      //console.log(action);
      game(action);
      setTimeout(playAgain, 2000);
    }
  },
});

const s = new rive.Rive({
  src: "Buttons/ScissorButton.riv",

  canvas: document.getElementById("canvasScissor"),
  autoplay: true,
  stateMachines: "ScissorButton",
  onLoad: () => {
    s.resizeDrawingSurfaceToCanvas();
    //console.log("loaded");
  },
  onStateChange: (event) => {
    //console.log(event.data[0]);
    if (event.data[0] === "Clicked" && allowAction === false) {
      action = "scissor";
      allowAction = true;
      currPlayer
        .stateMachineInputs(`StateMachine`)
        .find((i) => i.name === "Scissor")
        .fire();
      //console.log(action);

      game(action);
      setTimeout(playAgain, 2000);
    }
  },
});

//-----------------------------------------------------------------------------------------------------------
//RuleBook
//---------------------------------------------------------------------------------------
const RPorS = ["rock", "paper", "scissor"];
let game = (Action) => {
  let ComputerAction = RPorS[Math.trunc(Math.random() * 3)];
  console.log("Computer's Action:", ComputerAction);

  if (Action === ComputerAction) {
    console.log("Tie!");
    setTimeout(showTieAnimation, 500);
  } else if (Action === "rock" && ComputerAction === "paper") {
    console.log("Computer Wins!");

    VillainCounter();

    setTimeout(showLoseAnimation, 500);
  } else if (Action === "rock" && ComputerAction === "scissor") {
    console.log("You Win!");

    youCounter();
    setTimeout(showWinAnimation, 500);
  } else if (Action === "scissor" && ComputerAction === "paper") {
    console.log("You Win!");

    youCounter();

    setTimeout(showWinAnimation, 500);
  } else if (Action === "scissor" && ComputerAction === "rock") {
    console.log("Computer Wins!");

    VillainCounter();

    setTimeout(showLoseAnimation, 500);
  } else if (Action === "paper" && ComputerAction === "scissor") {
    console.log("Computer Wins!");

    VillainCounter();

    setTimeout(showLoseAnimation, 500);
  } else if (Action === "paper" && ComputerAction === "rock") {
    console.log("You Win!");

    youCounter();

    setTimeout(showWinAnimation, 500);
  } else {
    console.log("AAvu na hoi laa!");
  }
  MightyVillain.stateMachineInputs(`MightyVillainState`)
    .find((i) => i.name === ComputerAction)
    .fire();
};
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//ScoreBoard animation
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
const youWinElement = document.querySelector(".youWin");

function showWinAnimation() {
  // Remove existing animation to re-trigger (if needed)
  youWinElement.style.animation = "none";
  void youWinElement.offsetWidth; // Trigger reflow

  // Apply the animation
  youWinElement.style.animation = "moveDownWin 0.5s ease-in-out forwards";
}
// Example trigger (replace with your game logic)
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    showWinAnimation(); // Simulate triggering the animation
  }, 1000);
});

const youLoseElement = document.querySelector(".youLose");

function showLoseAnimation() {
  // Remove existing animation to re-trigger (if needed)
  youLoseElement.style.animation = "none";
  void youLoseElement.offsetWidth; // Trigger reflow

  // Apply the animation
  youLoseElement.style.animation = "moveDownLose 0.5s ease-in-out forwards";
}
// Example trigger (replace with your game logic)
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    showLoseAnimation(); // Simulate triggering the animation
  }, 1000);
});

const TieElement = document.querySelector(".Tie");

function showTieAnimation() {
  // Remove existing animation to re-trigger (if needed)
  TieElement.style.animation = "none";
  void TieElement.offsetWidth; // Trigger reflow

  // Apply the animation
  TieElement.style.animation = "moveDownTie 0.5s ease-in-out forwards";
}
// Example trigger (replace with your game logic)
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    showTieAnimation(); // Simulate triggering the animation
  }, 1000);
});

//-----------------------------------------------------------------------------------------------------------
//Playing Again
//---------------------------------------------------------------------------------------

let playAgain = () => {
  //console.log("calling Play again!");
  currPlayer
    .stateMachineInputs(`StateMachine`)
    .find((i) => i.name === "End")
    .fire();
  MightyVillain.stateMachineInputs(`MightyVillainState`)
    .find((i) => i.name === "End")
    .fire();
  youWinElement.style.animation = "none";
  void youWinElement.offsetWidth;
  youLoseElement.style.animation = "none";
  void youLoseElement.offsetWidth;
  TieElement.style.animation = "none";
  void TieElement.offsetWidth;
  setTimeout(() => (allowAction = false), 1000);
};

//-----------------------------------------------------------------------------------------------------------
//ScoreBoard
//-----------------------------------------------------------------------------------------------------------
let you = 0;
let youCounter = () => {
  you++;
  //console.log("You:", you);
  document.getElementsByClassName("YouCounter")[0].innerHTML = you;
};

let Villain = 0;
let VillainCounter = () => {
  Villain++;
  //console.log("Villain:", Villain);
  document.getElementsByClassName("CompCounter")[0].innerHTML = Villain;
};

// Select the first element with the class 'changeCharacterButton'
document
  .getElementsByClassName("changeChar")[0]
  .addEventListener("click", (event) => {
    // Save current score to localStorage before changing character
    localStorage.setItem("youScore", you);
    localStorage.setItem("VillainScore", Villain);

    // Change character logic (implement according to your game rules)

    const currentCharacter = selectedShape;

    changeCharacter();
  });

function changeCharacter() {
  // Example: Cycle through characters or prompt the user to select
  let newCharacter = getNextCharacter(); // Implement this based on your logic

  // Change the character without affecting the score
  localStorage.setItem("selectedShape", newCharacter);

  // Reload the page to show the new character
  window.location.reload();
}

function getNextCharacter() {
  // Logic to determine the next character in the cycle
  // For example, cycling through Siddharth, Dhaval, and Panth
  if (selectedShape === "Siddharth") {
    return "Dhaval";
  }

  if (selectedShape === "Dhaval") {
    return "Panth";
  }

  return "Siddharth"; // Default to Siddharth
}

// Retrieve scores from localStorage after the page reloads
let savedYouScore = localStorage.getItem("youScore");
let savedVillainScore = localStorage.getItem("VillainScore");

// If scores exist in localStorage, set them to the current score variables
if (savedYouScore !== null) {
  you = parseInt(savedYouScore);
  document.getElementsByClassName("YouCounter")[0].innerHTML = you;
}

if (savedVillainScore !== null) {
  Villain = parseInt(savedVillainScore);
  document.getElementsByClassName("CompCounter")[0].innerHTML = Villain;
}

//-----------------------------------------------------------------------------------------------------------
//Clear all scores
//-----------------------------------------------------------------------------------------------------------
document
  .getElementsByClassName("clearScore")[0]
  .addEventListener("click", (event) => {
    // Clear the scores from localStorage
    localStorage.removeItem("youScore");
    localStorage.removeItem("VillainScore");

    // Reset the scores to 0
    you = 0;
    Villain = 0;
    document.getElementsByClassName("YouCounter")[0].innerHTML = you;
    document.getElementsByClassName("CompCounter")[0].innerHTML = Villain;
  });
