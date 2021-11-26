import startTimer from "./timer.js";

const difficulty = document.getElementById("difficulty");
const game = document.getElementById("game");
let bombsPlacement = 0;
let grids = [];
let flagList = [];
let nmbBombs = 0;
let gridSize = 0;

window.onload = () => {
    difficulty.addEventListener("change", difficultyChooser);
    difficultyChooser();
}

function difficultyChooser() {
    let diff = difficulty.value;
    let sizeOfGrid = 0;
    let nmbOfBomb = 0;
    switch(diff) {
        case "easy":
            sizeOfGrid = 10;
            nmbOfBomb = 10;
            break;
        case "medium":
            sizeOfGrid = 25;
            nmbOfBomb = 50;
            break;
        case "hard":
            sizeOfGrid = 35;
            nmbOfBomb = 200;
            break;
        default:
            sizeOfGrid = 10;
            nmbOfBomb = 10;
            break;
    }
    game.innerHTML = "";
    gridWebCreator(sizeOfGrid);
    gridBuilder(sizeOfGrid, nmbOfBomb);
}

function gridBuilder(size, bombs) {
    let grid = [];
    for (let i = 0; i < size; i++) {
        let list = [];
        for (let j = 0; j < size; j++) {
            list.push(0);
        }
        grid.push(list);
    }
    grids = grid;
    nmbBombs = bombs;
    gridSize = size;
}

function bombsPlacer(size, grid, bombs, first) {
    console.log(grid);
    for (let i = 0; i < bombs; i++) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        if (grid[x][y] === -5 || first === [x, y]) i--;
        else {
            grid[x][y] = -5;
            valuePlacer(x, y, grid);
        }
    }
    bombsPlacement = grid;
}

function gridWebCreator(size) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.className = "row";
        game.append(row);
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("span");
            cell.className = "td";
            cell.id = i+"cell"+j;
            cell.addEventListener("click", () => {clickOnCell([i, j])});
            cell.addEventListener("contextmenu", (ev) => {
            ev.preventDefault();
            cell.innerHTML = "F"
            flagList.push([i, j]);
            row.append(cell);
        }
    };
}

function clickOnCell (cell) {
    const x = cell[0];
    const y = cell[1];
    if (bombsPlacement === 0) {
        startTimer();
        bombsPlacer(gridSize, grids, nmbBombs, [x, y]);
    }
    if (bombsPlacement[x][y] === -5) revealBombs();
    else revealValues(cell);
}

function revealBombs() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (bombsPlacement[i][j] === -5) {
                document.getElementById(i+"cell"+j).innerHTML = "B";
                document.getElementById(i+"cell"+j).className = "td_clear";
            }
        }
    }
}

function valuePlacer(x, y, grid) {
    if (x+1 < gridSize && y+1 < gridSize && grid[x+1][y+1] !== -5) grid[x+1][y+1]++;
    if (x+1 < gridSize && grid[x+1][y] !== -5) grid[x+1][y]++;
    if (x+1 < gridSize && y - 1 >= 0 && grid[x+1][y-1] !== -5) grid[x+1][y-1]++;
    if (y+1 < gridSize && grid[x][y+1] !== -5) grid[x][y+1]++;
    if (y-1 >= 0 && grid[x][y-1] !== -5) grid[x][y-1]++;
    if (x-1 >= 0 && y+1 < gridSize && grid[x-1][y+1] !== -5) grid[x-1][y+1]++;
    if (x-1 >= 0 && grid[x-1][y] !== -5) grid[x-1][y]++;
    if (x-1 >= 0 && y-1 >= 0&& grid[x-1][y-1] !== -5) grid[x-1][y-1]++;
}

function revealValues(cell) {
    const x = cell[0];
    const y = cell[1];
    let list = [];
    findAdjacent(x, y, list);
    console.log(list);
    for (let i = 0; i < list.length; i++) {
        document.getElementById(list[i][0]+"cell"+list[i][1]).innerHTML = bombsPlacement[list[i][0]][list[i][1]];
        document.getElementById(list[i][0]+"cell"+list[i][1]).className = "td_clear";
    }
}

function findAdjacent(x, y, list) {
    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize && check([x, y], list)) {
        list.push([x, y]);
        if (bombsPlacement[x][y] === 0) {
            findAdjacent(x + 1, y - 1, list);
            findAdjacent(x + 1, y, list);
            findAdjacent(x + 1, y + 1, list);
            findAdjacent(x, y - 1, list);
            findAdjacent(x, y + 1, list);
            findAdjacent(x - 1, y - 1, list);
            findAdjacent(x - 1, y, list);
            findAdjacent(x - 1, y + 1, list);
        }
    }
}

function check(cell, list) {
    for (let i = 0; i < list.length; i++) if(list[i][0] === cell[0] && list[i][1] === cell[1]) return false;
    return true;
}