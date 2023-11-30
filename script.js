const buttons = document.querySelectorAll(".pick");// this is for button vaiable
const userScoresElement = document.getElementById("your-score");
const ComScore = document.getElementById("computer-score");
const last = document.getElementById("bottom");
const result = document.getElementById("result");
const playAgain = document.getElementById("play-again");
const playAgainWin = document.getElementById("play-again-win");
const user_choices = document.getElementById("your-choice");

// Function Buttons
const btnNxt = document.getElementById("next");
const btnRegulations = document.getElementById("regulations");
const btnRegulationsWin = document.getElementById("regulations-win");
const closeBtn = document.getElementById("close");

const options = ["paper", "rock", "scissors"];

let Gamersstep = undefined;
let userScores = Number(getuserScores());
let comScore = Number(getcomScore());

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		Gamersstep = button.getAttribute("selection");
		winner();
	});
});

playAgain.addEventListener("click", () => {
	last.style.display = "flex";
	result.style.display = "none";
	btnRegulations.style.visibility = "visible";
	btnNxt.style.visibility = "hidden";
	btnRegulationsWin.style.visibility = "hidden";
});
playAgainWin.addEventListener("click", () => {
	totalScore.style.display = "flex";
	last.style.display = "flex";
	result.style.display = "none";
	winPage.style.display = "none";
});

btnRegulations.addEventListener("click", () => {
	regulationsPopup.style.display = "flex";
});
btnRegulationsWin.addEventListener("click", () => {
	regulationsPopup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
	regulationsPopup.style.display = "none";
});
btnNxt.addEventListener("click", () => {
	totalScore.style.display = "none";
	last.style.display = "none";
	result.style.display = "none";
	winPage.style.display = "flex";
	btnRegulations.style.visibility = "visible";
	btnNxt.style.visibility = "hidden";
	btnRegulationsWin.style.visibility = "hidden";
});

function winner() {
	const comStep = randomMove();
	displayResult(user_choices, Gamersstep);
	displayResult(pc_choice, comStep);
	if (Gamersstep === comStep) {
		//draw
		matchDraw.innerText = "TIE UP";
		against.style.visibility = "hidden";
		playAgain.innerText = "Replay";
		// btnRegulationsWin.style.visibility = "hidden";
		btnRegulations.style.visibility = "visible";
		btnNxt.style.visibility = "hidden";
		pc_choice.classList.remove("winner");
		user_choices.classList.remove("winner");
	} else if (
		(Gamersstep === "paper" && comStep === "rock") ||
		(Gamersstep === "rock" && comStep === "scissors") ||
		(Gamersstep === "scissors" && comStep === "paper")
	) {
		// this  is about the game won by user
		updateuserScores(1);
		matchDraw.innerText = "You Won";
		against.style.visibility = "visible";
		playAgain.innerText = "Play Again";
		btnNxt.style.visibility = "visible";
		btnRegulations.style.visibility = "hidden";
		btnRegulationsWin.style.visibility = "visible";
		user_choices.classList.add("winner");
		pc_choice.classList.remove("winner");
	} else {
		//pc won
		updatecomScore(1);
		matchDraw.innerText = "You Lost";
		against.style.visibility = "visible";
		playAgain.innerText = "Play Again";
		// btnRegulationsWin.style.visibility = "hidden";
		btnRegulations.style.visibility = "visible";
		btnNxt.style.visibility = "hidden";
		pc_choice.classList.add("winner");
		user_choices.classList.remove("winner");
	}
	// display result
	last.style.display = "none";
	result.style.display = "flex";
}

function updateuserScores(value) {
	userScores += value;
	userScoresElement.innerText = userScores;
	updateuserScoresLocalStorage();
}

function updatecomScore(value) {
	comScore += value;
	ComScore.innerText = comScore;
	updatecomScoreLocalStorage();
}

function randomMove() {
	return options[Math.floor(Math.random() * options.length)];
}

function displayResult(selected, option) {
	selected.classList.remove("btn-rock");
	selected.classList.remove("btn-paper");
	selected.classList.remove("btn-scissors");

	const icon = selected.querySelector("img");
	selected.classList.add(`btn-${option}`);
	icon.src = `./assets/${option}.png`;
	icon.alt = option;
}

function updateuserScoresLocalStorage() {
	return localStorage.setItem("userScores", userScores);
}
function updatecomScoreLocalStorage() {
	return localStorage.setItem("comScore", comScore);
}

function getuserScores() {
	const numReg = /^-?[\d.]+(?:e-?\d+)?$/
	let userScores;
	if (
		localStorage.getItem("userScores") === null ||
		!localStorage.getItem("userScores").match(numReg)
	) {
		localStorage.setItem("userScores", "0");
		userScores = "0";
	} else {
		userScores = localStorage.getItem("userScores");
		userScoresElement.innerText = localStorage.getItem("userScores");
	}

	return userScores;
}
function getcomScore() {
	const numReg = /^-?[\d.]+(?:e-?\d+)?$/;
	let comScore;
	if (
		localStorage.getItem("comScore") === null ||
		!localStorage.getItem("comScore").match(numReg)
	) {
		localStorage.setItem("comScore", "0");
		comScore = "0";
	} else {
		comScore = localStorage.getItem("comScore");
		ComScore.innerText = localStorage.getItem("comScore");
	}

	return comScore;
}
