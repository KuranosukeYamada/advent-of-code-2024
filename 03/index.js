"use strict";
/*
* Goal: Take input.txt and parse the text for any "mul(X, Y)" call and add the mul instructions
*/
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input = fs.readFileSync('input.txt', 'utf-8');
var filterPattern = new RegExp("(do\(\)|^).*?(don't\(\)|$)", "g");
function filterText(rawInput) {
    return rawInput
        .match(filterPattern);
}
function extractMuls(filteredInput) {
    return filteredInput
        .map(function (element) { return element.match(/mul\(\d{1,3},\d{1,3}\)/g); })
        .flat();
}
function extractNumericalValues(mulMatches) {
    return mulMatches
        .map(function (element) { return element.match(/\d+/g); }) // numerical values to string[]
        .flat(); // flatten 2D array;
}
function mullifyInput(input) {
    // finds matches for mul RegExp and returns an array of just the numbers
    var matches = extractNumericalValues(extractMuls(filterText(input)));
    //    const filteredInput:string = filterText(input);
    //  const matches:string[] = extractNumericalValues(filteredInput.match(/mul\(\d{1,3},\d{1,3}\)/g)) ?? [""];
    //    console.log(filteredInput.slice(0,100))
    console.log(matches.slice(matches.length - 100, matches.length));
    var sum = 0;
    for (var i = 0; i < matches.length - 1; i += 2) {
        // trouble-shooting functions
        //console.log(parseInt(matches[i])+ " | " + parseInt(matches[i + 1]));
        //console.log(parseInt(matches[i]) * parseInt(matches[i + 1]))
        sum += parseInt(matches[i]) * parseInt(matches[i + 1]);
    }
    return sum;
}
var findallPattern = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
function multiplyXY(expression) {
    var match = expression.match(/mul\((\d+),\s*(\d+)\)/);
    if (match) {
        var x = parseInt(match[1]);
        var y = parseInt(match[2]);
        return x * y;
    }
    else {
        throw new Error("Invalid format: ".concat(expression));
    }
}
function mullifyMarkers(input) {
    var matches = input.match(findallPattern);
    console.log(matches);
    var sum = 0;
    var marker = true;
    for (var i = 0; i <= matches.length; i += 1) {
        if (matches[i] === "do()") {
            marker = true;
        }
        else if (matches[i] === "don't()") {
            marker = false;
        }
        else {
            if (marker && matches[i] != undefined) {
                sum += multiplyXY(matches[i]);
            }
        }
    }
    return sum;
}
console.log(mullifyMarkers(input));
