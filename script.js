// TODO: add modes
let numA;
let numB;
let result;
let scoreCorrect;
let scoreWrong;
let scoreCorrectToday = 0;
let scoreWrongToday = 0;
let mode = 0;
let randMode = false;
let hardMode = false;

sessionStorage.setItem("correct", 0);
sessionStorage.setItem("wrong", 0);

if (localStorage.getItem("correct") == null) {
	localStorage.setItem("correct", 0);
	localStorage.setItem("wrong", 0);
}

genGame();

document.querySelector("#sub").classList.toggle("use", true);
document.querySelector("#mul").classList.toggle("use", true);
document.querySelector("#rng").classList.toggle("use", true);
document.body.classList.toggle("add", true);
document.querySelector("#symbol").innerHTML = "+";

document.querySelector("#add").onclick = () => {
	setMode(0);
	randMode = false;
	genGame();
}

document.querySelector("#sub").onclick = () => {
	setMode(1);
	randMode = false;
	genGame();
}

document.querySelector("#mul").onclick = () => {
	setMode(2);
	randMode = false;
	genGame();
}

document.querySelector("#rng").onclick = () => {
	setMode(Math.floor(Math.random() * 2));
	randMode = true;
	document.querySelector("#mode").innerHTML = "Random";
	genGame();
}

document.querySelector("#openNote").onclick = () => {
	document.querySelector("#notes").classList.toggle("open");
	if (document.querySelector("#openNote").innerHTML == "Open Notes") {
		document.querySelector("#openNote").innerHTML = "Close Notes";
	} else {
		document.querySelector("#openNote").innerHTML = "Open Notes";
	}
}

function setMode(num) {
	mode = num;
	switch (mode) {
		case 0:
			document.querySelector("#mode").innerHTML = "Addition";
			document.querySelector("#symbol").innerHTML = "+";
			document.querySelector("#add").classList.toggle("use", false);
			document.querySelector("#sub").classList.toggle("use", true);
			document.querySelector("#mul").classList.toggle("use", true);
			document.body.classList.toggle("add", true);
			document.body.classList.toggle("sub", false);
			document.body.classList.toggle("mul", false);
			break;
		case 1:
			document.querySelector("#mode").innerHTML = "Subtraction";
			document.querySelector("#symbol").innerHTML = "−";
			document.querySelector("#add").classList.toggle("use", true);
			document.querySelector("#sub").classList.toggle("use", false);
			document.querySelector("#mul").classList.toggle("use", true);
			document.body.classList.toggle("add", false);
			document.body.classList.toggle("sub", true);
			document.body.classList.toggle("mul", false);
			break;
		case 2:
			document.querySelector("#mode").innerHTML = "Multiplication";
			document.querySelector("#symbol").innerHTML = "×";
			document.querySelector("#add").classList.toggle("use", true);
			document.querySelector("#sub").classList.toggle("use", true);
			document.querySelector("#mul").classList.toggle("use", false);
			document.body.classList.toggle("add", false);
			document.body.classList.toggle("sub", false);
			document.body.classList.toggle("mul", true);
			break;
		default:
			document.querySelector("#mode").innerHTML = "Addition";
			document.querySelector("#symbol").innerHTML = "+";
			document.querySelector("#add").classList.toggle("use", false);
			document.querySelector("#sub").classList.toggle("use", true);
			document.querySelector("#mul").classList.toggle("use", true);
			document.body.classList.toggle("add", true);
			document.body.classList.toggle("sub", false);
			document.body.classList.toggle("mul", false);
	}
}

