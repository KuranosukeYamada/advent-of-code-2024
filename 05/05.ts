/*
* Goal: Parse the rules (i.e. X|Y, where X comes before Y) and identify which rules (spaced with commas) are in the correct order
*/

import * as fs from 'fs';

const input:string = fs.readFileSync("input.txt", 'utf-8');
let [rules, updates]:string[] = input.split('\n\n');

function splitUpdates():string[]{
  let res:string[] = [];
  for(let line of updates.split('\n')){
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
function trueIndex(x: string, rows: string[]): number {
    let ruleCount = 0;
    for (let y of rows) {
        if (rules.includes(`${x}|${y}`)) {
            ruleCount++;
        }
    }
    return rows.length - 1 - ruleCount;
}

// loops through every element of each updates line and determines if each index matches trueIndex
function isOrdered(rows: string[]): boolean {
    return rows.every((x, i) => i === trueIndex(x, rows));
}


// sums middle of every correct row in updates
function sumMiddle():number{
  var sum = 0;
  for(var rows of updates){
    if(isOrdered(rows)){
      sum+=parseInt(rows[Math.floor(rows.length / 2)]);
    }
  }
  return sum;
}



console.log(sumMiddle());
