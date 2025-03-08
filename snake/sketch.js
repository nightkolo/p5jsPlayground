var TILE_SIZE = 40;
var spd = 12;

let headX, headY;
let posX = 0;
let posY = 0;

var gridX = 0;
var gridY = 0;
var gridSizeX = 0;
var gridSizeY = 0;

let appleX, appleY;
let inc = false;

var dir = {
  x: 1, y: 0
};

// I suppose this is as far as I can go with my current knowledge...

function appleAte(){
  randomizeApple();
}
function randomizeApple() {
  appleX = (TILE_SIZE * Math.floor(gridSizeX * Math.random())) + (TILE_SIZE /2);
  appleY = (TILE_SIZE * Math.floor(gridSizeY * Math.random())) + (TILE_SIZE /2);
}
function setup() {
  createCanvas(600, 600);
  headX = 0;
  headY = 0;

  gridSizeX = width / TILE_SIZE;
  gridSizeY = height / TILE_SIZE;
  console.log(gridSizeX);
  randomizeApple();
}
function draw() {
  background(220);
  rectMode(CENTER);
  // for (let grid = 0; grid < width; grid += TILE_SIZE){
  //   stroke(0,0 * 255);
  //   line(grid, 0, grid, height);
  //   line(0, grid, width, grid);
  // }
  for (let g_W = 0; g_W < width; g_W += TILE_SIZE) {
    for (let g_H = 0; g_H < height; g_H += TILE_SIZE) {
      noStroke();
      if ((g_W / TILE_SIZE + g_H / TILE_SIZE) % 2 == 0) {
        fill(200);
      } else {
        fill(180);
      }

      square((TILE_SIZE/2) + g_H, (TILE_SIZE/2) + g_W, TILE_SIZE);
    }
  }

  posX += dir.x * (spd/100);
  posY += dir.y * (spd/100);
  headX = (TILE_SIZE/2) + (Math.floor(posX) * TILE_SIZE);
  headY = (TILE_SIZE/2) + (Math.floor(posY) * TILE_SIZE);
  
  if (headX >= width){
    headX = 0;
    posX = 0;
  }
  if (headX < 0) {
    headX = width - TILE_SIZE / 2;
    posX = width / TILE_SIZE - 1;
  }
  if (headY >= height){
    headY = 0;
    posY = 0;
  }
  if (headY < 0) {
    headY = height - TILE_SIZE / 2;
    posY = height / TILE_SIZE - 1;
  }

  if (appleX == headX && appleY == headY) {
    appleAte();
  }

  fill("white");
  square(headX, headY, TILE_SIZE);
  
  fill("yellow");
  square(appleX, appleY, TILE_SIZE);
}
function keyPressed(){
  if (keyCode == RIGHT_ARROW && !(dir.x < 0)){
    dir.x = 1;
    dir.y = 0;
  }
  if (keyCode == LEFT_ARROW && !(dir.x > 0)){
    dir.x = -1;
    dir.y = 0;
  }
  if (keyCode == UP_ARROW && !(dir.y > 0)){
    dir.x = 0;
    dir.y = -1;
  }
  if (keyCode == DOWN_ARROW && !(dir.y < 0)){
    dir.x = 0;
    dir.y = 1;
  }
}
