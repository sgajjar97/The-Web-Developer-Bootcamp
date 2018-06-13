console.log("Print all numbers between -10 and 19");

var num = -10;
while (num < 20){
	console.log(num);
	num++;
}

console.log("Print all even numbers between 10 and 40");

var num1 = 10;
while (num1 <= 40) {
	console.log(num1);
	num1 += 2;
}

// while (num1 <= 40) {
// 	if (num1 % 2 === 0){
// 		 console.log(num1);
// 	} 
// 	num1 += 1;
// }

console.log("Print all odd numbers between 300 and 333");

var num2 = 301;
while (num2 <= 333) {
	console.log(num2);
	num2 += 2;	
}

// var num2 = 300;
// while (num2 <= 333) {
// 	if (num2 % 2 !== 0){
// 		console.log(num2);
// 	}
// 	num2 += 1;	
// }

console.log("Print all numbers divisible by 5 and 3 between 5 and 50");

var num3 = 5;
while (num3 <= 50) {
	if (num3 % 5 === 0 && num3 % 3 === 0){
		console.log(num3);
	}
	num3++;
}