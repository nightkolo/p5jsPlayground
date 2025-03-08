var grav = 0.85;
var spikeSize = 75;
var spikePercent = 0.4;
var spikes = {};

var score = 0;

let p;
let spikeLength = 0;

class Player {
  constructor() {
    this.size = 50;
    this.y = height/2;
    this.x = width/2;
    this.velY = 0;
    this.spdX = 7;
    this.dirX = 1;
    this.jumpHeight = -15;
  }
  hitWall() {
    return this.x > width-(this.size/2) || this.x < 0+(this.size/2);
  }
  getDir() {
    return this.dirX;
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
  for (let i = 0; i < spikeLength; i += 1) {
    spikes[i] = 0;
  }
  randomizeSpikes();
}
function randomizeSpikes() {
  for (let i = 0; i < spikeLength; i++) {
    if (random() < spikePercent) {
      spikes[i] = 1;
    } else {
      spikes[i] = 0;
    }
  }
}
function setup() {
  createCanvas(700, 600);
  p = new Player();
  setSpikes();
}
function draw() {
  background(127, 127, 55);

  for (let i = 0; i < spikeLength; i++) {
    let dir = (width/2) + (p.dirX * (width/2)) - spikeSize/2;
    let posY = i * spikeSize;
    
    print(posY);
    if (spikes[i] == 1){
      // i cant do this man
      // TODO: fix later
      if (p.dirX > 1) {
        triangle(
          0+dir,
          posY+0,
          -1 * (spikeSize+dir),
          posY+(spikeSize/2),
          0+dir,
          posY+spikeSize);
      } else {
        triangle(
          (0+dir),
          (posY+0),
          (spikeSize+dir),
          (posY+(spikeSize/2)),
          (0+dir),
          (posY+spikeSize));
      }
    }
  }
  p.update();
  p.show();
  if (p.hitWall()) {
    wallHit();
  }
}
function wallHit() {
  addScore();
  randomizeSpikes();
}
function addScore(num = 1) {
  score += num;
  // print(score);
}
function mousePressed() {
  p.jump();
}
function keyPressed() {
  if (keyCode == 32){
    p.jump();
  }
}
