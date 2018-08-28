function average(scores) {
    var total = 0;
    scores.forEach(function (score){
        total += score;
    });
    
    var avg = total/scores.length;
    
    return Math.round(avg);
}

console.log("Average Score:");
var scores = [12,45,23,42,64,74,14,50];
console.log(average(scores));