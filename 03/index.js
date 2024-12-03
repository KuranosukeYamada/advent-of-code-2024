"use strict";
/*
* Goal: Take input.txt and parse the text for any "mul(X, Y)" call and add the mul instructions
*/
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input = fs.readFileSync('exampleTest.txt', 'utf-8');
function extractNumericalValues(mulMatches) {
    return mulMatches
        .map(function (element) { return element.match(/\d+/g); }) // numerical values to string[]
        .flat(); // flatten 2D array;
}
function mullifyInput(input) {
    var _a;
    // checks both regExp patterns and returns an array of just the valid numbers
    var matches = (_a = extractNumericalValues(input.match(/mul\(\d{1,3},\d{1,3}\)/g))) !== null && _a !== void 0 ? _a : [""];
    var sum = 0;
    for (var i = 0; i < matches.length - 1; i += 2) {
        //console.log(parseInt(matches[i])+ " | " + parseInt(matches[i + 1]));
        //console.log(parseInt(matches[i]) * parseInt(matches[i + 1]))
        sum += parseInt(matches[i]) * parseInt(matches[i + 1]);
    }
    return sum;
}
//const matches:string[] = input.match(patterns.pop()!) ?? [""];
//console.log(parseInt(matches[0]));
console.log(mullifyInput(input));
