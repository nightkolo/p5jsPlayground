var grav = 0.7;
const spikeSize = 75;
var spikePercent = 0.25;
var spikes = [];
const spikesEas = new Array(
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 1, 0, 0, 1],
  [0, 1, 0, 0, 1, 0, 0, 1],
);
const spikesMed = new Array(
  [0, 2, 0, 0, 0, 2, 0, 0]  
  // [0, 1, 0, 1, 0, 0, 1, 0],
  // [1, 0, 1, 1, 1, 0, 0, 1],
  // [0, 1, 1, 0, 1, 0, 0, 1],
  // [1, 0, 0, 1, 0, 1, 1, 0],
  // [1, 0, 0, 1, 1, 0, 0, 1],
  // [0, 0, 1, 1, 1, 1, 0, 0],
  // [1, 1, 1, 0, 0, 1, 1, 1],
  // [1, 0, 0, 1, 0, 0, 1, 0],
  // [1, 1, 0, 1, 0, 1, 0, 0]
);
const spikesHar = new Array(
  [1, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 0, 1, 1, 1, 1],
  [0, 1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 0]
);
let movingSpikes = [];

var score = 0;
var t = 14;
var difficulty = 1;

let p;
let spikeLength = 0;

const getCurrentSpikes = function(){
  switch (difficulty){
    case 1:
      return spikesEas;
      break;
    case 2:
      return spikesMed;
      break;
    case 3:
      return spikesHar;
      break;
  }
}

class Player {
  constructor() {
    this.size = 50;
    this.y = height/2;
    this.x = width/2;
    this.velY = 0;
    this.spdX = 5.5;
    this.dirX = 1;
    this.jumpHeight = -12.5;
    this.iniSpdX = this.spdX;
  }
  reset() {
    print(this.iniSpdX);
    this.spdX = this.iniSpdX;
  }
  hitWall() {
    return this.x > width-(this.size/2) || this.x < 0+(this.size/2);
  }
  increaseSpd(inc = 0.05){
    this.spdX += inc;
  }
  update() {
    this.velY += grav;
    this.y += this.velY;
    this.x += this.spdX * Math.sign(this.dirX);

    if (this.x > width-(this.size/2) || this.x < 0+(this.size/2)) {
      this.dirX = -this.dirX;
    }

    if (this.y > height-(this.size/2)) {
      this.y = height-(this.size/2);
      this.velY = 0;
    } else if (this.y < 0+(this.size/2)) {
      this.y = 0+(this.size/2);
      this.velY = 0;
    }
  }
  show() {
    circle(this.x, this.y, this.size);
  }
  jump() {
    this.velY = this.jumpHeight;
  }
}
class MovingSpike {
  constructor(pY, pX, pSpeed = 0.3){
    this.y = pY;
    this.x = pX;
    this.speed = -1 * Math.sign(pY - (height/2)) * pSpeed;
  }
  update(){
    this.y += this.speed;
  }
  show(){
    rectMode(CENTER);
    rect(this.x, this.y, spikeSize / 2, spikeSize); 
  }
}
function setSpikes() {
  spikeLength = height / spikeSize;
  newSpikes();
}

var areThereScaryMovingSpikes = false;

function getSpikeDir(){
  return (width/2) + (p.dirX * (width/2));
}
function getSpikeY(index){
  return (spikeSize/2) + (index * spikeSize);
}

function generateSpikes(){
  for (let i = 0; i < spikeLength; i++) {
    rectMode(CENTER);
  
    let dir = getSpikeDir();
    let posY = getSpikeY(i);
    
    if (spikes[i] == 1){
      rect(dir, posY, spikeSize/2, spikeSize); 
    }
  }
}
function newSpikes() {
  let entry = [];

  movingSpikes = [];

  if (t < 15){
    entry = spikesEas[floor(random() * spikesEas.length)];
    difficulty = 1;
  } else if (t < 40){
    entry = spikesMed[floor(random() * spikesMed.length)];
    difficulty = 2;
  } else {
    entry = spikesHar[floor(random() * spikesHar.length)];
    difficulty = 3;
  }
  
  if (random() > 1/2){
    spikes = Array.from(entry.reverse());
  } else {
    spikes = Array.from(entry);
  }
  
  areThereScaryMovingSpikes = spikes.includes(2);

  if (areThereScaryMovingSpikes){
    for (let i = 0; i < spikeLength; i++) {
      if (spikes[i] == 2) {
        let dir = getSpikeDir();
        let posY = getSpikeY(i);

        let movingSpike = new MovingSpike(posY, dir);

        movingSpikes.push(movingSpike);
      }
    }
  }
}
function gameLoop(){
  t += 1/60;
  textAlign(CENTER);
  fill(0,0,0,0.5*255);
  textSize(60);
  text(`${score}`, width/2, height/2);
  text(`${Math.floor(t)}`, width/2, (height/2)+100)
}
function setup() {
  createCanvas(700, 600);
  frameRate(60);
  p = new Player();
  setSpikes();
}
function draw() {
  background(127, 127, 55);
  rectMode(CENTER);
  gameLoop();
  fill("white");
  generateSpikes();

  if (areThereScaryMovingSpikes){
    movingSpikes.forEach((spike) => {
      spike.update();
      spike.show();
    });
  }

  p.update();
  p.show();

  if (p.hitWall()) {
    wallHit();
  }
}
function checkHitSpikes(atPosY = p.y) {
  if (spikeLength > 0) {
    for (let i = 0; i < spikeLength; i++) {
      if (spikes[i] == 1 &&
        atPosY > i * spikeSize &&
        atPosY < (i * spikeSize) + spikeSize
      ) {
        return true;
      }
      if (spikes[i] == 2) {
        for (let spike of movingSpikes) {
          print(spike.y - (spikeSize/2), atPosY, spike.y + (spikeSize/2), atPosY > spike.y - (spikeSize/2) && atPosY < spike.y + (spikeSize/2));

          if (
            atPosY > spike.y - (spikeSize/2) &&
            atPosY < spike.y + (spikeSize/2)
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
}
function wallHit() {
  if (!checkHitSpikes(p.y)){
    p.increaseSpd();
    addScore();
  } else {
    gameOver();
  }
  newSpikes();
}
function addScore(num = 1) {
  score += num;
  // print(score);
}
function gameOver(){
  t = 0;
  score = 0;
  p.reset();
}
function mousePressed() {
  p.jump();
}
function keyPressed() {
  if (keyCode == 32){
    p.jump();
  }
}
