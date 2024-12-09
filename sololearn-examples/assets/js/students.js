const scores = [68, 95, 54, 84, 77, 75, 63, 74, 69, 80, 71, 63];

// your code goes here

const countPassed = scores.filter(it => it >= 70);
console.log(countPassed.length);