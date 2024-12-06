"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// read example.txt as an array of numbers by splitting on white-space and mapping to type Number
var input = fs.readFileSync('input.txt', 'utf-8').split(/\s+/).map(Number);
// for some reason, a zero kept getting appened to the end of the array;
input.pop();
// splits input into left and right columns by indices
var leftCol = input.filter(function (_, i) { return i % 2 === 0; }).sort(function (a, b) { return a - b; });
var rightCol = input.filter(function (_, i) { return i % 2 !== 0; }).sort(function (a, b) { return a - b; });
console.log(input);
// find the absolute difference
var firstSum = leftCol.reduce(function (sum, a, i) { return sum + Math.abs(a - (rightCol[i] || 0)); }, 0);
// calculate the similarity score
var secondSum = leftCol.reduce(function (sum, a) { return sum + a * rightCol.filter(function (b) { return b === a; }).length; }, 0);
//calculate results
console.log(firstSum, secondSum);
