"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* Part 1 GOAL: Find XMAS in any order
*/
var fs = require("fs");
var input = fs.readFileSync('input.txt', 'utf-8');
var example = fs.readFileSync('example.txt', 'utf-8');
function createDynamicRegEx(numArray) {
    // the f characters in the basePattern below represent the flags that need to be replaced by digits
    var basePattern = "(?=XfMfAfS|SfAfMfX)";
    var res = [];
    console.log(numArray);
    for (var i = 0; i < numArray.length; i++) {
        var dynamicPattern = basePattern.replace(/f/g, ".{".concat(numArray[i], "}"));
        res.push(new RegExp(dynamicPattern, "gs"));
    }
    return res;
}
function findSum(input, patterns) {
    var sum = 0;
    for (var i = 0; i < patterns.length; i++) {
        if (input.match(patterns[i]) !== null) {
            sum += input.match(patterns[i]).length;
        }
    }
    return sum;
}
var examplePatterns = createDynamicRegEx([0, 9, 10, 11]);
var patterns = createDynamicRegEx([0, 139, 140, 141]);
console.log("example:", findSum(example, examplePatterns));
console.log("solution:", findSum(input, patterns));
