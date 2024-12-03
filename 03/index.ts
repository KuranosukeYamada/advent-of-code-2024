/*
* Goal: Take input.txt and parse the text for any "mul(X, Y)" call and add the mul instructions
*/

import * as fs from 'fs';

const input = fs.readFileSync('exampleTest.txt', 'utf-8', );

function extractNumericalValues(mulMatches: string[]):string[]{
  return mulMatches
      .map(element => element.match(/\d+/g)) // numerical values to string[]
      .flat() // flatten 2D array;
}


function mullifyInput(input: string):number{
    // finds matches for mul RegExp and returns an array of just the numbers
    const matches:string[] = extractNumericalValues(input.match(/mul\(\d{1,3},\d{1,3}\)/g)) ?? [""];

    let sum:number = 0;
    for(let i = 0; i < matches.length - 1; i += 2){
      // trouble-shooting functions
      //console.log(parseInt(matches[i])+ " | " + parseInt(matches[i + 1]));
      //console.log(parseInt(matches[i]) * parseInt(matches[i + 1]))
      sum += parseInt(matches[i]) * parseInt(matches[i + 1]);
    }
    return sum;
}



//const matches:string[] = input.match(patterns.pop()!) ?? [""];
//console.log(parseInt(matches[0]));

console.log(mullifyInput(input));
