let canvas = document.getElementById('game-zone');
var context = canvas.getContext("2d"); 
$('body').css('background-image', 'url(assets/img/grass.png)');
//Обьекты
let herosprite = new Image();
herosprite.src = "assets/img/herosprite.png";
herosprite.onload = function() {
  drawhero();
};
//
//функция отрисовки карты

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
//
//функция отрисовки игры
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
    drawhero(herosprite);
    requestAnimationFrame(Game);
}
//

//Функция анимиции персонажа
const scale = 2;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
function drawFrame(frameX, frameY, canvasX, canvasY) {
  context.drawImage(herosprite,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}

function drawhero() {
  drawFrame(0, 0, 0, 0);
  drawFrame(1, 0, scaledWidth, 0);
  drawFrame(0, 0, scaledWidth * 2, 0);
  drawFrame(2, 0, scaledWidth * 3, 0);
}


//