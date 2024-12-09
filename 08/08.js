"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// saves file to an array where each line is separated
var input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
// example string used for validation has already marked antinode positions
var example = fs.readFileSync('example.txt', 'utf-8').replace('#', '.').trim().split('\n');
console.log(example);
// Antennas is an object that has the string marker as the key and the location coordinates as an array in the values
function saveAntennas(input) {
    var res = {};
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < input[i].length; j++) {
            var loc = input[i][j];
            if (loc !== '.') {
                // if antenna v is not in the object...
                if (!res[loc]) {
                    res[loc] = [];
                }
                res[loc].push([i, j]);
            }
        }
    }
    return res;
}
// create a set of all coordinates that COULD contain antinodes
function saveAntinodes(input, antennas) {
    var res = new Set();
    // loop through antennas and only save positions
    for (var _i = 0, _a = Object.entries(antennas); _i < _a.length; _i++) {
        var _b = _a[_i], _ = _b[0], positions = _b[1];
        // loop through all positions
        for (var _c = 0, positions_1 = positions; _c < positions_1.length; _c++) {
            var a = positions_1[_c];
            for (var _d = 0, positions_2 = positions; _d < positions_2.length; _d++) {
                var b = positions_2[_d];
                if (a[0] === b[0] && a[1] === b[1]) {
                    continue;
                }
                var dx = a[0] - b[0];
                var dy = a[1] - b[1];
                var nx = b[0] - dx;
                var ny = b[1] - dy;
                res.add("".concat(nx, ", ").concat(ny));
            }
        }
    }
    return res;
}
// helper function to check if position is within bounds
function validPosition(position, input) {
    var res = false;
    if (position[0] >= 0 && position[0] < input.length && position[1] >= 0 && position[1] < input[position[0]].length) {
        res = true;
    }
    return res;
}
// counts the number of "valid" antinode positions
function countValidAntinodes(input, antinodes) {
    var count = 0;
    for (var _i = 0, antinodes_1 = antinodes; _i < antinodes_1.length; _i++) {
        var node = antinodes_1[_i];
        var _a = node.split(',').map(Number), x = _a[0], y = _a[1];
        if (validPosition([x, y], input)) {
            count++;
        }
    }
    return count;
}
var antennas = saveAntennas(input);
var antinodes = saveAntinodes(input, antennas);
console.log(countValidAntinodes(input, antinodes));
