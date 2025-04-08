const form = document.getElementById("registrationForm");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    
    localStorage.setItem("username", username);
    showPage("mainPage");
    getUsername();
   
    history.pushState({ page: "formPage" }, "Form page", "#formPage");
    history.pushState({ page: "mainPage" }, "Main Page", "#mainPage");
});


function showPage(pageId) {
    document.getElementById("formPage").style.display = "none";
    document.getElementById("mainPage").style.display = "none";
    document.getElementById(pageId).style.display = "block";
}

function getUsername() {
    const username = localStorage.getItem("username");
    const greetingElement = document.getElementById("greeting");
  
    if (username) {
        greetingElement.textContent = `Let's play a game, ${username}!`;
    } else {
        greetingElement.textContent = "Let's play a game!";
    }
}

window.onload = function () {
    const pageId = window.location.hash.substring(1);
    if (pageId) {
        showPage(pageId); 
    }
    if (document.getElementById("mainPage")) {
        getUsername();
    }
};

window.addEventListener("popstate", function () {
    const pageId = window.location.hash.substring(1);
    if (pageId) {
        showPage(pageId); 
    }
});

let currentScore = 0;
let totalScore = 0;
let roundScore = 0;  
let totalRounds = 0;

document.getElementById("rollButton").addEventListener("click", function () {
    rollDice();
});


function rollDice() {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceResult").textContent = `You rolled: ${diceRoll}`;

    if (diceRoll === 1) {
        totalRounds ++;
        updateRound();
        endRound(); 

    } else {
        roundScore += diceRoll; 
        document.getElementById("currentScore").textContent = roundScore;  
    }


function endRound() {
    document.getElementById("diceResult").textContent = "You rolled 1, round over!";
    roundScore = 0;  
    document.getElementById("currentScore").textContent = roundScore;

}

document.getElementById("freezeRoundButton").addEventListener("click", function () {

    if (roundScore > 0) {
        totalRounds++;
        updateRound();
    }

    totalScore += roundScore;  
    document.getElementById("totalScore").textContent = totalScore; 

    roundScore = 0;
    document.getElementById("currentScore").textContent = roundScore;

    checkWin(); 
    resetRound();

});

function resetRound() {
    roundScore = 0;
    document.getElementById("currentScore").textContent = roundScore; 
}

function updateRound() {
    document.getElementById("totalRounds").textContent = totalRounds;
}


function checkWin() {
    if (totalScore >= 100) {

        document.getElementById("totalScore").textContent = totalScore;


        const username = localStorage.getItem("username");
        if(username) {
        alert("Congratulations, you won the game " + username + ". The totalscore was: " + totalScore + " and number of rounds were: " + totalRounds);
        }
        
        resetGame();
}
}

function resetGame() {
    totalScore = 0;
    roundScore = 0;
    totalRounds = 0;
    document.getElementById("totalScore").textContent = totalScore;
    document.getElementById("currentScore").textContent = roundScore;
    document.getElementById("totalRounds").textContent = totalRounds;
    document.getElementById("diceResult").textContent = "";
}
}
