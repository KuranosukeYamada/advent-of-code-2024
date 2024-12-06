"use strict";
/*
* Goal: Parse the rules (i.e. X|Y, where X comes before Y) and identify which rules (spaced with commas) are in the correct order
*/
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input = fs.readFileSync("input.txt", 'utf-8');
var _a = input.split('\n\n'), rules = _a[0], updates = _a[1];
function splitUpdates() {
    var res = [];
    for (var _i = 0, _a = updates.split('\n'); _i < _a.length; _i++) {
        var line = _a[_i];
        res.push(line.split(','));
    }
    return res;
}
updates = splitUpdates();
/*
* To determine the correct position in the updates line, count how many rules match the pattern X before Y (e.g. X|Y).
* In the example, the first updates row is [75,47,61,53,29]. In order for the first element to be correct in this row,
* the rules 75|47, 75|61, 75|53, and 75|29 must exist in the rules (i.e. four rules matching 75|Y);
*/
function trueIndex(x, rows) {
    var ruleCount = 0;
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var y = rows_1[_i];
        if (rules.includes("".concat(x, "|").concat(y))) {
            ruleCount++;
        }
    }
    return rows.length - 1 - ruleCount;
}
// loops through every element of each updates line and determines if each index matches trueIndex
function isOrdered(rows) {
    return rows.every(function (x, i) { return i === trueIndex(x, rows); });
}
// sums middle of every correct row in updates
function sumMiddle() {
    var sum = 0;
    for (var _i = 0, updates_1 = updates; _i < updates_1.length; _i++) {
        var rows = updates_1[_i];
        if (isOrdered(rows)) {
            sum += parseInt(rows[Math.floor(rows.length / 2)]);
        }
    }
    return sum;
}
// find the true middle for part 2
function truelyMid(rows) {
    return rows.find(function (x) { return trueIndex(x, rows) === Math.floor(rows.length / 2); });
}
// find the middle sums of the INCORRECT rows for part 2
function sumWrongMiddle() {
    var sum = 0;
    for (var _i = 0, updates_2 = updates; _i < updates_2.length; _i++) {
        var rows = updates_2[_i];
        if (!isOrdered(rows) && rows.length > 1) {
            //console.log(rows);
            sum += parseInt(truelyMid(rows));
        }
    }
    return sum;
}
console.log("correct rows sum:".concat(sumMiddle()));
console.log("incorrect rows sum:".concat(sumWrongMiddle()));
