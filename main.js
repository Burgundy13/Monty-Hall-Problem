let doors = document.querySelectorAll(".door");
let winsDiv = document.querySelector(".wins");
let zerosDiv = document.querySelector(".zeros");
let wins = 0;
let zeros = 0;
let firstPick = true;
let counter = 0;

let loop = setInterval(() => {
	selectDoor();
	if (counter == 10) {
		clearInterval(loop);
	}
}, 800);

function selectDoor() {
	if (firstPick) {
		let randomDoor = doors[Math.floor(Math.random() * 3)];
		randomizeWins();
		randomDoor.classList.add("selected");
		eliminateOne();
		firstPick = false;
	} else {
		let doorLeft = document.querySelectorAll("[data-id]");
		let secondPick;
		if (doorLeft[0].classList.contains("selected")) {
			secondPick = doorLeft[1];
		} else {
			secondPick = doorLeft[0];
		}
		displayWinOrNot(secondPick);
	}
}

function randomizeWins() {
	let options = ["win", "zero", "zero"];

	for (var i = 0; i < 3; i++) {
		let rand = Math.floor(Math.random() * options.length);
		doors[i].setAttribute("data-id", options[rand]);
		options.splice(rand, 1);
	}
}

function eliminateOne() {
	let zeroDoors = document.querySelectorAll('[data-id="zero"]');
	if (zeroDoors[0].classList.contains("selected")) {
		hideDoor(zeroDoors[1]);
	} else {
		hideDoor(zeroDoors[0]);
	}
}

function hideDoor(door) {
	setTimeout(function () {
		door.style.background = "#ddd";
		door.removeAttribute("data-id");
	}, 500);
}

function displayWinOrNot(door) {
	let dataId = door.getAttribute("data-id");
	dataId == "win" ? wins++ : zeros++;
	updateScore();
	reset();
}

function reset() {
	firstPick = true;
	counter++;
	for (let i = 0; i < doors.length; i++) {
		doors[i].removeAttribute("data-id");
		doors[i].classList.remove("selected");
		doors[i].removeAttribute("style");
	}
}

function updateScore() {
	winsDiv.innerHTML = wins;
	zerosDiv.innerHTML = zeros;
}
