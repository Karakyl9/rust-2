let canvas = document.getElementById('game-zone');
var context = canvas.getContext("2d");
$('body').css('background-image', 'url(assets/img/grass.png)');
//
let hero = new Image();
hero.src = "assets/img/hero.png";
function onloadImage(image){
	context.drawImage(image,20,20);
}
hero.onload=onloadImage(hero);
//
//
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
	count_w:64,
	count_h:64
}
//
//
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
	}
	requestAnimationFrame(Game);
}
//
