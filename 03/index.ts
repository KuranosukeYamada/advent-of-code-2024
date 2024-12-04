/*
* Goal: Take input.txt and parse the text for any "mul(X, Y)" call and add the mul instructions
*/

import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8', );
const filterPattern = new RegExp("(do\(\)|^).*?(don't\(\)|$)", "g");

function filterText(rawInput: string):string[]{
  return rawInput
      .match(filterPattern);
}

function extractMuls(filteredInput: string[]){
  return filteredInput
      .map(element => element.match(/mul\(\d{1,3},\d{1,3}\)/g))
      .flat();
}

function extractNumericalValues(mulMatches: string[]):string[]{
  return mulMatches
      .map(element => element.match(/\d+/g)) // numerical values to string[]
      .flat() // flatten 2D array;
}




function mullifyInput(input: string):number{
    // finds matches for mul RegExp and returns an array of just the numbers
    const matches:string[] = extractNumericalValues(extractMuls(filterText(input)));

//    const filteredInput:string = filterText(input);
  //  const matches:string[] = extractNumericalValues(filteredInput.match(/mul\(\d{1,3},\d{1,3}\)/g)) ?? [""];

//    console.log(filteredInput.slice(0,100))
    console.log(matches.slice(matches.length - 100, matches.length));
    let sum:number = 0;
    for(let i = 0; i < matches.length - 1; i += 2){
      // trouble-shooting functions
      //console.log(parseInt(matches[i])+ " | " + parseInt(matches[i + 1]));
      //console.log(parseInt(matches[i]) * parseInt(matches[i + 1]))
      sum += parseInt(matches[i]) * parseInt(matches[i + 1]);
    }
    return sum;
}


const findallPattern: RegExp = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;

function multiplyXY(expression: string): number{
    const match = expression.match(/mul\((\d+),\s*(\d+)\)/);

    if (match) {
        const x = parseInt(match[1]);
        const y = parseInt(match[2]);
        return x * y;
    } else {
        throw new Error(`Invalid format: ${expression}`);
    }
}

function mullifyMarkers(input: string):number{
  const matches:string[] = input.match(findallPattern);
  console.log(matches);
  var sum = 0;
  var marker = true;
  for(let i = 0; i <= matches.length; i += 1){
    if(matches[i]==="do()"){
      marker = true;
    }
    else if(matches[i]==="don't()"){
      marker = false;
    }
    else{
      if(marker && matches[i] != undefined){
        sum += multiplyXY(matches[i]);
      }
    }
  }

  return sum
}

console.log(mullifyMarkers(input))
