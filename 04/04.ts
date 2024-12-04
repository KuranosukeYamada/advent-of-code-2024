/*
* Part 1 GOAL: Find XMAS in any order
*/
import * as fs from 'fs';

const input:string = fs.readFileSync('input.txt', 'utf-8');
const example:string = fs.readFileSync('example.txt', 'utf-8');

function createDynamicRegEx(numArray:number[]):RegExp[]{
  // the f characters in the basePattern below represent the flags that need to be replaced by digits
  const basePattern = "(?=XfMfAfS|SfAfMfX)";
  const res:RegExp[] = [];

  console.log(numArray);
  for(var i = 0; i < numArray.length; i++){
    const dynamicPattern = basePattern.replace(/f/g, `.{${numArray[i]}}`);
    res.push(new RegExp(dynamicPattern, "gs"));
  }
  return res;
}


function findSum(input:string, patterns:RegExp[]):number{
  var sum = 0;
  for(var i = 0; i < patterns.length; i++){
    if(input.match(patterns[i])!== null){
      sum += input.match(patterns[i]).length
    }
  }
  return sum;
}


const examplePatterns:RegExp[] = createDynamicRegEx([0, 9, 10, 11]);
const patterns:RegExp[] = createDynamicRegEx([0, 139, 140,141]);

console.log("example:", findSum(example, examplePatterns));
console.log("solution:", findSum(input, patterns));
