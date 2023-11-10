let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let scoreBlock = document.getElementById('score');
let scoreCount = 0;
let bestScoreBlock = document.getElementById('best-score');
let dir = '';
let diff = 'Fácil';
let diffBlock = document.getElementById('difficulty');
let btnChange = document.getElementById('changeDif');

const config = {
  sizeCell: 24,
  sizeFood: 24,
  step: 0,
  stepMax: 7,
};

const snake = {
  x: randomInt(0, canvas.width / config.sizeCell) * config.sizeCell,
  y: randomInt(0, canvas.height / config.sizeCell) * config.sizeCell,
};

const images = [
  './img/snake/head.svg',
];

const audioHit = new Audio();

for (let i = 0; i < images.length; i++) {
  let img = new Image();
  img.src = images[i];
}

canvas.style = 'background-image: url(./img/background.jpg);';

if (window.innerWidth > 650) {
  canvas.width = 600;
  canvas.height = 480;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  config.sizeCell = 24;
  config.sizeFood = 24;
} else {
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  config.sizeCell = 15;
  config.sizeFood = 15;
}

function score() {
  scoreCount++;
  bestScore();
  if (scoreCount > 15) {
    config.stepMax = 5;
  } else if (scoreCount <= 15) {
    config.stepMax = 6;
  }
  drawScore();
}

function drawScore() {
  scoreBlock.innerHTML = scoreCount;
}

function bestScore() {
  if (!localStorage.getItem('best score')) {
    localStorage.setItem('best score', scoreCount);
  }
}

function checkBorder() {
  if (snake.x < 0) {
    snake.x = canvas.width - config.sizeCell;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - config.sizeCell;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
}

function withoutBorder() {
  if (snake.x < 0) {
    audioPlay('dead');
    restart();
  } else if (snake.x >= canvas.width) {
    audioPlay('dead');
    restart();
  }

  if (snake.y < 0) {
    audioPlay('dead');
    restart();
  } else if (snake.y >= canvas.height) {
    audioPlay('dead');
    restart();
  }
}

function restart() {
  config.stepMax = 6;
  scoreCount = 0;
  drawScore();

  snake.x = config.sizeCell;
  snake.y = config.sizeCell;
  snake.body = [];
}

function drawFood() {
  ctx.drawImage(img, food.x, food.y, config.sizeFood, config.sizeFood);
}

function drawBomb() {
  ctx.drawImage(bombImg, bomb.x, bomb.y, config.sizeFood, config.sizeFood);
}

document.addEventListener('load', function () {
  if (dir !== 'right') {
    audioPlay('turn');
    dir = 'left';
    snake.dirX = -config.sizeCell;
    snake.dirY = 0;
  }
});

function turnDown() {
  if (dir !== 'up') {
    audioPlay('turn');
    dir = 'down';
    snake.dirY = config.sizeCell;
    snake.dirX = 0;
  }
}

function turnRight() {
  if (dir !== 'left') {
    audioPlay('turn');
    dir = 'right';
    snake.dirX = config.sizeCell;
    snake.dirY = 0;
  }
}

function turnUp() {
  if (dir !== 'down') {
    audioPlay('turn');
    dir = 'up';
    snake.dirY = -config.sizeCell;
    snake.dirX = 0;
  }
}

function handleTouchStart(event) {
  const firstTouch = event.touches[0];
  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
  if (!x1 || !y1) return false;
  const x2 = event.touches[0].clientX;
  const y2 = event.touches[0].clientY;
  const xDiff = x2 - x1;
  const yDiff = y2 - y1;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      turnRight();
    } else {
      turnLeft();
    }
  } else {
    if (yDiff > 0) {
      turnDown();
    } else {
      turnUp();
    }
  }

  x1 = null;
  y1 = null;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawFood() {
  ctx.drawImage(img, food.x, food.y, config.sizeFood, config.sizeFood);
}

function randomPosBomb() {
  let chance = randomInt(1, 5);
  if (chance === 3) {
    bomb.x = randomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
    bomb.y = randomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
    drawBomb();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  checkBorder();
  withoutBorder();
  snake.x += snake.dirX;
  snake.y += snake.dirY;
  drawSnake();
  drawFood();
  randomPosBomb();
}

function drawSnake() {
  ctx.fillStyle = '#093D14';
  ctx.strokeStyle = '#071510';
  ctx.lineWidth = 1;

  ctx.drawImage(snakeImages[0], snake.x, snake.y, config.sizeCell, config.sizeCell);
}

function audioPlay(name) {
  audioNames.forEach((audio, index) => {
    if (name === audio[index]) {
      audio.play();
    }
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // O restante da lógica do jogo aqui...
}
