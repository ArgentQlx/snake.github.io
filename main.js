const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const k = 20;
let dx = k;
let dy = 0;
let gameLoop;
let speed = 150; //let speedBonus = 2;
const width = 400; const height = width;
const snakeBody = [];
food = {x:0, y:0}
let score = 0;
let endScore = 0;
const mainGame = document.querySelector('.game');
document.addEventListener('keydown', (e) => {
    if (mainMenu.style.display === 'flex') {return}; 
    switch(e.key) {
        case 'Escape' :
        if (pauseMenu.style.display === 'none') {
            hideGame(); showPauseMenu(); pauseGame();
            currentScore.textContent = `Current score: ${score}`; break;
        } else {
            showGame(); hidePauseMenu(); start(); break;
        };
        case 'ArrowUp' : if (dy !== k && mainGame.style.display === 'flex') {dx = 0, dy = -k} break;
        case 'ArrowDown' : if (dy !== -k && mainGame.style.display === 'flex') {dx = 0, dy = k} break;
        case 'ArrowLeft' : if (dx !== k && mainGame.style.display === 'flex') {dx = -k, dy = 0} break;
        case 'ArrowRight' : if (dx !== -k && mainGame.style.display === 'flex') {dx = k, dy = 0} break;
    };
});
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function gameOver() {
    //title.textContent = 'Defeat'; startBtn.textContent = 'Restart';
    snakeBody.splice(0);
    pauseGame();
    if (score > endScore) {highScore.textContent = `High score: ${score}`; endScore = score; saveScore(endScore)};
    alert('Game Over!');
    setTimeout(() => {
        hideGame();
        showStartMenu();
        score = 0;
        scoreCount.textContent = `Score: ${score}`;
    }, 1000);
}
function pauseGame() {
    clearInterval(gameLoop);
}
function drawField(height, width, size) {
    canvas.height = height; canvas.width = width;
    for (var x = 0; x <= width; x += size) {
        for (var y = 0; y <= height; y += size) {
            ctx.strokeRect(x, y, size, size);
        };  
    };
};
function clearField(height, width, size) {
    for (var x = 0; x <= width; x += size) {
        for (var y = 0; y <= height; y += size) {
            ctx.clearRect(x, y, size, size);
            ctx.strokeRect(x, y, size, size);
        };  
    };
};
function drawStartSnake(size) {
    for (var i = 0; i < 4; i++) {
        ctx.fillRect(i * size, 0, size, size);
        snakeBody.push({x: k*i, y:0});
    };
};
function moveSnake(size) {
    snakeBody.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, size, size);
    })
};
function changeCoordinates(size) {
    const head = {x: snakeBody[snakeBody.length-1].x + dx, y: snakeBody[snakeBody.length-1].y + dy}
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
        gameOver(); return;
    };
    if (snakeBody.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver(); return;
    };
    if (head.x === food.x && head.y === food.y) {
        score ++;
        scoreCount.textContent = `Score: ${score}`;
        generateFood();
    } else {
        ctx.clearRect(snakeBody[0].x, snakeBody[0].y, size, size);
        ctx.strokeRect(snakeBody[0].x, snakeBody[0].y, size, size);
        snakeBody.splice(0, 1); 
    };
    snakeBody.push(head); 
};
function drawFood(x, y) {
    ctx.fillStyle = '#fc5151ff';
    ctx.fillRect(x, y, k, k);
    ctx.fillStyle = '#64fa00ff';
};
function generateFood() {
    food.x = Math.floor(Math.random() * (width / k)) * k;
    food.y = Math.floor(Math.random() * (height / k)) * k;
    if (snakeBody.some(segment => segment.x === food.x && segment.y === food.y)) {
        generateFood();
    };
    drawFood(food.x, food.y);
};
function start() {
    setTimeout(() => {
        gameLoop = setInterval(() => {
            changeCoordinates(k);
            moveSnake(k);
        }, speed);
    }, 500)
};
function saveScore(score) {
    localStorage.setItem('savedScore', String(score));
};
function loadScore() {
    endScore = parseInt(localStorage.getItem('savedScore')) || 0;
    highScore.textContent = `High score: ${endScore}`;

};
function hideGame() {mainGame.style.display = 'none'};
function showGame() {mainGame.style.display = 'flex'};
ctx.strokeStyle = '#ffffffff';
drawField(height, width, k);
ctx.fillStyle = '#64fa00ff';

hideGame();

function showStartMenu() {mainMenu.style.display = 'flex'};
function hideStartMenu() {mainMenu.style.display = 'none'};
function showPauseMenu() {pauseMenu.style.display = 'flex'};
function hidePauseMenu() {pauseMenu.style.display = 'none'};

const mainMenu = document.querySelector('.startPage');
const pauseMenu = document.querySelector('.onPause');
const highScore = document.getElementById('score');
const currentScore = document.getElementById('currentScore');
const scoreCount = document.getElementById('scoreCount');
const continueBtn = document.getElementById('continueBtn');
const startBtn = document.getElementById('startBtn');
const endGameBtn = document.getElementById('endGame');
const title = document.querySelector('.title');

const lowSpd = document.getElementById('lowSpd');
const medSpd = document.getElementById('medSpd');
const fastSpd = document.getElementById('fastSpd');

startBtn.addEventListener('click', () => {
    dx = k; dy = 0;
    clearField(height, width, k);
    showGame();
    drawStartSnake(k);
    generateFood();
    hideStartMenu();
    start();
});
continueBtn.addEventListener('click', () => {
    showGame(); hidePauseMenu(); start();
});
endGameBtn.addEventListener('click', () => {
    //title.textContent = 'Snake'; startBtn.textContent = 'Play';
    hidePauseMenu();
    gameOver();
});
lowSpd.addEventListener('change', () => {
    speed = 200
});
medSpd.addEventListener('change', () => {
    speed = 150
});
fastSpd.addEventListener('change', () => {
    speed = 100
});

hidePauseMenu();
loadScore();
showStartMenu();
