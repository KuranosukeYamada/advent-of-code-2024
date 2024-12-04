"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* Part 1 GOAL: Find XMAS in any order
*/
var fs = require("fs");
var input = fs.readFileSync('example.txt', 'utf-8');
var patterns = [/XMAS/, /X\w/];
function rotateLeft(input, n) {
    if (n === void 0) { n = 1; }
    var res = input.substring(1, input.length) + input[0];
    while (n > 0) {
        res = res.substring(1, res.length) + res[0];
        n--;
    }
    return res;
}
function sumMatches(input) {
    var sum = 0;
    var n = 3;
    while (n > 0) {
        var XMASArray = rotateLeft(input, n).match(/XMAS/g);
        var rotatedArray = rotateLeft(input, n).match(/X[XMAS]{3}\n[XMAS]M[XMAS]{2}\n[XMAS]{2}A[XMAS]\n[XMAS]{3}S/g);
        sum += XMASArray.length + rotatedArray.length;
    }
    return sum;
}
console.log(sumMatches(input));
