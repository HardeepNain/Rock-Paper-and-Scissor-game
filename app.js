let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const vsContainer = document.querySelector("#vsContainer");
const userChoiceDisplay = document.querySelector("#userChoiceDisplay");
const compChoiceDisplay = document.querySelector("#compChoiceDisplay");

// Image mapping
const choiceImages = {
    rock: "images/rock.png",
    paper: "images/paper.png",
    scissors: "images/scissors.png"
};

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const displayChoices = (userChoice, compChoice) => {
    // Show VS container
    vsContainer.classList.add("active");
    
    // Clear previous displays
    userChoiceDisplay.innerHTML = "";
    compChoiceDisplay.innerHTML = "";
    userChoiceDisplay.classList.remove("winner", "loser");
    compChoiceDisplay.classList.remove("winner", "loser");
    
    // Create and display user choice
    const userImg = document.createElement("img");
    userImg.src = choiceImages[userChoice];
    userImg.alt = userChoice;
    userChoiceDisplay.appendChild(userImg);
    
    // Create and display computer choice
    const compImg = document.createElement("img");
    compImg.src = choiceImages[compChoice];
    compImg.alt = compChoice;
    compChoiceDisplay.appendChild(compImg);
}

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        userScore++;
        userScorePara.innerText = userScore;
        userChoiceDisplay.classList.add("winner");
        compChoiceDisplay.classList.add("loser");
    } else {
        msg.innerText = `You Lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        compScore++;
        compScorePara.innerText = compScore;
        compChoiceDisplay.classList.add("winner");
        userChoiceDisplay.classList.add("loser");
    }
}

const drawgame = () => {
    msg.innerText = "It's a Draw!";
    msg.style.backgroundColor = "#081b31";
}

const playgame = (userChoice) => {
    // Generate computer choice
    const compChoice = genCompChoice();
    
    // Display both choices
    displayChoices(userChoice, compChoice);
    
    // Add delay before showing result
    setTimeout(() => {
        if (userChoice === compChoice) {
            drawgame();
        } else {
            let userWin = true;
            if (userChoice === "rock") {
                userWin = compChoice === "paper" ? false : true;
            } else if (userChoice === "paper") {
                userWin = compChoice === "scissors" ? false : true;
            } else {
                // scissors
                userWin = compChoice === "rock" ? false : true;
            }
            showWinner(userWin, userChoice, compChoice);
        }
    }, 500);
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playgame(userChoice);
    });
})

let btn = document.createElement("button");
btn.id = "rstBtn";
btn.innerHTML = "Reset Game";
document.body.appendChild(btn);

btn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    compScorePara.innerText = compScore;
    userScorePara.innerText = userScore;
    msg.innerText = "Choose your move!";
    msg.style.backgroundColor = "#081b31";
    
    // Reset VS display
    userChoiceDisplay.innerHTML = "<p>?</p>";
    compChoiceDisplay.innerHTML = "<p>?</p>";
    userChoiceDisplay.classList.remove("winner", "loser");
    compChoiceDisplay.classList.remove("winner", "loser");
    vsContainer.classList.remove("active");
})
