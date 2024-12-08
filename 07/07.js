"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var rawFile = fs.readFileSync('input.txt', 'utf-8');
// splits file by line
// tried using object type but kept running into type-errors lol
var input = rawFile
    .trim()
    .split('\n')
    // avoids having to split twice
    .map(function (line) { return line.replace(':', '').split(' ').map(Number); });
// creating add, mul operators
var add = function (a, b) { return a + b; };
var mul = function (a, b) { return a * b; };
// solve for each target recursively using each operator
// can the target number (line[0]) be achieved by manipulating the numbers (line[1:]) using combinations of the operators?
function solve(line, operators) {
    // base case
    // the first element of each line is the targetValue
    if (line.length === 2) {
        return line[0] === line[1];
    }
    // deconstruct line
    var target = line[0], a = line[1], b = line[2], rest = line.slice(3);
    // for each operation, apply operation to a and b
    for (var _i = 0, operators_1 = operators; _i < operators_1.length; _i++) {
        var op = operators_1[_i];
        // recursively call solve with the updated list [total, result, ... rest] where result is the output of op(a, b)
        if (solve(__spreadArray([target, op(a, b)], rest, true), operators)) {
            return true;
        }
    }
    return false;
}
var solutionOne = 0;
for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
    var line = input_1[_i];
    if (solve(line, [add, mul])) {
        var target = line[0], _ = line.slice(1);
        solutionOne += target;
    }
}
console.log(solutionOne);