function genGame() {
	initGame();
	if (randMode) {
		document.querySelector("#mode").innerHTML = "Random";
		document.querySelector("#rng").classList.toggle("use", false);
	} else {
		document.querySelector("#rng").classList.toggle("use", true);
	}
	if (hardMode) {
		document.body.style.transform = "rotate(" + Math.floor(Math.random() * (350 - 3) + 3) + "deg) scale(" + Math.random() * ((1.5 - 0.5) + 0.5) + ")";
	}
	document.querySelector("#next").classList.toggle("visible", false);
	document.querySelector("#submit").classList.toggle("use", true);
	document.querySelector("#answer").classList.toggle("use", true);
	document.querySelector("#check").classList.toggle("correct", false);
	document.querySelector("#check").classList.toggle("wrong", false);
	document.querySelector("#answer").value = null;
	numA = genNum();
	numB = genNum();
	while (numA == numB) {
		numB = genNum();
	}
	switch (mode) {
		case 0:
			result = numA + numB;
			break;
		case 1:
			let newA = Math.max(numA, numB);
			let newB = Math.min(numA, numB);
			numA = newA;
			numB = newB;
			result = numA - numB;
			break;
		case 2:
			numA = Math.floor(Math.random() * (150 - 3) + 3);
			numB = Math.floor(Math.random() * (15 - 3) + 3);
			result = numA * numB;
			break;
		default:
			result = numA + numB;
	}
	document.querySelector("#numA").innerHTML = numA;
	document.querySelector("#numB").innerHTML = numB;
	console.log(result - 100);
	document.querySelector("#submit").onclick = () => {
		scoreCorrect = localStorage.getItem("correct");
		scoreWrong = localStorage.getItem("wrong");
		scoreCorrectToday = sessionStorage.getItem("correct");
		scoreWrongToday = sessionStorage.getItem("wrong");
		if (document.querySelector("#answer").value == result) {
			document.querySelector("#check").innerHTML = "Correct!";
			document.querySelector("#check").classList.toggle("correct", true);
			localStorage.setItem("correct", parseInt(scoreCorrect) + 1);
			sessionStorage.setItem("correct", parseInt(scoreCorrectToday) + 1);
		} else {
			document.querySelector("#check").innerHTML = `Wrong!<br>Answer was <b>${result}</b>`;
			document.querySelector("#check").classList.toggle("wrong", true);
			localStorage.setItem("wrong", parseInt(scoreWrong) + 1);
			sessionStorage.setItem("wrong", parseInt(scoreWrongToday) + 1);
		}
		if (document.querySelector("#answer").value == "uwu") {
			// please don't look at this
			document.body.style.transform = "rotate(" + Math.floor(Math.random() * (350 - 3) + 3) + "deg) scale(" + Math.random() * ((1.5 - 0.5) + 0.5) + ")";
			document.querySelector("#check").innerHTML = `SUSSY BAKA!`;
			document.title = "Sussy Imposter Questions!";
			hardMode = true;
			document.querySelector("#title").innerHTML = "\"Simple\" Math Questions: Hard Mode";
		}
		document.querySelector("#next").classList.toggle("visible", true);
		document.querySelector("#submit").classList.toggle("use", false);
		document.querySelector("#answer").classList.toggle("use", false);
		document.querySelector("#answer").blur();
		initGame();
	}
	document.querySelector("#next").onclick = () => {
		document.querySelector("#next").classList.toggle("visible", false);
		if (randMode) {
			setMode(Math.round(Math.random() * 3));
		}
		document.querySelector("#answer").focus();
		genGame();
	}
}

function initGame() {
	scoreCorrect = localStorage.getItem("correct");
	scoreWrong = localStorage.getItem("wrong");
	scoreCorrectToday = sessionStorage.getItem("correct");
	scoreWrongToday = sessionStorage.getItem("wrong");
	document.querySelector("#correct").innerHTML = `${scoreCorrect}`;
	document.querySelector("#wrong").innerHTML = `${scoreWrong}`;
	document.querySelector("#correctToday").innerHTML = `${scoreCorrectToday}`;
	document.querySelector("#wrongToday").innerHTML = `${scoreWrongToday}`;
}

function genNum() {
	return Math.floor(Math.random() * (998 - 101) + 101);
}
document.body.addEventListener("keypress", function(event) {
	if (event.key === "Enter" && document.querySelector("#openNote").innerHTML !== "Close Notes") {
		event.preventDefault();
		if (document.querySelector("#check").getAttribute("class") == "correct" || document.querySelector("#check").getAttribute("class") == "wrong") {
			document.querySelector("#next").click();
		} else if (document.querySelector("#answer").value !== null) {
			document.querySelector("#submit").click();
		}
	}
	if (event.key === "`") {
		event.preventDefault();
		document.querySelector("#notes").classList.toggle("open");
		if (document.querySelector("#openNote").innerHTML == "Open Notes") {
			document.querySelector("#openNote").innerHTML = "Close Notes";
		} else {
			document.querySelector("#openNote").innerHTML = "Open Notes";
		}
	}
}); 