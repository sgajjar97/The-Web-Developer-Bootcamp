//create secretNumber
var secretNum = 4; 

//ask user for guess
var stringGuess = prompt("Guess a number");
var guess = Number(stringGuess);

//check guess
if (guess === secretNum) {
	alert("You got it correct!");
}
//otherwise, if guess is higher
else if (guess > secretNum) {
	alert("Too high! Guess again");
}
//otherwise, check if lower
else {
	alert("Too low! Guess again");
}