import * as fs from 'fs';

const rawFile = fs.readFileSync('input.txt', 'utf-8');

// splits file by line
// tried using object type but kept running into type-errors lol
const input = rawFile
    .trim()
    .split('\n')
    // avoids having to split twice
    .map(line => line.replace(':', '').split(' ').map(Number));

/* DIDN'T END UP WORKING BUT MAY BE USEFUL FOR PART TWO
// parses input file as an object where the keys are the targets and the values are the operands
function parseKeyValuePairs(input: string): Record<string, number[]> {
    // split into line and remove white-space
    const lines = input.trim().split('\n');

    // initialize return object
    const result: Record<string, number[]> = {};

    for (const line of lines) {
        // store key by splitting by colon
        const [key, valueString] = line.split(':');

        // split values into array of numbers by single space
        const values = valueString.trim().split(' ').map(Number);

        // remove whitespace from operands and store at key-value
        result[key.trim()] = values;
    }

    return result;
}
*/

// creating add, mul operators
const add = (a:number, b:number):number => a + b;
const mul = (a:number, b:number):number => a * b;


// solve for each target recursively using each operator
// can the target number (line[0]) be achieved by manipulating the numbers (line[1:]) using combinations of the operators?
function solve(line: number[], operators: ((a: number, b: number) => number)[]): boolean {
    // base case
    // the first element of each line is the targetValue
    if (line.length === 2) {
        return line[0] === line[1];
    }

    // deconstruct line
    const [target, a, b, ...rest] = line;

    // for each operation, apply operation to a and b
    for (const op of operators) {
        // recursively call solve with the updated list [total, result, ... rest] where result is the output of op(a, b)
        if (solve([target, op(a, b), ...rest], operators)) {
            return true;
        }
    }

    return false;
}

var solutionOne = 0;
for(let line of input){
  if(solve(line, [add, mul])){
    const [target, ..._] = line;
    solutionOne+= target;
  }
}

console.log(solutionOne);
