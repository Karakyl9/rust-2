let canvas = document.getElementById('game-zone');
var context = canvas.getContext("2d"); 
$('body').css('background-image', 'url(assets/img/grass.png)');

///Обьекты
let herosprite = new Image();
herosprite.src = "assets/img/herosprite.png";
herosprite.onload = function() {
	drawhero();
};
///

///константы
const scale = 2;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const cycleLoop = [0, 1, 0, 2];
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = 0;
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
}

const cell = {
	width: 64,
	height: 64
};

let map = [];
const map_data = {
	count_w:0,
	count_h:0
}
///

///функция отрисовки игры
function Game(){
	Pfield();
	context.clearRect(0,0,canvas.width,canvas.height);
	for(let i = 0; i < map.length; i++){
		context.strokeRect(
			map[i].x,
			map[i].y,
			cell.width,
			cell.height
			)
			drawhero(herosprite);
	        requestAnimationFrame(step);
	}
}
///

///анимиция персонажа
function drawFrame(frameX, frameY, canvasX, canvasY) {
	context.drawImage(herosprite,
		frameX * width, frameY * height, width, height,
		canvasX, canvasY, scaledWidth, scaledHeight);
}
//Отрисовка персонажа со спрайтов с помощью drawimage
function drawhero() {
	drawFrame(0, 0, 0, 0);
	drawFrame(1, 0, scaledWidth, 0);
	drawFrame(0, 0, scaledWidth * 2, 0);
	drawFrame(2, 0, scaledWidth * 3, 0);
	window.requestAnimationFrame(step);
}
//
//функция отрисовки спрайтов
function step() {
	frameCount++;
	if (frameCount < 15) {
		window.requestAnimationFrame(step);
		return;
	}
	frameCount = 0;
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawFrame(cycleLoop[currentLoopIndex], currentDirection, 0, 0);
	currentLoopIndex++;
	if (currentLoopIndex >= cycleLoop.length) {
		currentLoopIndex = 0;
		currentDirection++;
	}
	if (currentDirection >= 4) {
		currentDirection = 0;
	}
	window.requestAnimationFrame(step);
}
//
///