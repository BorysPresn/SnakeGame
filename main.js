const gridSize = 25; // размер сетки (количество клеток по вертикали и горизонтали)
const grid = [];

for (let col = 0; col < gridSize; col++) {
    const rowArray = [];
    for (let row = 0; row < gridSize; row++) {
        rowArray.push({ state: 'empty' }); // начальное состояние - пустая клетка
    }
    grid.push(rowArray);
}

const gridContainer = document.querySelector('.game-field');

gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

for (let col = 0; col < gridSize; col++) {
    for (let row = 0; row < gridSize; row++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        gridContainer.appendChild(cell);
    }
}
let game;
let gameInterval;
let score = 0;
let scoreContainer = document.querySelector('.score');
let level = 1;
let interval = 500;
let levelContainer = document.querySelector('.level');



document.addEventListener('keydown', (e)=>{
    e.preventDefault();
    if(e.code == "ArrowLeft" && game.dx !== 1){
        game.dx = -1;
        game.dy = 0;
    }
    if(e.code == "ArrowRight" && game.dx !== -1){
        game.dx = 1;
        game.dy = 0;
    }if(e.code == "ArrowUp" && game.dy !== 1){
        game.dx = 0;
        game.dy = -1;
    }if(e.code == "ArrowDown" && game.dy !== -1){
        game.dx = 0;
        game.dy = 1;
    }
    if(e.code == "Space"){
        game.pause();
    }
    if(e.code == "Enter"){
        game.start();
    }
})


game = new Game(gridSize, grid);
game.start();
