import * as fs from 'fs';


// read files, save each row as a string (e.g. '....#.....')
const rows = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => line.trim());

// assuming each row and col have the same lengths, define grid dimensions
const width = rows[0].length;
const height = rows.length;


// locate starting positon based on character where the following are all valid markers:
// <, >, v, ^
// traverse grid each index at a time and return the indicies of start position in [sx, sy] array
const startMarkers:RegExp = /[<>v^]/
const [sx, sy] = (() => {

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const c = rows[y][x];
            if (startMarkers.test(c)) return [x, y];
        }
    }
    throw new Error("Starting position not found");
})();

// directions in cartesian coordinates
// DIRECTION ORDER MATTERS HERE: clockwise
// array traversal to rotate 90 degrees
const directions: [number, number][] = [
    [1, 0],  // east
    [0, 1],  // south
    [-1, 0], // west
    [0, -1], // north
];

// coordinates to string matches
const directionMap: Record<string, [number, number]> = {
    ">": [1, 0],
    "<": [-1, 0],
    "^": [0, -1],
    "v": [0, 1],
};

// function to get jump destinations
// returns [x, y, dindex]
function getJumpDestination(x: number, y: number, dindex: number): [number, number, number | null] | null {
    // wall conditional
    if (rows[y][x] === "#") return null;

    let [dx, dy] = directions[dindex];
    // continue until [x, y] is out of bounds or a wall
    while (x >= 0 && y >= 0 && x < width && y < height && rows[y][x] !== "#") {
        x += dx;
        y += dy;
    }

    // if [x, y] is in bounds, return null at getJumpDestination[2]
    if (x < 0 || y < 0 || x >= width || y >= height) return [x, y, null];

    x -= dx;
    y -= dy;
    dindex = (dindex + 1) % 4;
    return [x, y, dindex];
}

// precomputes and stores all possible jump destinations for each grid position to make traversal faster
const jumpMap = new Map<string, [number, number, number | null] | null>();
for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        for (let di = 0; di < directions.length; di++) {
            jumpMap.set(`${x},${y},${di}`, getJumpDestination(x, y, di));
        }
    }
}

// calculate adjustment for jumping into a wall
function jumpToWall(dindex: number, wallLoc: [number, number]): [number, number, number] {
    const [dx, dy] = directions[dindex];
    const [wx, wy] = wallLoc;

    // return pre-jump location and rotate right
    return [wx - dx, wy - dy, (dindex + 1) % 4];
}

// simulate single jump
function jumpSim(x: number, y: number, dindex: number, wallLoc: [number, number] | null): [number, number, number | null] | null {
    const goal = jumpMap.get(`${x},${y},${dindex}`) ?? null;
    if (wallLoc && goal) {
        const [fx, fy, _] = goal;
        const [wx, wy] = wallLoc;

        // if vertical or horizontal movement puts me into a wall...
        if (fx === wx && Math.min(y, fy) <= wy && wy <= Math.max(y, fy)) {
            return jumpToWall(dindex, wallLoc);
        } else if (Math.min(x, fx) <= wx && wx <= Math.max(x, fx) && fy === wy) {
            return jumpToWall(dindex, wallLoc);
        }
    }
    return goal;
}

// simulate full path
function simFullPath(): Set<string> {
    // set x, y to start positions
    let x = sx, y = sy;

    // store visited indices as a set
    const visited = new Set<string>();
    // assign dindex to match the start marker
    let dindex = directions.findIndex(([dx, dy]) => dx === directionMap[rows[y][x]][0] && dy === directionMap[rows[y][x]][1]);


    // loop while x, y is in-bounds
    while (true) {
        visited.add(`${x},${y}`);
        const [dx, dy] = directions[dindex];
        x += dx;
        y += dy;

        // in-bounds conditional
        if (x < 0 || y < 0 || x >= width || y >= height) break;

        // if the position is a wall, adjust position
        if (rows[y][x] === "#") {
            x -= dx;
            y -= dy;
            dindex = (dindex + 1) % 4;
        }
    }

    return visited;
}

// part one solution:
const path = simFullPath();
console.log(path.size);

// part two:
// added jumpToWall as a helper function and changed jumpSim to utilize

// checks if adding a wall to [x, y] leads to a looped path
// since we precompute the jumpMap, if an x,y is ever visited twice as a result of placing a single block, the path loops
function pathLoopsWithPatch(wallLoc: [number, number]): boolean {
    // assign x, y to start position
    let x = sx, y = sy;
    // assign dindex depending on start marker
    let dindex = directions.findIndex(([dx, dy]) => dx === directionMap[rows[y][x]][0] && dy === directionMap[rows[y][x]][1]);
    // store visited indices as a set
    const visited = new Set<string>();

    while (true) {
        const result = jumpSim(x, y, dindex, wallLoc);

        // if any jump is out of bounds, path loop has been broken
        if (!result || result[2] === null) return false;

        [x, y, dindex] = result;
        const key = `${x},${y},${dindex}`;

        // if the x, y has already been visted, there has been a loop
        if (visited.has(key)) return true;

        visited.add(key);
    }
}

let loopyWalls = 0;

// try adding a wall at each coordinate from the path
for (const wall of path) {
    // pull x,y coordinate from path and build a wall there
    const [wx, wy] = wall.split(",").map(Number);

    // wall cannot exist on start position
    if (wx !== sx || wy !== sy) {
        // if the adding the wall leads to a loop...
        if (pathLoopsWithPatch([wx, wy])) {
            loopyWalls++;
        }
    }
}

console.log(loopyWalls);
