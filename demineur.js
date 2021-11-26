const difficulty = document.getElementById("difficulty");
const game = document.getElementById("game");

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
            sizeOfGrid = 20;
            nmbOfBomb = 40;
            break;
        case "hard":
            sizeOfGrid = 40;
            nmbOfBomb = 100;
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
    for (let i = 0; i < size; i++) grid.push(0);
    const singleGrid = grid;
    for (let i = 0; i < size; i++) grid.push(singleGrid);
    bombPlacer(size, grid, bombs);
}

function bombPlacer(size, grid, bombs) {
    for (let i = 0; i < bombs; i++) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        grid[x][y] = 1;
    }
}

function gridWebCreator(size) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.className = "row";
        row.id = "row"+i;
        game.append(row);
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("span");
            cell.className = "td";
            cell.id = i+"cell"+j;
            row.append(cell);
        }
    };
}