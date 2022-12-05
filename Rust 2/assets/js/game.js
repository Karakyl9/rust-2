let canvas = document.getElementById('game-zone');
var context = canvas.getContext("2d"); 
$('body').css('background-image', 'url(assets/img/grass.png)');

///Обьекты

///
///Функция на спавн деревьев
function loadImage_tree(){
  let tree = new Image();
  tree.src = "assets/img/tree.png"
  tree.onload = function(){
    for(var i = 0; i < 5; i++){
      let x = Math.floor(Math.random() * canvas.width);
      let y = Math.floor(Math.random() * canvas.height);
      context.drawImage(tree, x, y);
    }
  }
}
///

///Функция на спавн камней
function loadImage_stone(){
  let stone = new Image();
  stone.src = "assets/img/stone.png"
  stone.onload = function(){
    for(var i = 0; i < 5; i++){
      let x = Math.floor(Math.random() * canvas.width);
      let y = Math.floor(Math.random() * canvas.height);
      context.drawImage(stone, x, y);
    }
  }
}
///

///загрузка спрайтов персонажа
function loadImage() {
  herosprite.src = 'assets/img/herosprite.png';
  herosprite.onload = function() {
    window.requestAnimationFrame(drawhero);
  };
};
///

///константы
const SCALE = 2;
const WIDTH = 16;
const HEIGHT = 18;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;
const CYCLE_LOOP = [0, 1, 0, 2];
const FACING_DOWN = 0;
const FACING_UP = 1;
const FACING_LEFT = 2;
const FACING_RIGHT = 3;
const FRAME_LIMIT = 12;
const MOVEMENT_SPEED = 0.002;
const cell = {
	width: 64,
	height: 64
};
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;
let herosprite = new Image();
let map = [];
const map_data = {
	count_w:0,
	count_h:0
}
///

///функция отрисовки карты
function Pfield(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	map_data.count_w = Math.ceil(canvas.width/cell.width),
	map_data.count_h = Math.ceil(canvas.height/cell.width)
	for(let i = 0; i < map_data.count_w; i++){
		for(let j = 0; j < map_data.count_h; j++){
			map.push({
				x:i*cell.width,
				y:j*cell.height
			});
		}
	}
  loadImage_tree();
   loadImage_stone();
}
///

///функция отрисовки игры
function Game(){
	Pfield();
	for(let i = 0; i < map.length; i++){
		context.strokeRect(
			map[i].x,
			map[i].y,
			cell.width,
			cell.height
			)
			drawhero(herosprite);
	    requestAnimationFrame(drawhero);
	}
}
///

///анимиция персонажа

//функция для упрощения метода drawimage
function drawFrame(frameX, frameY, canvasX, canvasY) {
  context.drawImage(herosprite,
                frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
                canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
}
//

loadImage();

//получение пользовательского ввода
window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
  keyPresses[event.code] = true;
}
window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
  keyPresses[event.code] = false;
}
//

//функция перемещение персонажа с отрисовкой нужного спрайта
function drawhero() {
  let hasMoved = false;
  if (keyPresses.KeyW) {
    moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    hasMoved = true;
  } else if (keyPresses.KeyS) {
    moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    hasMoved = true;
  }
  if (keyPresses.KeyA) {
    moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    hasMoved = true;
  } else if (keyPresses.KeyD) {
    moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    hasMoved = true;
  }
  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }
  if (!hasMoved) {
    currentLoopIndex = 0;
  }
  drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
  window.requestAnimationFrame(drawhero);
}
//функция на границы карты
 function moveCharacter(deltaX, deltaY, direction) {
  if (positionX + deltaX > 0 && positionX + SCALED_WIDTH + deltaX < canvas.width) {
    positionX += deltaX;
  }
  if (positionY + deltaY > 0 && positionY + SCALED_HEIGHT + deltaY < canvas.height) {
    positionY += deltaY;
  }
  currentDirection = direction;
}

//

///таймер

///
