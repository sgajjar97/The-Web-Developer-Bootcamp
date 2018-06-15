//isEven
function isEven(num) {
	if (num % 2 === 0) {
		return true;
	} 
	else {
		return false;
	}
}

/*function isEven(num) {
	return num % 2 === 0;
}*/

//Factorial
function factorial(num) {
	var result = 1;
	for (var i = 2; i <= num; i++) {
		result = result * i;
	}
	return result;
}

//kebabToSnake
function kebabToSnake(str) {
	var newStr = str.replace(/-/g , "_");
	return newStr;
}