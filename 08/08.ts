import * as fs from 'fs';

// saves file to an array where each line is separated
const input:string[] = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

// example string used for validation has already marked antinode positions
const example:string[] = fs.readFileSync('example.txt', 'utf-8').replace('#', '.').trim().split('\n');
console.log(example);


// Antennas is an object that has the string marker as the key and the location coordinates as an array in the values
function saveAntennas(input:string):Record<string, [number, number][]>{
  var res: Record<string, [number, number][]> = {};
  for(let i = 0; i < input.length; i++){
    for(let j = 0; j < input[i].length; j++){
      const loc = input[i][j];
      if(loc !== '.'){

        // if antenna v is not in the object...
        if(!res[loc]){
          res[loc] = []
        }

        res[loc].push([i, j]);
      }
    }
  }
  return res
}

// create a set of all coordinates that COULD contain antinodes
function saveAntinodes(input:string, antennas:Record<string,[number, number][]>):Set<string>{
  var res = new Set<string>();
  // loop through antennas and only save positions
  for(const [_, positions] of Object.entries(antennas)){
    // loop through all positions
    for(const a of positions){
      for(const b of positions){
        if(a[0] === b[0] && a[1] === b[1]){
          continue;
        }
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];

        const nx = b[0] - dx;
        const ny = b[1] - dy;
        res.add(`${nx}, ${ny}`);
      }
    }
  }

  return res;
}

// helper function to check if position is within bounds
function validPosition(position: [number, number], input:string[]):boolean{
  var res:boolean = false;
  if(position[0] >= 0 && position[0] < input.length && position[1] >= 0 && position[1] < input[position[0]].length){
    res = true;
  }
  return res;
}

// counts the number of "valid" antinode positions
function countValidAntinodes(input:string, antinodes:Record<string,[number, number][]>):number{
  var count = 0;
  for(const node of antinodes){
    const [x, y] = node.split(',').map(Number);
    if(validPosition([x, y], input)){
      count++;
    }
  }
  return count;
}

const antennas = saveAntennas(input);
const antinodes = saveAntinodes(input, antennas);
console.log(countValidAntinodes(input, antinodes));
