var player_name = "";
var number_of_guesses = 0;
var maximum_guess = 100;
var minimum_guess = 1;
var target = 0;

function startGame() {
	let nameInput = document.getElementById("name");
	let startButton = document.getElementById("startbutton");
	let gameBox = document.getElementById("gamebox");
	if(!nameInput.value) {
		return;
	}
	player_name = nameInput.value;
	nameInput.readOnly = true;
	startButton.disabled = true;
	gameBox.style.display = "block";
	target = Math.floor(Math.random()*100)+1;
}

function guess() {
	let gameinfo = document.getElementById("gameinfo");
	let current_guess = document.getElementById("guess").value;
	if(isNaN(current_guess)) {
		gameinfo.textContent = player_name+", guess a number between "+minimum_guess+" and "+maximum_guess+", please!"
		return;
	}
	if(current_guess < minimum_guess || current_guess > maximum_guess) {
		gameinfo.textContent = player_name+", guess a number between "+minimum_guess+" and "+maximum_guess+", please!"
		return;		
	}
	number_of_guesses++;
	if(current_guess > minimum_guess && current_guess < target) {
		minimum_guess = current_guess;
		gameinfo.textContent = "Your guess was too low. You have guessed "+number_of_guesses+" times. Guess again between "+minimum_guess+" and "+maximum_guess+"!";
		return;
	}
	if(current_guess < maximum_guess && current_guess > target) {
		maximum_guess = current_guess;
		gameinfo.textContent = "Your guess was too high. You have guessed "+number_of_guesses+" times. Guess again between "+minimum_guess+" and "+maximum_guess+"!";
		return;		
	}
	if(current_guess == target) {
		alert(player_name+" congratulations! You won with "+number_of_guesses+" guesses!");
		target = 0;
		player_name = 0;
		maximum_guess = 100;
		minimum_guess = 1;
		number_of_guesses = 0;
		let nameInput = document.getElementById("name");
		let startButton = document.getElementById("startbutton");
		let gameBox = document.getElementById("gamebox");
		gameBox.style.display = "none";
		startButton.disabled = false;
		nameInput.readOnly = false;
		nameInput.value = "";
	}
}


