import * as fs from 'fs';

// read example.txt as an array of numbers by splitting on white-space and mapping to type Number
const input:number[] = fs.readFileSync('input.txt', 'utf-8').split(/\s+/).map(Number);
// for some reason, a zero kept getting appened to the end of the array;
input.pop();


// splits input into left and right columns by indices
const leftCol:number[] = input.filter((_, i) => i % 2 === 0).sort((a,b) => a - b);
const rightCol:number[] = input.filter((_, i) => i % 2 !== 0).sort((a,b) => a - b);
console.log(input);

// find the absolute difference
const firstSum = leftCol.reduce((sum, a, i) => sum + Math.abs(a - (rightCol[i] || 0)), 0);

// calculate the similarity score
const secondSum = leftCol.reduce((sum, a) => sum + a * rightCol.filter(b => b === a).length, 0);

//calculate results
console.log(firstSum, secondSum);
