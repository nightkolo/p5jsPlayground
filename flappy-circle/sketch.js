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
const spikesMed = new Array();
const spikesHar = new Array();

var score = 0;
var t = 0;

let p;
let spikeLength = 0;

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
function setSpikes() {
  spikeLength = height/spikeSize;
  // for (let i = 0; i < spikeLength; i += 1) {
  //   spikes[i] = 0;
  // }
  newSpikes();
}
function generateSpikes(){
  for (let i = 0; i < spikeLength; i++) {
    rectMode(CENTER);
  
    let dir = (width/2) + (p.dirX * (width/2));
    let posY = (spikeSize/2) + (i * spikeSize);
    
    if (spikes[i] == 1){
      rect(dir, posY, spikeSize/2, spikeSize); 
    }
  }
}
function newSpikes() {
  let entry = [];
  
  // if (t < 15){
  entry = spikesEas[floor(random() * spikeLength)];
  // } else if (t < 30){
  //   entry = spikesMed[floor(random() * spikeLength)];
  // } else if (t < 45){
  //   entry = spikesHar[floor(random() * spikeLength)];
  // }
  
  if (random() > 1/2){
    spikes = Array.from(entry.reverse());
  } else {
    spikes = Array.from(entry);
  }
  // for (let i = 0; i < spikeLength; i++) {
    // if (random() < spikePer) {
    //   spikes[i] = 1;
    // } else {
    //   spikes[i] = 0;
    // }
  // }
}
function gameLoop(){
  t += 1/60;
  textAlign(CENTER);
  fill(0,0,0,0.5*255);
  textSize(60);
  text(`${score}`, width/2, height/2)
}
function setup() {
  createCanvas(700, 600);
  frameRate(60);
  p = new Player();
  setSpikes();
}
function draw() {
  background(127, 127, 55);
  gameLoop();
  fill("white");
  generateSpikes();
  p.update();
  p.show();
  if (p.hitWall()) {
    wallHit();
  }
}
function checkHitSpikes(pos){
  if (spikeLength > 0){
    for (let i = 0; i < spikeLength; i++){
      if (spikes[i] == 1 && pos > i * spikeSize && pos < (i * spikeSize)+spikeSize){
        return true;
      }
    }
    return false;
  }
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
